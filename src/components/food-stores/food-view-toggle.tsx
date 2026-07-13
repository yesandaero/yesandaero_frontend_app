import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { FoodViewMode } from "./food-store-data";

type FoodViewToggleProps = {
  viewMode: FoodViewMode;
  onChangeViewMode: (mode: FoodViewMode) => void;
};

export function FoodViewToggle({
  viewMode,
  onChangeViewMode,
}: FoodViewToggleProps) {
  return (
    <Container>
      <ToggleButton
        accessibilityState={{ selected: viewMode === "map" }}
        $selected={viewMode === "map"}
        onPress={() => onChangeViewMode("map")}
      >
        <ToggleText $selected={viewMode === "map"}>🗺️ 지도로 보기</ToggleText>
      </ToggleButton>
      <ToggleButton
        accessibilityState={{ selected: viewMode === "list" }}
        $selected={viewMode === "list"}
        onPress={() => onChangeViewMode("list")}
      >
        <ToggleText $selected={viewMode === "list"}>📋 목록으로 보기</ToggleText>
      </ToggleButton>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 12px;
`;

const ToggleButton = styled.Pressable<{ $selected: boolean }>`
  min-height: 46px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ $selected }) =>
    $selected ? colors.primary700 : colors.primary300};
  border-radius: 14px;
  background-color: ${({ $selected }) =>
    $selected ? colors.primary700 : colors.neutral0};
`;

const ToggleText = styled.Text<{ $selected: boolean }>`
  color: ${({ $selected }) =>
    $selected ? colors.neutral0 : colors.neutral700};
  font-size: 14px;
  font-weight: 800;
`;
