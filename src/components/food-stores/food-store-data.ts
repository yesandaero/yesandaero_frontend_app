import type {
  StoreCategory,
  StoreCategoryCode,
  StoreMapBounds,
} from "@/apis/Store/type";

export type FoodCategory = StoreCategoryCode | "ALL";
export type FoodSortOption = "distance" | "price";
export type FoodViewMode = "map" | "list";

export const SCHOOL_COORDINATE = {
  latitude: 36.39151,
  longitude: 127.36307,
} as const;

export const SCHOOL_REGION = {
  ...SCHOOL_COORDINATE,
  latitudeDelta: 0.007,
  longitudeDelta: 0.007,
} as const;

export const regionToMapBounds = (region: {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}): StoreMapBounds => {
  const round = (value: number) => Number(value.toFixed(6));

  return {
    swLat: round(region.latitude - region.latitudeDelta / 2),
    swLng: round(region.longitude - region.longitudeDelta / 2),
    neLat: round(region.latitude + region.latitudeDelta / 2),
    neLng: round(region.longitude + region.longitudeDelta / 2),
  };
};

export const DEFAULT_MAP_BOUNDS = regionToMapBounds(SCHOOL_REGION);

export const getCategoryLabel = (
  code: StoreCategoryCode,
  categories: StoreCategory[],
) => categories.find((category) => category.code === code)?.label ?? code;
