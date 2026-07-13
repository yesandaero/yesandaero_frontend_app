export type FoodCategory =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "분식"
  | "카페";

export type FoodSortOption = "discount" | "distance" | "price";
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

export const SCHOOL_COORDINATE = {
  latitude: 36.39151,
  longitude: 127.36307,
} as const;

const EARTH_RADIUS_METERS = 6_371_000;

export function getDistanceFromSchool(store: FoodStore) {
  const latitudeDelta =
    ((store.coordinate.latitude - SCHOOL_COORDINATE.latitude) * Math.PI) / 180;
  const longitudeDelta =
    ((store.coordinate.longitude - SCHOOL_COORDINATE.longitude) * Math.PI) /
    180;
  const schoolLatitude = (SCHOOL_COORDINATE.latitude * Math.PI) / 180;
  const storeLatitude = (store.coordinate.latitude * Math.PI) / 180;
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(schoolLatitude) *
      Math.cos(storeLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return (
    2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "분식",
  "카페",
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
    name: "소프트 파스타",
    category: "양식",
    menu: "토마토 파스타 · 조각피자",
    price: 7500,
    rating: 4.7,
    discount: 20,
    emoji: "🍝",
    coordinate: { latitude: 36.3908, longitude: 127.3637 },
  },
  {
    id: "4",
    name: "궁동 짜장면",
    category: "중식",
    menu: "짜장면 · 미니 탕수육",
    price: 7000,
    rating: 4.9,
    discount: 12,
    emoji: "🥡",
    coordinate: { latitude: 36.3902, longitude: 127.3621 },
  },
  {
    id: "5",
    name: "빨간지붕 카페",
    category: "카페",
    menu: "아메리카노 · 크로플",
    price: 3500,
    rating: 4.5,
    discount: 30,
    emoji: "☕",
    coordinate: { latitude: 36.3911, longitude: 127.3631 },
  },
  {
    id: "6",
    name: "하루 초밥",
    category: "일식",
    menu: "모둠 초밥 · 미니 우동",
    price: 8000,
    rating: 4.7,
    discount: 15,
    emoji: "🍣",
    coordinate: { latitude: 36.3923, longitude: 127.3638 },
  },
];
