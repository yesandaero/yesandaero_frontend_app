import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { FOOD_CATEGORIES, FoodCategory } from "./food-store-data";

type FoodCategoryFilterProps = {
  selectedCategory: FoodCategory;
  onSelectCategory: (category: FoodCategory) => void;
};

export function FoodCategoryFilter({
  selectedCategory,
  onSelectCategory,
}: FoodCategoryFilterProps) {
  return (
    <CategoryScroll horizontal showsHorizontalScrollIndicator={false}>
      {FOOD_CATEGORIES.map((category) => {
        const isSelected = category === selectedCategory;

        return (
          <CategoryButton
            key={category}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            $selected={isSelected}
            onPress={() => onSelectCategory(category)}
          >
            <CategoryText $selected={isSelected}>{category}</CategoryText>
          </CategoryButton>
        );
      })}
    </CategoryScroll>
  );
}

const CategoryScroll = styled(ScrollView).attrs({
  contentContainerStyle: { gap: 8 },
})`
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
