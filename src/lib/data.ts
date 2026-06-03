export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isHot?: boolean;
  stock: number;
  description: string;
  specs: { label: string; value: string }[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "serum", name: "精华液", icon: "✦" },
  { id: "cream", name: "面霜", icon: "◈" },
  { id: "toner", name: "水乳", icon: "◇" },
  { id: "mask", name: "面膜", icon: "◆" },
  { id: "eye", name: "眼霜", icon: "○" },
  { id: "sunscreen", name: "防晒", icon: "◉" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "焕颜臻萃精华",
    subtitle: "黄金精华 · 28日焕亮肌肤",
    price: 598,
    originalPrice: 780,
    image: "/images/product-serum.png",
    category: "serum",
    tags: ["畅销", "提亮"],
    rating: 4.9,
    reviewCount: 2341,
    isHot: true,
    stock: 50,
    description:
      "融合珍贵黄金因子与玻尿酸复合体，深层修护肌肤屏障，持续28天密集焕亮，还原肌肤自然光泽与弹润感。",
    specs: [
      { label: "净含量", value: "30ml" },
      { label: "适用肤质", value: "所有肤质" },
      { label: "使用时机", value: "早晚均可" },
      { label: "有效期", value: "3年" },
    ],
  },
  {
    id: "2",
    name: "轻盈保湿面霜",
    subtitle: "凝霜质地 · 48H锁水补湿",
    price: 428,
    originalPrice: 560,
    image: "/images/product-cream.png",
    category: "cream",
    tags: ["新品", "保湿"],
    rating: 4.8,
    reviewCount: 1892,
    isNew: true,
    stock: 80,
    description:
      "轻盈凝霜质地，瞬间融于肌肤。天然植萃成分结合高效锁水因子，48小时持续保湿，赋予肌肤丝滑柔润触感。",
    specs: [
      { label: "净含量", value: "50g" },
      { label: "适用肤质", value: "干性/混合性" },
      { label: "使用时机", value: "晚间" },
      { label: "有效期", value: "3年" },
    ],
  },
  {
    id: "3",
    name: "玫瑰柔润水乳套",
    subtitle: "水乳双联 · 平衡滋养",
    price: 368,
    originalPrice: 498,
    image: "/images/product-toner.png",
    category: "toner",
    tags: ["套装", "滋养"],
    rating: 4.7,
    reviewCount: 3156,
    stock: 120,
    description:
      "玫瑰萃取精华与神经酰胺完美结合，轻盈水感质地迅速渗透，平衡肌肤水油，为肌肤打造柔润健康底妆。",
    specs: [
      { label: "净含量", value: "水150ml+乳120ml" },
      { label: "适用肤质", value: "所有肤质" },
      { label: "使用时机", value: "早晚均可" },
      { label: "有效期", value: "3年" },
    ],
  },
  {
    id: "4",
    name: "海藻焕肤面膜",
    subtitle: "深海萃取 · 急救补水",
    price: 198,
    originalPrice: 268,
    image: "/images/product-mask.png",
    category: "mask",
    tags: ["急救", "补水"],
    rating: 4.8,
    reviewCount: 4521,
    isHot: true,
    stock: 200,
    description:
      "深海藻类提取精华，富含矿物质与多糖体，单次使用即可感受明显补水效果，令肌肤丰盈饱满、光泽透亮。",
    specs: [
      { label: "净含量", value: "5片/盒" },
      { label: "适用肤质", value: "所有肤质" },
      { label: "使用时机", value: "晚间" },
      { label: "有效期", value: "2年" },
    ],
  },
  {
    id: "5",
    name: "紧致抗皱眼霜",
    subtitle: "胜肽配方 · 淡化细纹",
    price: 468,
    originalPrice: 620,
    image: "/images/product-eye.png",
    category: "eye",
    tags: ["抗皱", "紧致"],
    rating: 4.9,
    reviewCount: 1678,
    stock: 60,
    description:
      "六胜肽+视黄醇复合配方，精准作用于眼周肌肤，有效淡化细纹与黑眼圈，令眼部肌肤重现年轻紧致光感。",
    specs: [
      { label: "净含量", value: "15ml" },
      { label: "适用肤质", value: "所有肤质" },
      { label: "使用时机", value: "早晚均可" },
      { label: "有效期", value: "3年" },
    ],
  },
  {
    id: "6",
    name: "轻透防晒乳",
    subtitle: "SPF50+ · 自然裸肌感",
    price: 238,
    originalPrice: 298,
    image: "/images/product-sunscreen.png",
    category: "sunscreen",
    tags: ["防晒", "轻薄"],
    rating: 4.7,
    reviewCount: 5892,
    isNew: true,
    stock: 150,
    description:
      "物理+化学双重防晒，SPF50+/PA++++，水润凝乳质地不泛白不油腻，自然裸肌感防护，适合日常通勤防晒。",
    specs: [
      { label: "净含量", value: "50ml" },
      { label: "适用肤质", value: "所有肤质" },
      { label: "使用时机", value: "早间" },
      { label: "有效期", value: "3年" },
    ],
  },
];
