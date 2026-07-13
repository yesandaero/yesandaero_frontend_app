export type StoreCategoryCode =
  | "KOREAN"
  | "CHINESE"
  | "JAPANESE"
  | "WESTERN"
  | "SNACK"
  | "CAFE";

export type StoreCategory = {
  code: StoreCategoryCode;
  label: string;
};

export type StoreMapBounds = {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
};

export type StoreMapQuery = StoreMapBounds & {
  maxPrice?: number;
  category?: StoreCategoryCode[];
  limit?: number;
  lat?: number;
  lng?: number;
};

export type MapStore = {
  storeId: number;
  name: string;
  category: StoreCategoryCode;
  avgPrice: number;
  latitude: number;
  longitude: number;
  openTime: string;
  closeTime: string;
  minOrderAmount: number;
  distanceMeters: number | null;
  walkingMinutes: number | null;
  hasUsableCoupon: boolean;
};

export type StoreMapResponse = {
  stores: MapStore[];
  totalInBounds: number;
  truncated: boolean;
};

export type StoreCategoriesResponse = {
  categories: StoreCategory[];
};
