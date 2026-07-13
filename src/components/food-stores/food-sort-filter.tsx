import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { FoodSortOption } from "./food-store-data";

type FoodSortFilterProps = {
  selectedSort: FoodSortOption;
  onSelectSort: (sort: FoodSortOption) => void;
};

const OPTIONS: { label: string; value: FoodSortOption }[] = [
  { label: "할인많은순", value: "discount" },
  { label: "평점순", value: "rating" },
];

export function FoodSortFilter({
  selectedSort,
  onSelectSort,
}: FoodSortFilterProps) {
  return (
    <Container>
      {OPTIONS.map((option) => {
        const isSelected = option.value === selectedSort;

        return (
          <SortButton
            key={option.value}
            accessibilityState={{ selected: isSelected }}
            $selected={isSelected}
            onPress={() => onSelectSort(option.value)}
          >
            <SortText $selected={isSelected}>{option.label}</SortText>
          </SortButton>
        );
      })}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  gap: 8px;
  margin: 10px 0;
`;

const SortButton = styled.Pressable<{ $selected: boolean }>`
  min-height: 38px;
  padding: 0 14px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ $selected }) =>
    $selected ? colors.primary700 : colors.primary300};
  border-radius: 12px;
  background-color: ${({ $selected }) =>
    $selected ? colors.primary100 : colors.neutral0};
`;

const SortText = styled.Text<{ $selected: boolean }>`
  color: ${({ $selected }) =>
    $selected ? colors.primary800 : colors.neutral700};
  font-size: 13px;
  font-weight: 800;
`;
