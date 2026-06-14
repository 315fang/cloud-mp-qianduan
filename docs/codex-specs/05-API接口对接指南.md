# 问兰小程序 · API 接口对接指南

> 配套 `04-首批页面设计规范.md`。
> **接口真相源**：`cloud-mp/docs/audit/generated/MINIPROGRAM_ROUTE_TABLE_AUDIT.md`（全量路由）与 `miniprogram/utils/requestRoutes.js`（路由→云函数映射）。
> 本文只列出**首批 5 个页面**用到的路由。下方「返回字段」为 UI 渲染所需字段的**约定/推断**，Codex 实现时**必须以云函数实际返回为准**，字段名不符时以后端为准并在页面做映射，不要臆造后端返回结构。

## 0. 调用约定

- 所有请求统一经现有封装 `miniprogram/utils/request.js`，**禁止页面内裸调 `wx.request`**。
- 路由风格为 `METHOD /path`，由 `requestRoutes.js` 映射到云函数 + action。调用时使用项目已有的请求方法签名（如 `request.get(path, params)` / `request.post(path, data)`，**以现有 `request.js` 实际导出为准**）。
- 鉴权：登录态 token 由现有 `request.js` 自动附带（如 header 或 query）。若 `request.js` 已处理，页面无需关心。
- 统一响应处理：约定形如 `{ code, message, data }`（**以后端实际为准**）。`code` 非成功值时统一 `wx.showToast` 提示 `message`。

## 1. 路由总览（仅首批使用）

| 页面 | 方法 路由 | 云函数/Action | 用途 | 是否排除 |
| --- | --- | --- | --- | --- |
| 全局 | `POST /login` | login | 登录换取会话 | 否 |
| 全局 | `GET /cart` | cart/list | 购物车件数(角标) | 否 |
| 首页 | `GET /banners` | config/banners | 轮播图 | 否 |
| 首页 | `GET /page-content/home` | config/homeContent | 首页内容/公告 | 否 |
| 首页 | `GET /categories` | products/categories | 金刚区分类 | 否 |
| 首页 | `GET /products` | products/list | 热门/特惠商品 | 否 |
| 分类 | `GET /categories` | products/categories | 左侧分类栏 | 否 |
| 分类 | `GET /products` | products/list | 分类商品列表(分页) | 否 |
| 分类 | `GET /products/search` | products/search | 搜索 | 否 |
| 详情 | `GET /products/:id` | products/detail | 商品详情 | 否 |
| 详情 | `GET /products/:id/reviews` | products/reviews | 评价列表 | 否 |
| 详情 | `GET /user/favorites/status` | user/favoriteStatus | 是否已收藏 | 否 |
| 详情 | `POST /user/favorites` | user/addFavorite | 收藏 | 否 |
| 详情 | `DELETE /user/favorites` | user/removeFavorite | 取消收藏 | 否 |
| 购物车 | `GET /cart` | cart/list | 购物车列表 | 否 |
| 购物车 | `POST /cart` | cart/add | 加入购物车 | 否 |
| 购物车 | `PUT /cart/:id` | cart/update | 改数量/规格 | 否 |
| 购物车 | `DELETE /cart/:id` | cart/remove | 删除单项 | 否 |
| 购物车 | `DELETE /cart/clear` | cart/clear | 清空 | 否 |
| 购物车 | `POST /cart/check` | cart/check | 同步选中态(可选) | 否 |
| 我的 | `GET /user/profile` | user/getProfile | 用户资料 | 否 |
| 我的 | `GET /user/account-snapshot` | user/accountSnapshot | 资产四格 | 否 |
| 我的 | `GET /user/stats` | user/getStats | 统计数据 | 否 |
| 我的 | `GET /user/member-tier-meta` | user/memberTierMeta | 会员等级元数据 | 否 |
| 我的 | `GET /user/favorites` | user/getFavorites | 浏览足迹/收藏 | 否 |
| 我的 | `GET /addresses` | user/listAddresses | 地址列表 | 否 |
| 我的(角标) | `GET /orders/counts` | order/counts | 订单角标数字(仅取数显示) | 半 |

> 「我的」页的订单角标允许调用 `GET /orders/counts` **仅用于展示数字红点**；但点击订单项不得进入订单/支付流程（排除范围）。若希望零订单接口，也可不调用此接口、不显示角标数字。

## 2. 严禁调用的接口（首批排除范围）

下列云函数/路由**本批一律不得调用**（涉及支付、退款、佣金、资金账户、分销）：

- 下单/支付：`POST /orders`、`POST /orders/:id/prepay`、`GET /orders/:id/pay-status`、`POST /orders/:id/sync-wechat-pay`、`/orders/exchange`、`/groups/:id/join` 等所有 `payment` 云函数路由。
- 订单流转：`/orders/:id/cancel|confirm|review`、`GET /orders`、`GET /orders/:id`（详情）。
- 售后退款：所有 `/refunds*`。
- 钱包/佣金：所有 `/wallet/*`、`/commissions*`、`/distribution/*`、`/agent/*`、`/deposit*`。
- 自提核销：`/pickup/*`、`/stations/store-manager/*`。

> 这些入口在 UI 上保留，点击统一 `wx.showToast({ title: '功能开发中', icon: 'none' })`。

## 3. 各接口请求/返回约定

> 字段为渲染所需的**推断约定**，`?` 表示可能不存在。**以云函数实际返回为准**。

### 3.1 `GET /products` 商品列表
请求参数（推断）：
```
{ category?: string, keyword?: string, sort?: 'default'|'sales'|'price_asc'|'price_desc',
  page?: number, pageSize?: number }
```
返回（推断）：`data.list: Product[]`，分页含 `data.total` / `data.hasMore`。
`Product`（映射到 `product-card` 的 `product`）：
```
{ id, name, subtitle?, price, originalPrice?, image,
  rating?, reviewCount?, sales?, tags?: string[], isNew?, isHot?, stock? }
```
- `image` 若后端给数组取首图；现价 `price`，原价字段名以后端为准（可能 `originalPrice`/`marketPrice`/`linePrice`，需映射）。

### 3.2 `GET /products/:id` 商品详情
返回（推断）：`data` 为单个商品，含列表字段 + `images: string[]`、`description`、`specs: {label,value}[]`、`detailImages?: string[]`。

### 3.3 `GET /products/:id/reviews` 评价
请求：`{ page?, pageSize? }`；返回 `data.list`：`{ id, userName, avatar?, rating, content, images?, createdAt }`。

### 3.4 `GET /categories` 分类
返回 `data.list`：`{ id, name, icon? }`。`icon` 为图片 URL；Web 版的符号字符不可用，缺图时用纯文字。

### 3.5 `GET /products/search` 搜索
请求 `{ keyword, page?, pageSize? }`；返回结构同 `GET /products`。

### 3.6 `GET /banners` 轮播
返回 `data.list`：`{ id, image, type?, targetId?, title? }`。`type` 决定点击行为（`product`→详情；其余→本批 toast）。

### 3.7 `GET /page-content/home` 首页内容
返回首页配置（公告、楼层等），结构以后端为准。本批仅取**公告文案**用于顶部公告条；无则隐藏公告条。

### 3.8 购物车系列
- `GET /cart` → `data.list`：`{ id, productId, name, image, specValue?, price, quantity, stock?, selected? }`，可含 `data.totalCount`。
- `POST /cart` 请求：`{ productId, quantity, specValue? }`。
- `PUT /cart/:id` 请求：`{ quantity?, specValue?, selected? }`。
- `DELETE /cart/:id`：路径参数 id。
- `DELETE /cart/clear`：无参。
- `POST /cart/check`（可选）：`{ ids: string[], selected: boolean }` 同步选中态。
- 角标：每次购物车变更后 `wx.setTabBarBadge({ index: 2, text: String(count) })`；count 为 0 时 `wx.removeTabBarBadge`。

### 3.9 收藏系列（详情页）
- `GET /user/favorites/status` 请求 `{ productId }` → `data.favorited: boolean`。
- `POST /user/favorites` 请求 `{ productId }`。
- `DELETE /user/favorites` 请求 `{ productId }`（或用 `DELETE /user/favorites/:id`，以 `requestRoutes.js` 为准）。

### 3.10 我的页系列
- `GET /user/profile` → `data`：`{ nickname, avatar?, memberTier?, phone? }`。
- `GET /user/account-snapshot` → 资产四格：`{ points?, couponCount?, favoriteCount?, balance? }`（字段名以后端为准）。`balance`/钱包项点击属排除范围。
- `GET /user/stats` → 其他统计，按需展示。
- `GET /user/member-tier-meta` → 等级名称/图标元数据。
- `GET /user/favorites` → 浏览足迹/收藏 `data.list`（商品简要）。
- `GET /addresses` → `data.list`：`{ id, name, phone, region, detail, isDefault }`。
- `GET /orders/counts`（可选，仅显示角标）→ `{ unpaid, unshipped, unreceived, uncommented, refunding }`。

### 3.11 `POST /login` 登录
流程：`wx.login()` 拿 `code` → `POST /login` `{ code }` → 后端返回会话/token → 交给现有 `request.js` 持久化（沿用项目既有登录逻辑，不要新造一套）。

## 4. 请求封装与错误处理样板

```js
// 在页面/组件中（示意，方法名以现有 request.js 为准）
const request = require('../../utils/request.js')

Page({
  data: { loading: true, error: false, list: [] },

  async loadProducts() {
    this.setData({ loading: true, error: false })
    try {
      const res = await request.get('/products', { page: 1, pageSize: 10 })
      // 以后端实际结构为准做映射
      const list = (res.data && res.data.list || []).map(this.mapProduct)
      this.setData({ list, loading: false })
    } catch (e) {
      this.setData({ loading: false, error: true })
      wx.showToast({ title: '加载失败，请重试', icon: 'none' })
    }
  },

  mapProduct(p) {
    return {
      id: p.id || p._id,
      name: p.name,
      subtitle: p.subtitle || p.sellingPoint || '',
      price: p.price,
      originalPrice: p.originalPrice || p.marketPrice || 0,
      image: Array.isArray(p.images) ? p.images[0] : p.image,
      rating: p.rating || 0,
      tags: p.tags || [],
      isNew: !!p.isNew,
      isHot: !!p.isHot,
      stock: p.stock != null ? p.stock : 99
    }
  },

  // 排除范围入口统一处理
  onComingSoon() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  }
})
```

## 5. Codex 实现核对清单

- [ ] 打开 `requestRoutes.js` 确认每个用到的路由确实存在且映射正确；不存在的路由不要调用。
- [ ] 用 `request.js` 现有方法调用，签名/鉴权沿用现有约定。
- [ ] 对每个接口返回做防御性映射（`mapXxx`），不假设字段一定存在。
- [ ] 排除范围接口（第 2 节）零调用；相关入口一律 `onComingSoon`。
- [ ] 购物车变更后同步刷新 tabBar 角标。
- [ ] 登录沿用项目既有逻辑，不新造鉴权。
- [ ] 每个请求都有 loading / 成功 / 失败（toast）/ 空 四态处理。

---

## 6. A/B 档新增功能的接口分类

> 以下按本批新增的运营区/活动态归类。**先在 `requestRoutes.js` 核对真实路由名**（下方路径为占位推断），不存在则该功能降级为隐藏或 toast，不臆造接口。

### 6.1 可调用（A 档 · 非资金，读为主）

| 功能 | 推断接口 | 说明 |
| --- | --- | --- |
| 首页领券区展示 | `GET /coupons/home`（或 `/coupons?scene=home`） | 仅拉券面与状态，不领取 |
| 首页品牌专区 | `GET /brands/featured`、`GET /page-content/home` | 品牌内容运营层 |
| 首页海报/弹窗 | `GET /page-content/home`、`GET /popups?scene=home` | 关闭态本地存储 |
| 签到积分展示 | `GET /user/points/summary` | 积分余额 |
| 分类组合专区 | `GET /products?type=bundle`（或 `/bundles`） | 组合商品展示 |
| 详情活动态 | `GET /products/:id/activity` | 判断可用购买模式与活动价 |
| 详情评价 | `GET /products/:id/reviews` | 已在第 3 节 |
| 我的角色身份 | `GET /user/roles` | 决定角色功能区是否显示 |
| 我的购物袋摘要 | `GET /cart` | 复用购物车数据 |
| 地址只读列表 | `GET /addresses` | 增删改属 C 档 |

### 6.2 可调用但需后端确认（边界）

| 功能 | 接口 | 风险点 |
| --- | --- | --- |
| 签到提交 | `POST /user/points/sign-in` | **仅当后端确认签到不写资金账户**才可调；否则降级 toast |
| 收藏增删 | `POST/DELETE /user/favorites` | 非资金，可调 |
| 加入购物车 | `POST /cart`、`PUT /cart/:id`、`DELETE /cart/:id` | 非资金，可调 |

### 6.3 资金红线 · 本批零调用（一律 toast）

下列接口**禁止调用**，相关按钮统一 `onComingSoon`：

- 领券写账户：`POST /coupons/:id/receive`、兑换券/兑换码
- 下单/支付：下单、`wx.requestPayment`、货款余额支付、0 元兑换下单
- 积分扣减：积分兑换提交、积分抽奖
- 拼团/砍价：开团付款、参团付款、发起/确认砍价购买
- 退款/售后：任何 refund 接口
- 分销/钱包：佣金、货款、基金池、提现、团队划拨
- 自提核销：核销提交、扫码核销

> 这些功能的**界面、状态、倒计时、分享拉人 UI 可完整实现**（B 档要求），唯独最终提交动作止于此边界。

---

## 7. 实现优先级建议

1. 先做 A 档纯展示运营区（券展示/品牌/海报/签到展示/组合专区/角色区）——读接口、低风险。
2. 再做 B 档活动态 UI（多模式切换/活动卡/分享面板）——前端联动为主，资金动作接 toast。
3. 校验态、空态推荐、购物袋弹层等交互态最后打磨。
4. 全程对照第 6.3 节资金红线自查。
