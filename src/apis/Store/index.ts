import { api } from "@/apis";

import type {
  StoreCategoriesResponse,
  StoreDetailLocation,
  StoreDetailResponse,
  StoreListQuery,
  StoreListResponse,
  MapStore,
  StoreMapQuery,
  StoreMapResponse,
} from "./type";

type RawMapStore = Omit<MapStore, "storeId" | "latitude" | "longitude"> & {
  storeId: number | string;
  latitude?: number | string;
  longitude?: number | string;
  lat?: number | string;
  lng?: number | string;
};

type RawStoreMapResponse = Omit<StoreMapResponse, "stores"> & {
  stores: RawMapStore[];
};

const normalizeMapStore = (store: RawMapStore): MapStore => ({
  ...store,
  storeId: Number(store.storeId),
  latitude: Number(store.latitude ?? store.lat),
  longitude: Number(store.longitude ?? store.lng),
});

const appendNumber = (
  params: URLSearchParams,
  key: string,
  value: number | undefined,
) => {
  if (value !== undefined) params.append(key, String(value));
};

export const getStoresInMap = async (
  query: StoreMapQuery,
  signal?: AbortSignal,
) => {
  const params = new URLSearchParams();

  appendNumber(params, "swLat", query.swLat);
  appendNumber(params, "swLng", query.swLng);
  appendNumber(params, "neLat", query.neLat);
  appendNumber(params, "neLng", query.neLng);
  appendNumber(params, "maxPrice", query.maxPrice);
  appendNumber(params, "limit", query.limit);
  appendNumber(params, "lat", query.lat);
  appendNumber(params, "lng", query.lng);
  query.category?.forEach((category) => params.append("category", category));

  const response = await api.get<RawStoreMapResponse>("/stores/map", {
    params,
    signal,
  });

  return {
    ...response.data,
    stores: Array.isArray(response.data.stores)
      ? response.data.stores.map(normalizeMapStore)
      : [],
  } satisfies StoreMapResponse;
};

export const getStores = async (
  query: StoreListQuery,
  signal?: AbortSignal,
) => {
  const params = new URLSearchParams();

  query.category?.forEach((category) => params.append("category", category));
  appendNumber(params, "maxPrice", query.maxPrice);
  appendNumber(params, "lat", query.lat);
  appendNumber(params, "lng", query.lng);
  if (query.sort) params.append("sort", query.sort);
  appendNumber(params, "page", query.page);
  appendNumber(params, "size", query.size);

  const response = await api.get<StoreListResponse>("/stores", {
    params,
    signal,
  });

  return response.data;
};

export const getStoreCategories = async (signal?: AbortSignal) => {
  const response = await api.get<StoreCategoriesResponse>(
    "/stores/categories",
    { signal },
  );

  return response.data;
};

export const getStoreDetail = async (
  storeId: number,
  location?: StoreDetailLocation,
  signal?: AbortSignal,
) => {
  const response = await api.get<StoreDetailResponse>(`/stores/${storeId}`, {
    params: location,
    signal,
  });

  return response.data;
};
