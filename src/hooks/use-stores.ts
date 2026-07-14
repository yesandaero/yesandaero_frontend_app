import {
  getStoreCategories,
  getStoreDetail,
  getStores,
  getStoresInMap,
} from "@/apis/Store";
import type {
  MapStore,
  StoreDetailLocation,
  StoreListFilters,
  StoreMapQuery,
} from "@/apis/Store/type";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import Toast from "react-native-toast-message";

const storeKeys = {
  all: ["stores"] as const,
  categories: () => [...storeKeys.all, "categories"] as const,
  detail: (storeId: number | null, location?: StoreDetailLocation) =>
    [...storeKeys.all, "detail", storeId, location] as const,
  list: (filters: StoreListFilters | null) =>
    [...storeKeys.all, "list", filters] as const,
  map: (query: StoreMapQuery | null) =>
    [...storeKeys.all, "map", query] as const,
};

const isUnauthorizedError = (error: unknown) =>
  error instanceof AxiosError && error.response?.status === 401;

const showStoreError = (
  error: unknown,
  action: "map" | "list" | "categories" | "detail",
) => {
  if (isUnauthorizedError(error)) return;

  let message = {
    map: "주변 가게를 불러오지 못했습니다.",
    list: "가게 목록을 불러오지 못했습니다.",
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
    action === "list" &&
    error instanceof AxiosError &&
    error.response?.status === 400
  ) {
    message = "목록 필터나 정렬 조건을 다시 확인해 주세요.";
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

export function useStoreList(filters: StoreListFilters | null) {
  const query = useInfiniteQuery({
    queryKey: storeKeys.list(filters),
    queryFn: ({ pageParam, signal }) =>
      getStores({ ...filters!, page: pageParam }, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 < lastPage.totalPages
        ? lastPage.page + 1
        : undefined,
    enabled: filters !== null,
    retry: false,
  });

  useEffect(() => {
    if (query.error) showStoreError(query.error, "list");
  }, [query.error]);

  return {
    stores: query.data?.pages.flatMap((page) => page.content) ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    isRefetching: query.isRefetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
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

export function useStoreMenuSearch(
  stores: MapStore[],
  searchText: string,
  location?: StoreDetailLocation,
) {
  const normalizedSearchText = searchText
    .trim()
    .toLocaleLowerCase("ko-KR");
  const isSearching = normalizedSearchText.length > 0;
  const detailQueries = useQueries({
    queries: stores.map((store) => ({
      queryKey: storeKeys.detail(store.storeId, location),
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        getStoreDetail(store.storeId, location, signal),
      enabled: isSearching,
      staleTime: 5 * 60 * 1000,
      retry: false,
    })),
  });

  const filteredStores = useMemo(() => {
    if (!isSearching) return stores;

    return stores.filter((store, index) => {
      const matchesStoreName = store.name
        .toLocaleLowerCase("ko-KR")
        .includes(normalizedSearchText);
      const matchesMenuName = detailQueries[index]?.data?.menus.some((menu) =>
        menu.name
          .toLocaleLowerCase("ko-KR")
          .includes(normalizedSearchText),
      );

      return matchesStoreName || matchesMenuName;
    });
  }, [detailQueries, isSearching, normalizedSearchText, stores]);

  return {
    stores: filteredStores,
    isSearchingMenus:
      isSearching && detailQueries.some((query) => query.isPending),
  };
}
