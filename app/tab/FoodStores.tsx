import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import type { StoreMapBounds } from "@/apis/Store/type";
import { FoodCategoryFilter } from "@/components/food-stores/food-category-filter";
import { FoodSearchField } from "@/components/food-stores/food-search-field";
import { FoodSortFilter } from "@/components/food-stores/food-sort-filter";
import {
  createMapRegion,
  FoodCategory,
  FoodSortOption,
  FoodViewMode,
  regionToMapBounds,
  SCHOOL_COORDINATE,
} from "@/components/food-stores/food-store-data";
import { FoodStoreList } from "@/components/food-stores/food-store-list";
import { FoodStoresHeader } from "@/components/food-stores/food-stores-header";
import { FoodStoresMap } from "@/components/food-stores/food-stores-map";
import { FoodViewToggle } from "@/components/food-stores/food-view-toggle";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { colors } from "@/constants/color";
import { screenLayout } from "@/constants/layout";
import {
  useStoreCategories,
  useStoreList,
  useStoresInMap,
} from "@/hooks/use-stores";
import { useSettingsStore } from "@/stores/settings-store";

export default function FoodStores() {
  const { budget: budgetParam } = useLocalSearchParams<{ budget?: string }>();
  const savedBudget = useSettingsStore((state) => state.budget);
  const savedLocation = useSettingsStore((state) => state.location);
  const currentLocation = savedLocation ?? SCHOOL_COORDINATE;
  const currentLatitude = currentLocation.latitude;
  const currentLongitude = currentLocation.longitude;
  const locationKey = `${currentLatitude}:${currentLongitude}`;
  const initialMapRegion = useMemo(
    () =>
      createMapRegion({
        latitude: currentLatitude,
        longitude: currentLongitude,
      }),
    [currentLatitude, currentLongitude],
  );
  const locationBounds = useMemo(
    () => regionToMapBounds(initialMapRegion),
    [initialMapRegion],
  );
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategory>("ALL");
  const [selectedSort, setSelectedSort] =
    useState<FoodSortOption>("DISTANCE_ASC");
  const [viewMode, setViewMode] = useState<FoodViewMode>("map");
  const [query, setQuery] = useState("");
  const [mapViewport, setMapViewport] = useState<{
    bounds: StoreMapBounds;
    locationKey: string;
  }>(() => ({ bounds: locationBounds, locationKey }));
  const mapBounds =
    mapViewport.locationKey === locationKey
      ? mapViewport.bounds
      : locationBounds;

  const parsedBudget = Number(
    Array.isArray(budgetParam) ? budgetParam[0] : budgetParam,
  );
  const budget =
    Number.isFinite(parsedBudget) && parsedBudget > 0
      ? parsedBudget
      : savedBudget;

  const { categories } = useStoreCategories();
  const mapQuery = useMemo(
    () =>
      viewMode === "map"
        ? {
            ...mapBounds,
            maxPrice: budget,
            category:
              selectedCategory === "ALL" ? undefined : [selectedCategory],
            limit: 100,
            lat: currentLatitude,
            lng: currentLongitude,
          }
        : null,
    [
      budget,
      currentLatitude,
      currentLongitude,
      mapBounds,
      selectedCategory,
      viewMode,
    ],
  );
  const listFilters = useMemo(
    () =>
      viewMode === "list"
        ? {
            category:
              selectedCategory === "ALL" ? undefined : [selectedCategory],
            maxPrice: budget,
            lat: currentLatitude,
            lng: currentLongitude,
            sort: selectedSort,
            size: 20,
          }
        : null,
    [
      budget,
      currentLatitude,
      currentLongitude,
      selectedCategory,
      selectedSort,
      viewMode,
    ],
  );
  const {
    stores: mapStores,
    truncated,
    isLoading: isMapLoading,
    isFetching: isMapFetching,
    isError: isMapError,
    refetch: refetchMap,
  } = useStoresInMap(mapQuery);
  const {
    stores: listStores,
    isLoading: isListLoading,
    isError: isListError,
    isRefetching: isListRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch: refetchList,
  } = useStoreList(listFilters);

  const handleBoundsChange = useCallback(
    (nextBounds: StoreMapBounds) => {
      setMapViewport((currentViewport) => {
        const isSameBounds = (
          Object.keys(nextBounds) as (keyof StoreMapBounds)[]
        ).every((key) => currentViewport.bounds[key] === nextBounds[key]);

        return currentViewport.locationKey === locationKey && isSameBounds
          ? currentViewport
          : { bounds: nextBounds, locationKey };
      });
    },
    [locationKey],
  );

  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
  const visibleMapStores = useMemo(() => {
    return mapStores.filter((store) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        store.name.toLocaleLowerCase("ko-KR").includes(normalizedQuery);

      return matchesQuery;
    });
  }, [mapStores, normalizedQuery]);
  const visibleListStores = useMemo(
    () =>
      listStores.filter(
        (store) =>
          normalizedQuery.length === 0 ||
          store.name.toLocaleLowerCase("ko-KR").includes(normalizedQuery),
      ),
    [listStores, normalizedQuery],
  );

  return (
    <Page>
      <ContentScroll
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <FoodStoresHeader budget={budget} />
          <FoodCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <FoodSearchField value={query} onChangeText={setQuery} />

          <FoodViewToggle viewMode={viewMode} onChangeViewMode={setViewMode} />
          {viewMode === "list" ? (
            <FoodSortFilter
              selectedSort={selectedSort}
              onSelectSort={setSelectedSort}
            />
          ) : (
            <FilterSpacer />
          )}

          {viewMode === "map" ? (
            <>
              {truncated && (
                <NoticeBanner>
                  가게가 많아요. 지도를 확대하면 더 정확히 볼 수 있어요.
                </NoticeBanner>
              )}
              {isMapError && (
                <ErrorBanner onPress={() => void refetchMap()}>
                  가게를 불러오지 못했어요. 눌러서 다시 시도해 주세요.
                </ErrorBanner>
              )}
              <FoodStoresMap
                budget={budget}
                initialRegion={initialMapRegion}
                isLoading={isMapLoading || isMapFetching}
                onBoundsChange={handleBoundsChange}
                stores={visibleMapStores}
              />
            </>
          ) : (
            <>
              {isListLoading ? (
                <NoticeBanner>가게를 불러오는 중이에요.</NoticeBanner>
              ) : isListError ? (
                <ErrorBanner onPress={() => void refetchList()}>
                  가게를 불러오지 못했어요. 눌러서 다시 시도해 주세요.
                </ErrorBanner>
              ) : (
                <>
                  <FoodStoreList
                    budget={budget}
                    categories={categories}
                    stores={visibleListStores}
                  />
                  {hasNextPage && (
                    <LoadMoreButton
                      accessibilityRole="button"
                      disabled={isFetchingNextPage || isListRefetching}
                      onPress={() => void fetchNextPage()}
                    >
                      <LoadMoreText>
                        {isFetchingNextPage
                          ? "가게를 더 불러오는 중..."
                          : "가게 더 보기"}
                      </LoadMoreText>
                    </LoadMoreButton>
                  )}
                </>
              )}
            </>
          )}
        </Content>
      </ContentScroll>

      <AppBottomNavigation activeTab="home" />
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
`;

const ContentScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  width: 100%;
  max-width: ${screenLayout.contentMaxWidth}px;
  align-self: center;
  padding: ${screenLayout.topPadding}px ${screenLayout.horizontalPadding}px
    ${screenLayout.bottomPadding}px;
`;

const FilterSpacer = styled.View`
  height: 10px;
`;

const NoticeBanner = styled.Text`
  margin-bottom: 8px;
  padding: 9px 12px;
  overflow: hidden;
  border-radius: 10px;
  background-color: ${colors.primary100};
  color: ${colors.primary900};
  font-size: 12px;
  font-weight: 700;
`;

const ErrorBanner = styled.Text`
  margin-bottom: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: ${colors.neutral100};
  color: ${colors.errorRed};
  font-size: 12px;
  font-weight: 800;
`;

const LoadMoreButton = styled.Pressable`
  min-height: 44px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 12px;
  background-color: ${colors.neutral0};
`;

const LoadMoreText = styled.Text`
  color: ${colors.primary800};
  font-size: 14px;
  font-weight: 800;
`;
