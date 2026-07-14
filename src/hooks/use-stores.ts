import {
  getStoreCategories,
  getStoreDetail,
  getStoresInMap,
} from "@/apis/Store";
import type {
  StoreDetailLocation,
  StoreMapQuery,
} from "@/apis/Store/type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const storeKeys = {
  all: ["stores"] as const,
  categories: () => [...storeKeys.all, "categories"] as const,
  detail: (storeId: number | null, location?: StoreDetailLocation) =>
    [...storeKeys.all, "detail", storeId, location] as const,
  map: (query: StoreMapQuery | null) =>
    [...storeKeys.all, "map", query] as const,
};

const isUnauthorizedError = (error: unknown) =>
  error instanceof AxiosError && error.response?.status === 401;

const showStoreError = (
  error: unknown,
  action: "map" | "categories" | "detail",
) => {
  if (isUnauthorizedError(error)) return;

  let message = {
    map: "주변 가게를 불러오지 못했습니다.",
    categories: "음식 카테고리를 불러오지 못했습니다.",
    detail: "가게 정보를 불러오지 못했습니다.",
  }[action];

  if (error instanceof AxiosError && !error.response) {
    message = "서버에 연결할 수 없습니다.";
  } else if (
    action === "map" &&
    error instanceof AxiosError &&
    error.response?.status === 400
  ) {
    message = "지도 범위를 다시 확인해 주세요.";
  } else if (
    action === "detail" &&
    error instanceof AxiosError &&
    error.response?.status === 404
  ) {
    message = "존재하지 않는 가게입니다.";
  }

  Toast.show({ type: "error", text1: message });
};

export function useStoreCategories() {
  const query = useQuery({
    queryKey: storeKeys.categories(),
    queryFn: ({ signal }) => getStoreCategories(signal),
    staleTime: 10 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (query.error) showStoreError(query.error, "categories");
  }, [query.error]);

  return {
    categories: query.data?.categories ?? [],
    isLoading: query.isLoading,
  };
}

export function useStoresInMap(queryParams: StoreMapQuery | null) {
  const query = useQuery({
    queryKey: storeKeys.map(queryParams),
    queryFn: ({ signal }) => getStoresInMap(queryParams!, signal),
    enabled: queryParams !== null,
    placeholderData: keepPreviousData,
    retry: false,
  });

  useEffect(() => {
    if (query.error) showStoreError(query.error, "map");
  }, [query.error]);

  return {
    stores: query.data?.stores ?? [],
    totalInBounds: query.data?.totalInBounds ?? 0,
    truncated: query.data?.truncated ?? false,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useStoreDetail(
  storeId: number | null,
  location?: StoreDetailLocation,
) {
  const query = useQuery({
    queryKey: storeKeys.detail(storeId, location),
    queryFn: ({ signal }) => getStoreDetail(storeId!, location, signal),
    enabled: storeId !== null,
    retry: false,
  });

  useEffect(() => {
    if (query.error) showStoreError(query.error, "detail");
  }, [query.error]);

  return {
    store: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isRefetching: query.isRefetching,
    refetch: query.refetch,
  };
}
