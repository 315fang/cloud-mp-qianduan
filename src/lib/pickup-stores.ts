export type StockLevel = "high" | "low" | "none";

export interface PickupStore {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  stock: StockLevel;
  /** 是否支持自提（部分门店仅作展示，不支持自提） */
  pickup: boolean;
}

export const stockMeta: Record<StockLevel, { label: string; color: string; bg: string }> = {
  high: { label: "现货充足", color: "#2D8C5E", bg: "#E6F4EC" },
  low: { label: "库存紧张", color: "#C2410C", bg: "#FFF1E6" },
  none: { label: "暂无现货", color: "#9A8B7A", bg: "#F0EAE1" },
};

export const pickupStores: PickupStore[] = [
  {
    id: "s1",
    name: "南京西路旗舰店",
    address: "上海市静安区南京西路 1111 号问兰大厦 1F",
    distance: "0.8km",
    phone: "021-6288 1234",
    hours: "10:00 - 22:00",
    stock: "high",
    pickup: true,
  },
  {
    id: "s2",
    name: "陆家嘴中心店",
    address: "上海市浦东新区世纪大道 8 号上海国金中心 B1",
    distance: "3.2km",
    phone: "021-5012 6688",
    hours: "10:00 - 22:00",
    stock: "low",
    pickup: true,
  },
  {
    id: "s3",
    name: "徐家汇体验店",
    address: "上海市徐汇区漕溪北路 88 号美罗城 5F",
    distance: "5.6km",
    phone: "021-6426 9900",
    hours: "10:00 - 21:30",
    stock: "high",
    pickup: true,
  },
  {
    id: "s4",
    name: "虹桥前滩展示点",
    address: "上海市闵行区申长路 818 号虹桥天地 2F",
    distance: "11.4km",
    phone: "021-3251 7788",
    hours: "11:00 - 21:00",
    stock: "none",
    pickup: false,
  },
];
