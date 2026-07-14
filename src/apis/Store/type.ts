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

export type StoreListSort =
  | "PRICE_ASC"
  | "DISCOUNT_DESC"
  | "DISTANCE_ASC";

export type StoreListQuery = {
  category?: StoreCategoryCode[];
  maxPrice?: number;
  lat?: number;
  lng?: number;
  sort?: StoreListSort;
  page?: number;
  size?: number;
};

export type StoreListFilters = Omit<StoreListQuery, "page">;

export type StoreListResponse = {
  content: MapStore[];
  page: number;
  totalPages: number;
};

export type StoreCategoriesResponse = {
  categories: StoreCategory[];
};

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
  category: StoreCategoryCode;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  avgPrice: number;
  description: string;
  openTime: string;
  closeTime: string;
  minOrderAmount: number;
  distanceMeters: number | null;
  walkingMinutes: number | null;
  menus: StoreMenu[];
  usableCouponCount: number;
};

export type StoreDetailLocation = {
  lat: number;
  lng: number;
};
