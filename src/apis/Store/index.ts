import { api } from "@/apis";

import type {
  StoreCategoriesResponse,
  StoreDetailLocation,
  StoreDetailResponse,
  StoreMapQuery,
  StoreMapResponse,
} from "./type";

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

  const response = await api.get<StoreMapResponse>("/stores/map", {
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
