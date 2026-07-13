import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type FoodSearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function FoodSearchField({ value, onChangeText }: FoodSearchFieldProps) {
  return (
    <SearchBox>
      <SearchIcon>⌕</SearchIcon>
      <SearchInput
        accessibilityLabel="메뉴 검색"
        onChangeText={onChangeText}
        placeholder="메뉴 검색"
        placeholderTextColor={colors.neutral600}
        returnKeyType="search"
        value={value}
      />
    </SearchBox>
  );
}

const SearchBox = styled.View`
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 15px;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 16px;
  background-color: ${colors.neutral0};
`;

const SearchIcon = styled.Text`
  margin-right: 9px;
  color: ${colors.neutral800};
  font-size: 27px;
  line-height: 30px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 0;
  color: ${colors.neutral900};
  font-size: 15px;
  font-weight: 600;
`;
