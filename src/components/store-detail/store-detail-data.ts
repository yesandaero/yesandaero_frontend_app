export type StoreMenu = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  soldOut?: boolean;
};

export const STORE_DETAIL = {
  name: "이모네 국밥",
  category: "한식",
  distance: "도보 6분 · 420m",
  address: "대전 유성구 궁동 123-4",
  openingHours: "09:00 ~ 21:00",
  minimumOrder: "없음",
  rating: "4.6 ⭐",
  budget: 8000,
  menus: [
    {
      id: "sundae",
      name: "순대국밥",
      description: "사골국물에 순대와 내장을 듬뿍",
      originalPrice: 9000,
      price: 8100,
    },
    {
      id: "pork",
      name: "돼지국밥",
      description: "진하게 우려낸 사골 육수",
      originalPrice: 9000,
      price: 8100,
    },
    {
      id: "suyuk",
      name: "수육(소)",
      description: "두 사람이 먹기 좋은 양",
      price: 16200,
      soldOut: true,
    },
    {
      id: "egg",
      name: "계란찜",
      description: "뚝배기 계란찜",
      originalPrice: 4000,
      price: 3600,
    },
  ] satisfies StoreMenu[],
} as const;
