import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

export function LocationBottomNavigation() {
  const insets = useSafeAreaInsets();

  return (
    <Navigation accessibilityRole="tablist" $bottomInset={insets.bottom}>
      <NavigationItem accessibilityRole="tab" accessibilityState={{ selected: false }}>
        <Icon>🏠</Icon>
        <InactiveLabel>홈</InactiveLabel>
      </NavigationItem>

      <NavigationItem accessibilityRole="tab" accessibilityState={{ selected: true }}>
        <Icon>⚙️</Icon>
        <ActiveLabel>맛집 설정</ActiveLabel>
      </NavigationItem>
    </Navigation>
  );
}

const Navigation = styled.View<{ $bottomInset: number }>`
  min-height: ${({ $bottomInset }) => 60 + $bottomInset}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 6px 32px ${({ $bottomInset }) => Math.max($bottomInset, 6)}px;
  border-top-width: 1px;
  border-top-color: ${colors.primary200};
  background-color: ${colors.neutral0};
`;

const NavigationItem = styled.View`
  min-width: 82px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Text`
  font-size: 21px;
  line-height: 25px;
`;

const InactiveLabel = styled.Text`
  margin-top: 2px;
  color: ${colors.neutral600};
  font-size: 12px;
  font-weight: 700;
`;

const ActiveLabel = styled.Text`
  margin-top: 2px;
  color: ${colors.primary800};
  font-size: 12px;
  font-weight: 800;
`;
