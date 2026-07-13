export type StoreMenu = {
  menuId: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
};

export type StoreDetailResponse = {
  storeId: number;
  name: string;
  category: "KOREAN" | "CHINESE" | "JAPANESE" | "WESTERN" | "SNACK" | "CAFE";
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  avgPrice: number;
  description: string;
  openTime: string;
  closeTime: string;
  minOrderAmount: number;
  distanceMeters: number;
  walkingMinutes: number;
  menus: StoreMenu[];
  usableCouponCount: number;
};

export const STORE_DETAIL: StoreDetailResponse = {
  storeId: 10,
  name: "시흔식당",
  category: "KOREAN",
  address: "대전시 유성구 유성북로",
  latitude: 36.3624,
  longitude: 127.3568,
  phone: "042-000-0000",
  avgPrice: 9000,
  description: "백반 전문점",
  openTime: "09:00",
  closeTime: "21:00",
  minOrderAmount: 8000,
  distanceMeters: 320,
  walkingMinutes: 4,
  menus: [
    {
      menuId: 1,
      name: "제육볶음",
      description: "매콤한 제육",
      price: 9000,
      discountedPrice: 8000,
    },
  ],
  usableCouponCount: 2,
};
