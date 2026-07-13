import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { FoodCategoryFilter } from "@/components/food-stores/food-category-filter";
import {
  FOOD_STORES,
  FoodCategory,
  FoodSortOption,
  FoodViewMode,
} from "@/components/food-stores/food-store-data";
import { FoodStoreList } from "@/components/food-stores/food-store-list";
import { FoodSearchField } from "@/components/food-stores/food-search-field";
import { FoodSortFilter } from "@/components/food-stores/food-sort-filter";
import { FoodStoresHeader } from "@/components/food-stores/food-stores-header";
import { FoodStoresMap } from "@/components/food-stores/food-stores-map";
import { FoodViewToggle } from "@/components/food-stores/food-view-toggle";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { colors } from "@/constants/color";

export default function FoodStores() {
  const { budget: budgetParam } = useLocalSearchParams<{ budget?: string }>();
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategory>("전체");
  const [selectedSort, setSelectedSort] =
    useState<FoodSortOption>("discount");
  const [viewMode, setViewMode] = useState<FoodViewMode>("map");
  const [query, setQuery] = useState("");

  const parsedBudget = Number(
    Array.isArray(budgetParam) ? budgetParam[0] : budgetParam,
  );
  const budget =
    Number.isFinite(parsedBudget) && parsedBudget > 0 ? parsedBudget : 10000;

  const visibleStores = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

    return FOOD_STORES.filter((store) => {
      const matchesBudget = store.price <= budget;
      const matchesCategory =
        selectedCategory === "전체" || store.category === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${store.name} ${store.menu}`
          .toLocaleLowerCase("ko-KR")
          .includes(normalizedQuery);

      return matchesBudget && matchesCategory && matchesQuery;
    }).sort((firstStore, secondStore) =>
      selectedSort === "discount"
        ? secondStore.discount - firstStore.discount
        : secondStore.rating - firstStore.rating,
    );
  }, [budget, query, selectedCategory, selectedSort]);

  return (
    <Page>
      <ContentScroll
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <FoodStoresHeader budget={budget} onBackPress={() => router.back()} />
          <FoodCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <FoodSearchField value={query} onChangeText={setQuery} />
          {viewMode === "list" ? (
            <FoodSortFilter
              selectedSort={selectedSort}
              onSelectSort={setSelectedSort}
            />
          ) : (
            <FilterSpacer />
          )}
          <FoodViewToggle viewMode={viewMode} onChangeViewMode={setViewMode} />

          {viewMode === "map" ? (
            <FoodStoresMap stores={visibleStores} />
          ) : (
            <FoodStoreList stores={visibleStores} />
          )}
        </Content>
      </ContentScroll>

      <AppBottomNavigation activeTab="home" />
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
  background-color: ${colors.primary50};
`;

const ContentScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: ${colors.primary50};
`;

const Content = styled.View`
  width: 100%;
  max-width: 460px;
  align-self: center;
  padding: 14px 16px 24px;
`;

const FilterSpacer = styled.View`
  height: 10px;
`;
