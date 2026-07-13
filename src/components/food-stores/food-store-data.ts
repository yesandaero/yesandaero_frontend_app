export type FoodCategory =
  | "전체"
  | "한식"
  | "분식"
  | "치킨·피자"
  | "카페·디저트";

export type FoodSortOption = "discount" | "rating";
export type FoodViewMode = "map" | "list";

export type FoodStore = {
  id: string;
  name: string;
  category: Exclude<FoodCategory, "전체">;
  menu: string;
  price: number;
  rating: number;
  discount: number;
  emoji: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

export const FOOD_CATEGORIES: FoodCategory[] = [
  "전체",
  "한식",
  "분식",
  "치킨·피자",
  "카페·디저트",
];

export const FOOD_STORES: FoodStore[] = [
  {
    id: "1",
    name: "대덕손만두",
    category: "한식",
    menu: "고기만두 · 김치만두",
    price: 6500,
    rating: 4.8,
    discount: 18,
    emoji: "🥟",
    coordinate: { latitude: 36.3932, longitude: 127.3614 },
  },
  {
    id: "2",
    name: "한그릇 분식",
    category: "분식",
    menu: "떡볶이 · 김밥",
    price: 4250,
    rating: 4.6,
    discount: 25,
    emoji: "🍢",
    coordinate: { latitude: 36.3917, longitude: 127.3644 },
  },
  {
    id: "3",
    name: "소프트 치킨",
    category: "치킨·피자",
    menu: "순살치킨 · 조각피자",
    price: 7500,
    rating: 4.7,
    discount: 20,
    emoji: "🍗",
    coordinate: { latitude: 36.3908, longitude: 127.3637 },
  },
  {
    id: "4",
    name: "학교앞 국밥",
    category: "한식",
    menu: "돼지국밥 · 공깃밥",
    price: 7000,
    rating: 4.9,
    discount: 12,
    emoji: "🍲",
    coordinate: { latitude: 36.3902, longitude: 127.3621 },
  },
  {
    id: "5",
    name: "빨간지붕 카페",
    category: "카페·디저트",
    menu: "아메리카노 · 크로플",
    price: 3500,
    rating: 4.5,
    discount: 30,
    emoji: "☕",
    coordinate: { latitude: 36.3911, longitude: 127.3631 },
  },
];
