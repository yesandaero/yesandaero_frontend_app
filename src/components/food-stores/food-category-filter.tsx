import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import type { StoreCategory } from "@/apis/Store/type";
import { colors } from "@/constants/color";
import { FoodCategory } from "./food-store-data";

type FoodCategoryFilterProps = {
  categories: StoreCategory[];
  selectedCategory: FoodCategory;
  onSelectCategory: (category: FoodCategory) => void;
};

export function FoodCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: FoodCategoryFilterProps) {
  const options = [{ code: "ALL" as const, label: "전체" }, ...categories];

  return (
    <CategoryScroll
      directionalLockEnabled
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
    >
      {options.map((category) => {
        const isSelected = category.code === selectedCategory;

        return (
          <CategoryButton
            key={category.code}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            $selected={isSelected}
            onPress={() => onSelectCategory(category.code)}
          >
            <CategoryText $selected={isSelected}>{category.label}</CategoryText>
          </CategoryButton>
        );
      })}
    </CategoryScroll>
  );
}

const CategoryScroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 8,
    paddingRight: 16,
  },
})`
  width: 100%;
  flex-grow: 0;
  margin-bottom: 12px;
`;

const CategoryButton = styled.Pressable<{ $selected: boolean }>`
  min-height: 42px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ $selected }) =>
    $selected ? colors.primary700 : colors.primary300};
  border-radius: 13px;
  background-color: ${({ $selected }) =>
    $selected ? colors.primary700 : colors.neutral0};
`;

const CategoryText = styled.Text<{ $selected: boolean }>`
  color: ${({ $selected }) =>
    $selected ? colors.neutral0 : colors.neutral700};
  font-size: 14px;
  font-weight: 800;
`;
