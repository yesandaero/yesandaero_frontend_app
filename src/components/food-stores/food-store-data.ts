import type {
  StoreCategory,
  StoreCategoryCode,
  StoreListSort,
  StoreMapBounds,
} from "@/apis/Store/type";

export type FoodCategory = StoreCategoryCode | "ALL";
export type FoodSortOption = StoreListSort;
export type FoodViewMode = "map" | "list";

export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

export type FoodMapRegion = MapCoordinate & {
  latitudeDelta: number;
  longitudeDelta: number;
};

const MAP_LATITUDE_DELTA = 0.03;
const MAP_LONGITUDE_DELTA = 0.03;

export const SCHOOL_COORDINATE = {
  latitude: 36.39151,
  longitude: 127.36307,
} as const;

export const createMapRegion = (
  coordinate: MapCoordinate,
): FoodMapRegion => ({
  ...coordinate,
  latitudeDelta: MAP_LATITUDE_DELTA,
  longitudeDelta: MAP_LONGITUDE_DELTA,
});

export const SCHOOL_REGION = createMapRegion(SCHOOL_COORDINATE);

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
