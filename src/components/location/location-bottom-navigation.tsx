import React from "react";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type LocationBottomNavigationProps = {
  activeTab?: "home" | "settings";
};

export function LocationBottomNavigation({
  activeTab = "settings",
}: LocationBottomNavigationProps) {
  const insets = useSafeAreaInsets();

  return (
    <Navigation accessibilityRole="tablist" $bottomInset={insets.bottom}>
      <NavigationItem
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === "home" }}
        onPress={() => router.push("/tab/FoodStores")}
      >
        <Icon>🏠</Icon>
        <NavigationLabel $active={activeTab === "home"}>홈</NavigationLabel>
      </NavigationItem>

      <NavigationItem
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === "settings" }}
        onPress={() => router.push("/Location")}
      >
        <Icon>⚙️</Icon>
        <NavigationLabel $active={activeTab === "settings"}>
          맛집 설정
        </NavigationLabel>
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

const NavigationItem = styled.Pressable`
  min-width: 82px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Text`
  font-size: 21px;
  line-height: 25px;
`;

const NavigationLabel = styled.Text<{ $active: boolean }>`
  margin-top: 2px;
  color: ${({ $active }) =>
    $active ? colors.primary800 : colors.neutral600};
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 800 : 700)};
`;
