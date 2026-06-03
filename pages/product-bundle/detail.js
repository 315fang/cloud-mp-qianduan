const { get } = require('../../utils/request');
const { warmRenderableImageUrls, resolveRenderableImageUrl } = require('../../utils/cloudAssetRuntime');

function roundMoney(value) {
    const amount = Number(value || 0);
    return Number.isFinite(amount) ? Math.round(amount * 100) / 100 : 0;
}

function formatMoney(value) {
    return roundMoney(value).toFixed(2);
}

function cloneSelectedMap(source = {}) {
    const result = {};
    Object.keys(source || {}).forEach((key) => {
        result[key] = Array.isArray(source[key]) ? source[key].slice() : [];
    });
    return result;
}

function cloneSelectedQtyMap(source = {}) {
    const result = {};
    Object.keys(source || {}).forEach((key) => {
        const qty = Math.max(0, Math.floor(Number(source[key] || 0)));
        if (qty > 0) result[key] = qty;
    });
    return result;
}

function selectionQtyKey(groupKey, optionKey) {
    return `${groupKey}::${optionKey}`;
}

function isFlexBundle(bundle = {}) {
    return String(bundle.scene_type || bundle.bundle_scene_type || '').trim().toLowerCase() === 'flex_bundle';
}

function getGroupMinSelect(group = {}, bundle = {}) {
    if (isFlexBundle(bundle)) return 0;
    const value = Math.floor(Number(group.min_select || 0));
    return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function getGroupMaxSelect(group = {}, minSelect = 0, bundle = {}) {
    const raw = Number(group.max_select);
    if (isFlexBundle(bundle) && (!Number.isFinite(raw) || raw <= 0)) return 0;
    const fallback = minSelect || 1;
    const value = Number.isFinite(raw) ? Math.floor(raw) : fallback;
    return Math.max(fallback, value);
}

function isUnlimitedGroupMax(maxSelect) {
    return !(Number(maxSelect) > 0);
}

function groupMaxLimit(maxSelect) {
    return isUnlimitedGroupMax(maxSelect) ? Infinity : Number(maxSelect);
}

function isUnlimitedQtyOption(option = {}) {
    return Number(option.unlimited_qty || 0) === 1;
}

function isRepeatableOption(option = {}) {
    if (isUnlimitedQtyOption(option)) return true;
    return option.repeatable === true || option.repeatable === 1 || option.repeatable === '1';
}

function getOptionMaxQty(option = {}) {
    if (isUnlimitedQtyOption(option)) return Infinity;
    return isRepeatableOption(option)
        ? Math.max(1, Math.floor(Number(option.max_qty_per_order || option.max_qty || option.default_qty || 1)))
        : 1;
}

function getOptionDefaultQty(option = {}) {
    return Math.min(
        getOptionMaxQty(option),
        Math.max(1, Math.floor(Number(option.default_qty || 1)))
    );
}

function isFixedQuantityOption(option = {}) {
    const defaultQty = getOptionDefaultQty(option);
    return isRepeatableOption(option) && defaultQty > 1 && defaultQty === getOptionMaxQty(option);
}

function sanitizeFlexBundleSubtitle(text) {
    const value = String(text || '').trim();
    if (!value) return '';
    return /点击|下一步|上方|搭配进度|切换|步骤|第[一二三四五六七八九十0-9]+步/.test(value) ? '' : value;
}

function getGroupSelectedTotal(groupKey, selectedKeys = [], selectedQtyMap = {}) {
    return (Array.isArray(selectedKeys) ? selectedKeys : []).reduce((sum, optionKey) => {
        return sum + Math.max(1, Number(selectedQtyMap[selectionQtyKey(groupKey, optionKey)] || 1));
    }, 0);
}

function buildInitialSelection(groups = [], bundle = {}) {
    const selectedMap = {};
    const selectedQtyMap = {};
    groups.forEach((group) => {
        const options = Array.isArray(group.options) ? group.options : [];
        const minSelect = getGroupMinSelect(group, bundle);
        let remaining = minSelect;
        selectedMap[group.group_key] = [];
        for (const option of options) {
            if (remaining <= 0) break;
            const maxQty = getOptionMaxQty(option);
            const qty = isFixedQuantityOption(option)
                ? getOptionDefaultQty(option)
                : Math.min(maxQty, remaining);
            if (qty <= 0) continue;
            selectedMap[group.group_key].push(option.option_key);
            selectedQtyMap[selectionQtyKey(group.group_key, option.option_key)] = qty;
            remaining -= qty;
        }
    });
    return { selectedMap, selectedQtyMap };
}

function appendImageCandidates(target, value) {
    if (!value) return;
    if (Array.isArray(value)) {
        value.forEach((item) => appendImageCandidates(target, item));
        return;
    }
    if (typeof value === 'string') {
        const text = value.trim();
        if (!text) return;
        if (text.startsWith('[')) {
            try {
                appendImageCandidates(target, JSON.parse(text));
                return;
            } catch (_) {}
        }
        target.push(text);
        return;
    }
    if (typeof value !== 'object') return;
    [
        value.display_image,
        value.displayImage,
        value.image_url,
        value.imageUrl,
        value.url,
        value.temp_url,
        value.image,
        value.cover_image,
        value.coverImage,
        value.cover,
        value.cover_url,
        value.coverUrl,
        value.file_id,
        value.fileId,
        value.image_ref,
        value.imageRef,
        value.thumb,
        value.thumbnail,
        value.images,
        value.preview_images,
        value.previewImages,
        value.image_candidates,
        value.imageCandidates
    ].forEach((item) => appendImageCandidates(target, item));
}

function uniqImageCandidates(values = []) {
    const seen = new Set();
    const result = [];
    appendImageCandidates(result, values);
    return result.filter((item) => {
        if (!item || seen.has(item)) return false;
        seen.add(item);
        return true;
    });
}

function pickInitialImage(values = []) {
    return uniqImageCandidates(values)[0] || '';
}

function pickHeroImageSource(rawBundle = {}) {
    return {
        file_id: rawBundle.hero_file_id || rawBundle.top_file_id || '',
        image: rawBundle.hero_media_url
            || rawBundle.hero_display_url
            || rawBundle.hero_preview_url
            || rawBundle.top_preview_url
            || rawBundle.hero_image
            || rawBundle.top_image
            || ''
    };
}

function pickCardCoverSource(rawBundle = {}) {
    return {
        file_id: rawBundle.card_cover_file_id || rawBundle.cover_file_id || '',
        image: rawBundle.card_cover_preview_url
            || rawBundle.card_cover_display_url
            || rawBundle.cover_preview_url
            || rawBundle.cover_image
            || ''
    };
}

function buildRenderableGroups(groupsSource = [], resolveMap = null) {
    return (Array.isArray(groupsSource) ? groupsSource : []).map((group) => ({
        ...group,
        options: (Array.isArray(group.options) ? group.options : []).map((option) => {
            const sourceProduct = option.product || {};
            const resolvedImage = resolveMap && resolveMap[option.option_key] ? resolveMap[option.option_key] : '';
            const imageCandidates = uniqImageCandidates([resolvedImage, sourceProduct, option.sku]);
            return {
                ...option,
                product: {
                    ...sourceProduct,
                    image: resolvedImage || sourceProduct.image || imageCandidates[0] || '',
                    images: imageCandidates.length ? imageCandidates : sourceProduct.images,
                    image_candidates: imageCandidates
                }
            };
        })
    }));
}

function buildBundleForRender(rawBundle = {}, groups = [], heroPreviewUrl = '') {
    const coverPreviewUrl = rawBundle.card_cover_preview_url
        || rawBundle.card_cover_display_url
        || rawBundle.cover_preview_url
        || rawBundle.cover_image
        || rawBundle.cover_file_id
        || '';
    const heroImageUrl = heroPreviewUrl
        || rawBundle.hero_media_url
        || rawBundle.hero_display_url
        || rawBundle.hero_preview_url
        || rawBundle.top_preview_url
        || rawBundle.hero_image
        || rawBundle.hero_file_id
        || rawBundle.top_image
        || rawBundle.top_file_id
        || '';
    return {
        ...rawBundle,
        subtitle: rawBundle.scene_type === 'flex_bundle'
            ? sanitizeFlexBundleSubtitle(rawBundle.subtitle)
            : rawBundle.subtitle,
        hero_subtitle: rawBundle.scene_type === 'flex_bundle'
            ? sanitizeFlexBundleSubtitle(rawBundle.hero_subtitle)
            : rawBundle.hero_subtitle,
        hero_preview_url: heroImageUrl,
        hero_media_url: heroImageUrl,
        cover_preview_url: coverPreviewUrl,
        card_cover_preview_url: coverPreviewUrl,
        groups
    };
}

function buildGroupRuleText(group = {}, bundle = {}) {
    const minSelect = getGroupMinSelect(group, bundle);
    const maxSelect = getGroupMaxSelect(group, minSelect, bundle);
    if (isFlexBundle(bundle)) {
        return isUnlimitedGroupMax(maxSelect) ? '不限数量' : `最多 ${maxSelect} 件`;
    }
    if (minSelect === maxSelect) return minSelect > 0 ? `必选 ${minSelect} 件` : '可选';
    if (minSelect <= 0) return `可选 0-${maxSelect} 件`;
    return `至少 ${minSelect} 件，最多 ${maxSelect} 件`;
}

function buildGroupStatusText(selectedCount, minSelect, maxSelect, bundle = {}) {
    if (isFlexBundle(bundle)) {
        if (isUnlimitedGroupMax(maxSelect)) return selectedCount > 0 ? `已选 ${selectedCount} 件` : '自由选择';
        if (selectedCount >= maxSelect) return '已选满';
        return `已选 ${selectedCount}/${maxSelect}`;
    }
    if (selectedCount < minSelect) return `还差 ${minSelect - selectedCount} 件`;
    if (selectedCount >= maxSelect) return '已选满';
    if (maxSelect > minSelect) return `已选 ${selectedCount}/${maxSelect}`;
    return '已完成';
}

Page({
    data: {
        id: '',
        loading: true,
        loadError: false,
        bundle: null,
        completedGroupCount: 0,
        totalGroupCount: 0,
        requiredSelectedCount: 0,
        requiredTotalCount: 0,
        bottomProgressText: '',
        bottomActionText: '去付款',
        selectedMap: {},
        selectedQtyMap: {},
        selectedCount: 0,
        totalQuantity: 0,
        originalAmount: 0,
        originalAmountText: '0.00',
        bundleDiscount: 0,
        bundleDiscountText: '0.00',
        maxOriginalAmount: 0,
        maxOriginalAmountText: '0.00',
        maxOriginalMarketingText: '',
        maxQuantity: 0,
        maxQuantityUnlimited: false,
        overMaxOriginalAmount: false,
        selectionValid: false,
        selectionMessage: '请选择商品',
        orderItems: []
    },

    onLoad(options) {
        const id = options && options.id ? String(options.id) : '';
        if (!id) {
            this.setData({ loading: false, loadError: true });
            return;
        }
        this.setData({ id });
        this.loadBundle();
    },

    async loadBundle() {
        const loadSeq = (this._bundleLoadSeq || 0) + 1;
        this._bundleLoadSeq = loadSeq;
        this.setData({ loading: true, loadError: false });
        try {
            const res = await get(`/product-bundles/${this.data.id}`, {}, { showError: false });
            const rawBundle = res && res.data ? res.data : null;
            if (!rawBundle || !rawBundle.id) {
                throw new Error('组合不存在');
            }
            const groupsSource = Array.isArray(rawBundle.groups) ? rawBundle.groups : [];
            const groups = buildRenderableGroups(groupsSource);
            const bundle = buildBundleForRender(rawBundle, groups, pickInitialImage([pickHeroImageSource(rawBundle)]));
            wx.setNavigationBarTitle({
                title: bundle.scene_type === 'flex_bundle' ? '随心搭配' : '组合套装'
            });
            const { selectedMap, selectedQtyMap } = buildInitialSelection(groups, bundle);
            this.setData({
                bundle,
                selectedMap,
                selectedQtyMap,
                loading: false,
                loadError: false
            });
            this.recalcSelection();
            this.resolveBundleImages(rawBundle, loadSeq);
        } catch (error) {
            console.error('[bundle-detail] load failed:', error);
            this.setData({ loading: false, loadError: true, bundle: null });
        }
    },

    async resolveBundleImages(rawBundle = {}, loadSeq = 0) {
        try {
            const groupsSource = Array.isArray(rawBundle.groups) ? rawBundle.groups : [];
            const options = groupsSource.flatMap((group) => (
                Array.isArray(group.options) ? group.options : []
            ));
            const optionProducts = options.map((option) => option.product || {});
            const heroSource = pickHeroImageSource(rawBundle);
            const coverSource = pickCardCoverSource(rawBundle);
            await warmRenderableImageUrls([heroSource, coverSource, ...optionProducts]);
            const resolveMap = {};
            await Promise.all(options.map(async (option) => {
                resolveMap[option.option_key] = await resolveRenderableImageUrl(option.product || {}, '');
            }));
            const groups = buildRenderableGroups(groupsSource, resolveMap);
            const coverPreviewUrl = await resolveRenderableImageUrl(
                coverSource,
                this.data.bundle && (this.data.bundle.card_cover_preview_url || this.data.bundle.cover_preview_url) || ''
            );
            const hasHeroSource = !!pickInitialImage([heroSource]);
            const heroPreviewUrl = await resolveRenderableImageUrl(
                heroSource,
                hasHeroSource
                    ? (this.data.bundle && (this.data.bundle.hero_media_url || this.data.bundle.hero_preview_url) || '')
                    : ''
            );
            if (this._bundleLoadSeq !== loadSeq) return;
            this.setData({
                bundle: buildBundleForRender({
                    ...(this.data.bundle || {}),
                    ...rawBundle,
                    card_cover_preview_url: coverPreviewUrl
                }, groups, heroPreviewUrl)
            });
            this.recalcSelection();
        } catch (error) {
            console.warn('[bundle-detail] resolve images failed:', error);
        }
    },

    recalcSelection() {
        const bundle = this.data.bundle;
        if (!bundle) return;
        const selectedMap = cloneSelectedMap(this.data.selectedMap || {});
        const selectedQtyMap = cloneSelectedQtyMap(this.data.selectedQtyMap || {});
        const orderItems = [];
        const sourceGroups = Array.isArray(bundle.groups) ? bundle.groups : [];
        let originalAmount = 0;
        let totalQuantity = 0;
        let selectedCount = 0;
        let completedGroupCount = 0;
        let requiredSelectedCount = 0;
        let requiredTotalCount = 0;
        let selectionValid = true;
        const nextBundle = {
            ...bundle,
            groups: sourceGroups.map((group) => ({
                ...group,
                options: (group.options || []).map((option) => ({
                    ...option,
                    selected: false,
                    disabled_by_limit: false
                }))
            }))
        };

        (nextBundle.groups || []).forEach((group) => {
            const selectedKeys = Array.isArray(selectedMap[group.group_key]) ? selectedMap[group.group_key] : [];
            const selectedOptions = (group.options || []).filter((option) => {
                const selected = selectedKeys.includes(option.option_key);
                option.selected = selected;
                const qtyKey = selectionQtyKey(group.group_key, option.option_key);
                const fixedQuantity = isFixedQuantityOption(option);
                const selectedQty = selected
                    ? (
                        fixedQuantity
                            ? getOptionDefaultQty(option)
                            : Math.min(getOptionMaxQty(option), Math.max(1, Number(selectedQtyMap[qtyKey] || getOptionDefaultQty(option))))
                    )
                    : 0;
                option.selected_quantity = selectedQty;
                option.max_select_quantity = getOptionMaxQty(option);
                option.is_fixed_quantity = fixedQuantity;
                option.show_qty_stepper = selected && isRepeatableOption(option) && !fixedQuantity;
                option.quantity_text = `×${selected ? selectedQty : getOptionDefaultQty(option)}`;
                option.select_text = selected ? '已选' : '选这个';
                return selected;
            });
            const minSelect = getGroupMinSelect(group, nextBundle);
            const maxSelect = getGroupMaxSelect(group, minSelect, nextBundle);
            const maxLimit = groupMaxLimit(maxSelect);
            const selectedTotal = selectedOptions.reduce((sum, option) => sum + Math.max(1, Number(option.selected_quantity || 1)), 0);
            const groupComplete = selectedTotal >= minSelect && selectedTotal <= maxLimit;
            const maxReached = Number.isFinite(maxLimit) && selectedTotal >= maxLimit;
            group.selected_count = selectedTotal;
            group.min_select_count = minSelect;
            group.max_select_count = maxSelect;
            group.max_select_unlimited = isUnlimitedGroupMax(maxSelect);
            group.complete = groupComplete;
            group.max_reached = maxReached;
            group.rule_text = buildGroupRuleText(group, nextBundle);
            group.status_text = buildGroupStatusText(selectedTotal, minSelect, maxSelect, nextBundle);
            group.progress_text = isUnlimitedGroupMax(maxSelect) ? `已选 ${selectedTotal} 件` : `${selectedTotal}/${maxSelect}`;
            group.options = (group.options || []).map((option) => ({
                ...option,
                disabled_by_limit: !option.selected && maxReached,
                increase_disabled: option.selected && (option.is_fixed_quantity || Number(option.selected_quantity || 0) >= Number(option.max_select_quantity || 1) || maxReached),
                select_text: option.selected ? '已选' : (maxReached ? '已满' : '选这个')
            }));
            requiredTotalCount += minSelect;
            requiredSelectedCount += Math.min(selectedTotal, minSelect);
            if (groupComplete) completedGroupCount += 1;
            if (selectedTotal < minSelect || selectedTotal > maxLimit) {
                selectionValid = false;
            }
            selectedOptions.forEach((option) => {
                const qty = Math.max(1, Number(option.selected_quantity || 1));
                const unitPrice = roundMoney(option.product && option.product.retail_price);
                const imageCandidates = uniqImageCandidates([option.sku, option.product, option.image, option.image_url]);
                const image = imageCandidates[0] || '';
                selectedCount += 1;
                totalQuantity += qty;
                originalAmount += roundMoney(unitPrice * qty);
                orderItems.push({
                    product_id: option.product_id,
                    sku_id: option.sku_id || '',
                    quantity: qty,
                    price: unitPrice,
                    name: option.product && option.product.name || '商品',
                    image,
                    product_image: image,
                    image_url: image,
                    images: imageCandidates,
                    image_candidates: imageCandidates,
                    spec: option.sku && option.sku.spec_value || '',
                    supports_pickup: option.product && option.product.supports_pickup ? 1 : 0,
                    allow_points: 0,
                    bundle_group_key: group.group_key,
                    bundle_group_title: group.group_title,
                    bundle_parent_title: bundle.title
                });
            });
        });

        const bundlePrice = roundMoney(bundle.bundle_price);
        const maxOriginalAmount = roundMoney(bundle.max_original_amount || bundle.maxOriginalAmount || bundle.max_price || bundle.maxPrice || 0);
        const overMaxOriginalAmount = maxOriginalAmount > 0 && roundMoney(originalAmount) > maxOriginalAmount;
        const bundleDiscount = Math.max(0, roundMoney(originalAmount - bundlePrice));
        const groups = nextBundle.groups || [];
        let maxQuantity = 0;
        let allGroupsUnlimited = groups.length > 0;
        groups.forEach((group) => {
            const maxSelect = group.max_select_count || 0;
            if (isUnlimitedGroupMax(maxSelect)) {
                // 这个 group 是 unlimited，不影响 allGroupsUnlimited 标志
            } else {
                allGroupsUnlimited = false;
                maxQuantity += maxSelect;
            }
        });
        const maxQuantityUnlimited = allGroupsUnlimited || maxQuantity === 0;
        const priceValid = orderItems.length > 0 ? bundlePrice <= roundMoney(originalAmount) && !overMaxOriginalAmount : true;
        const completeSelection = selectionValid && orderItems.length > 0;
        const missingGroup = nextBundle.groups.find((group) => !group.complete);
        const missingText = orderItems.length === 0
            ? '请选择商品'
            : (missingGroup
                ? (
                    !isUnlimitedGroupMax(missingGroup.max_select_count) && missingGroup.selected_count > missingGroup.max_select_count
                        ? `「${missingGroup.group_title}」最多 ${missingGroup.max_select_count} 件`
                        : `还差「${missingGroup.group_title}」${Math.max(1, missingGroup.min_select_count - missingGroup.selected_count)}件`
                )
                : '已完成搭配');
        const maxOriginalAmountText = formatMoney(maxOriginalAmount);
        const bottomActionText = overMaxOriginalAmount
            ? '已超封顶'
            : (completeSelection && priceValid ? '去付款' : missingText);
        this.setData({
            bundle: nextBundle,
            completedGroupCount,
            totalGroupCount: nextBundle.groups.length,
            requiredSelectedCount,
            requiredTotalCount,
            orderItems,
            selectedCount,
            totalQuantity,
            originalAmount,
            originalAmountText: formatMoney(originalAmount),
            bundleDiscount,
            bundleDiscountText: formatMoney(bundleDiscount),
            maxOriginalAmount,
            maxOriginalAmountText,
            maxQuantity,
            maxQuantityUnlimited,
            maxOriginalMarketingText: maxOriginalAmount > 0 ? `最高可搭配 ¥${maxOriginalAmountText}` : '',
            overMaxOriginalAmount,
            selectionValid: completeSelection && priceValid,
            selectionMessage: overMaxOriginalAmount
                ? '已超过套餐封顶，请调整选择'
                : (completeSelection && !priceValid ? '价格暂不可用' : missingText),
            bottomProgressText: overMaxOriginalAmount ? `已超 ¥${maxOriginalAmountText} 封顶` : `已选 ${selectedCount} 项 / ${totalQuantity} 件`,
            bottomActionText: completeSelection && !priceValid && !overMaxOriginalAmount ? '价格待确认' : bottomActionText
        });
    },

    onToggleOption(e) {
        const groupKey = e.currentTarget.dataset.groupKey;
        const optionKey = e.currentTarget.dataset.optionKey;
        const bundle = this.data.bundle;
        if (!bundle || !groupKey || !optionKey) return;
        const group = (bundle.groups || []).find((item) => item.group_key === groupKey);
        if (!group) return;
        const selectedMap = cloneSelectedMap(this.data.selectedMap || {});
        const selectedQtyMap = cloneSelectedQtyMap(this.data.selectedQtyMap || {});
        const current = Array.isArray(selectedMap[groupKey]) ? selectedMap[groupKey].slice() : [];
        const exists = current.includes(optionKey);
        const minSelect = getGroupMinSelect(group, bundle);
        const maxSelect = getGroupMaxSelect(group, minSelect, bundle);
        const maxLimit = groupMaxLimit(maxSelect);
        const qtyKey = selectionQtyKey(groupKey, optionKey);
        const currentSelectedTotal = getGroupSelectedTotal(groupKey, current, selectedQtyMap);
        const option = (group.options || []).find((item) => item.option_key === optionKey);
        if (!option) return;
        const fixedQuantity = isFixedQuantityOption(option);
        const defaultQty = getOptionDefaultQty(option);
        const remaining = Number.isFinite(maxLimit) ? Math.max(0, maxLimit - currentSelectedTotal) : Infinity;
        if (maxSelect === 1) {
            if (!exists && defaultQty > maxSelect) {
                wx.showToast({ title: `该商品固定 ${defaultQty} 件`, icon: 'none' });
                return;
            }
            selectedMap[groupKey] = exists ? [] : [optionKey];
            Object.keys(selectedQtyMap).forEach((key) => {
                if (key.indexOf(`${groupKey}::`) === 0) delete selectedQtyMap[key];
            });
            if (!exists) selectedQtyMap[qtyKey] = defaultQty;
        } else if (exists) {
            selectedMap[groupKey] = current.filter((item) => item !== optionKey);
            delete selectedQtyMap[qtyKey];
        } else {
            if (remaining <= 0) {
                wx.showToast({ title: `该分组最多选择 ${maxSelect} 件`, icon: 'none' });
                return;
            }
            if (fixedQuantity && defaultQty > remaining) {
                wx.showToast({ title: `该商品固定 ${defaultQty} 件，当前分组放不下`, icon: 'none' });
                return;
            }
            selectedQtyMap[qtyKey] = fixedQuantity
                ? defaultQty
                : Math.min(defaultQty, getOptionMaxQty(option), remaining);
            selectedMap[groupKey] = current.concat(optionKey);
        }
        this.setData({ selectedMap, selectedQtyMap });
        this.recalcSelection();
    },

    onIncreaseOptionQty(e) {
        const groupKey = e.currentTarget.dataset.groupKey;
        const optionKey = e.currentTarget.dataset.optionKey;
        const bundle = this.data.bundle;
        if (!bundle || !groupKey || !optionKey) return;
        const group = (bundle.groups || []).find((item) => item.group_key === groupKey);
        const option = group && (group.options || []).find((item) => item.option_key === optionKey);
        if (!group || !option || !option.selected || !isRepeatableOption(option) || isFixedQuantityOption(option)) return;
        const selectedMap = cloneSelectedMap(this.data.selectedMap || {});
        const selectedQtyMap = cloneSelectedQtyMap(this.data.selectedQtyMap || {});
        const current = Array.isArray(selectedMap[groupKey]) ? selectedMap[groupKey] : [];
        const minSelect = getGroupMinSelect(group, bundle);
        const maxSelect = getGroupMaxSelect(group, minSelect, bundle);
        const maxLimit = groupMaxLimit(maxSelect);
        const qtyKey = selectionQtyKey(groupKey, optionKey);
        const currentQty = Math.max(1, Number(selectedQtyMap[qtyKey] || option.selected_quantity || 1));
        if (currentQty >= getOptionMaxQty(option)) {
            wx.showToast({ title: '已达该商品上限', icon: 'none' });
            return;
        }
        if (Number.isFinite(maxLimit) && getGroupSelectedTotal(groupKey, current, selectedQtyMap) >= maxLimit) {
            wx.showToast({ title: `该分组最多选择 ${maxSelect} 件`, icon: 'none' });
            return;
        }
        selectedQtyMap[qtyKey] = currentQty + 1;
        this.setData({ selectedQtyMap });
        this.recalcSelection();
    },

    onDecreaseOptionQty(e) {
        const groupKey = e.currentTarget.dataset.groupKey;
        const optionKey = e.currentTarget.dataset.optionKey;
        const bundle = this.data.bundle;
        if (!bundle || !groupKey || !optionKey) return;
        const group = (bundle.groups || []).find((item) => item.group_key === groupKey);
        const option = group && (group.options || []).find((item) => item.option_key === optionKey);
        if (!group || !option || !option.selected || !isRepeatableOption(option) || isFixedQuantityOption(option)) return;
        const selectedMap = cloneSelectedMap(this.data.selectedMap || {});
        const selectedQtyMap = cloneSelectedQtyMap(this.data.selectedQtyMap || {});
        const qtyKey = selectionQtyKey(groupKey, optionKey);
        const currentQty = Math.max(1, Number(selectedQtyMap[qtyKey] || option.selected_quantity || 1));
        if (currentQty <= 1) {
            selectedMap[groupKey] = (selectedMap[groupKey] || []).filter((item) => item !== optionKey);
            delete selectedQtyMap[qtyKey];
        } else {
            selectedQtyMap[qtyKey] = currentQty - 1;
        }
        this.setData({ selectedMap, selectedQtyMap });
        this.recalcSelection();
    },

    onRetry() {
        this.loadBundle();
    },

    onBuyNow() {
        if (!this.data.selectionValid || !this.data.bundle) {
            wx.showToast({
                title: this.data.overMaxOriginalAmount ? '已超过套餐封顶' : '请先完成组合选择',
                icon: 'none'
            });
            return;
        }
        const bundle = this.data.bundle;
        wx.setStorageSync('directBuyInfo', {
            bundle_mode: 1,
            bundle_id: bundle.id,
            bundle_scene_type: bundle.scene_type || '',
            bundle_title: bundle.title,
            bundle_subtitle: bundle.subtitle || '',
            bundle_cover_image: bundle.cover_image || '',
            bundle_price: roundMoney(bundle.bundle_price),
            bundle_max_original_amount: roundMoney(this.data.maxOriginalAmount),
            bundle_original_amount: roundMoney(this.data.originalAmount),
            items: this.data.orderItems
        });
        wx.navigateTo({
            url: '/pages/order/confirm?from=direct'
        });
    }
});
