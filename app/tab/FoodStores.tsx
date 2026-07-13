import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import type { StoreMapBounds } from "@/apis/Store/type";
import { FoodCategoryFilter } from "@/components/food-stores/food-category-filter";
import { FoodSearchField } from "@/components/food-stores/food-search-field";
import { FoodSortFilter } from "@/components/food-stores/food-sort-filter";
import {
  DEFAULT_MAP_BOUNDS,
  FoodCategory,
  FoodSortOption,
  FoodViewMode,
  SCHOOL_COORDINATE,
} from "@/components/food-stores/food-store-data";
import { FoodStoreList } from "@/components/food-stores/food-store-list";
import { FoodStoresHeader } from "@/components/food-stores/food-stores-header";
import { FoodStoresMap } from "@/components/food-stores/food-stores-map";
import { FoodViewToggle } from "@/components/food-stores/food-view-toggle";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { colors } from "@/constants/color";
import { screenLayout } from "@/constants/layout";
import { useStoreCategories, useStoresInMap } from "@/hooks/use-stores";
import { useSettingsStore } from "@/stores/settings-store";

export default function FoodStores() {
  const { budget: budgetParam } = useLocalSearchParams<{ budget?: string }>();
  const savedBudget = useSettingsStore((state) => state.budget);
  const savedLocation = useSettingsStore((state) => state.location);
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategory>("ALL");
  const [selectedSort, setSelectedSort] = useState<FoodSortOption>("distance");
  const [viewMode, setViewMode] = useState<FoodViewMode>("map");
  const [query, setQuery] = useState("");
  const [mapBounds, setMapBounds] =
    useState<StoreMapBounds>(DEFAULT_MAP_BOUNDS);

  const parsedBudget = Number(
    Array.isArray(budgetParam) ? budgetParam[0] : budgetParam,
  );
  const budget =
    Number.isFinite(parsedBudget) && parsedBudget > 0
      ? parsedBudget
      : savedBudget;

  const { categories } = useStoreCategories();
  const currentLocation = savedLocation ?? SCHOOL_COORDINATE;
  const mapQuery = useMemo(
    () => ({
      ...mapBounds,
      maxPrice: budget,
      category:
        selectedCategory === "ALL" ? undefined : [selectedCategory],
      limit: 100,
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    }),
    [
      budget,
      currentLocation.latitude,
      currentLocation.longitude,
      mapBounds,
      selectedCategory,
    ],
  );
  const {
    stores,
    truncated,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useStoresInMap(mapQuery);

  const handleBoundsChange = useCallback((nextBounds: StoreMapBounds) => {
    setMapBounds((currentBounds) => {
      const isSameBounds = (Object.keys(currentBounds) as (keyof StoreMapBounds)[])
        .every((key) => currentBounds[key] === nextBounds[key]);

      return isSameBounds ? currentBounds : nextBounds;
    });
  }, []);

  const visibleStores = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

    return stores.filter((store) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        store.name.toLocaleLowerCase("ko-KR").includes(normalizedQuery);

      return matchesQuery;
    }).sort((firstStore, secondStore) => {
      if (selectedSort === "distance") {
        return (firstStore.distanceMeters ?? Number.POSITIVE_INFINITY) -
          (secondStore.distanceMeters ?? Number.POSITIVE_INFINITY);
      }

      return firstStore.avgPrice - secondStore.avgPrice;
    });
  }, [query, selectedSort, stores]);

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
              {isError && (
                <ErrorBanner onPress={() => void refetch()}>
                  가게를 불러오지 못했어요. 눌러서 다시 시도해 주세요.
                </ErrorBanner>
              )}
              <FoodStoresMap
                budget={budget}
                isLoading={isLoading || isFetching}
                onBoundsChange={handleBoundsChange}
                stores={visibleStores}
              />
            </>
          ) : (
            <>
              {isLoading ? (
                <NoticeBanner>가게를 불러오는 중이에요.</NoticeBanner>
              ) : isError ? (
                <ErrorBanner onPress={() => void refetch()}>
                  가게를 불러오지 못했어요. 눌러서 다시 시도해 주세요.
                </ErrorBanner>
              ) : (
                <FoodStoreList
                  budget={budget}
                  categories={categories}
                  stores={visibleStores}
                />
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
