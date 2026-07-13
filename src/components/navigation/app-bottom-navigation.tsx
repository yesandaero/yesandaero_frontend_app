import { router } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

export type AppTab = "home" | "coupon" | "settings";

type AppBottomNavigationProps = {
  activeTab?: AppTab;
};

const TAB_ITEMS: {
  key: AppTab;
  icon: string;
  label: string;
  route: "/tab/FoodStores" | "/tab/Coupon" | "/tab/Setting";
}[] = [
  { key: "home", icon: "🏠", label: "홈", route: "/tab/FoodStores" },
  { key: "coupon", icon: "🎟️", label: "쿠폰함", route: "/tab/Coupon" },
  { key: "settings", icon: "⚙️", label: "설정", route: "/tab/Setting" },
];

export function AppBottomNavigation({ activeTab }: AppBottomNavigationProps) {
  const insets = useSafeAreaInsets();

  return (
    <Navigation accessibilityRole="tablist" $bottomInset={insets.bottom}>
      {TAB_ITEMS.map((item) => {
        const isActive = activeTab === item.key;

        return (
          <NavigationItem
            key={item.key}
            accessibilityLabel={item.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => {
              if (!isActive) router.replace(item.route);
            }}
          >
            <Icon>{item.icon}</Icon>
            <Label $active={isActive}>{item.label}</Label>
          </NavigationItem>
        );
      })}
    </Navigation>
  );
}

const Navigation = styled.View<{ $bottomInset: number }>`
  min-height: ${({ $bottomInset }) => 60 + $bottomInset}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 6px 20px ${({ $bottomInset }) => Math.max($bottomInset, 6)}px;
  border-top-width: 1px;
  border-top-color: ${colors.primary200};
  background-color: ${colors.neutral0};
`;

const NavigationItem = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Text`
  font-size: 20px;
  line-height: 24px;
`;

const Label = styled.Text<{ $active: boolean }>`
  margin-top: 2px;
  color: ${({ $active }) => ($active ? colors.primary800 : colors.neutral600)};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 900 : 700)};
`;
