import React from "react";
import styled from "styled-components/native";

import { locationColors } from "./location-theme";

export function LocationBottomNavigation() {
  return (
    <Navigation accessibilityRole="tablist">
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

const Navigation = styled.View`
  min-height: 88px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px 32px 16px;
  border-top-width: 1px;
  border-top-color: ${locationColors.outline};
  background-color: #ffffff;
`;

const NavigationItem = styled.View`
  min-width: 92px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Text`
  font-size: 24px;
  line-height: 30px;
`;

const InactiveLabel = styled.Text`
  margin-top: 2px;
  color: ${locationColors.muted};
  font-size: 14px;
  font-weight: 700;
`;

const ActiveLabel = styled.Text`
  margin-top: 2px;
  color: ${locationColors.goldDark};
  font-size: 14px;
  font-weight: 800;
`;
