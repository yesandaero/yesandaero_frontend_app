import { router } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

export function CouponBottomNavigation() {
  const insets = useSafeAreaInsets();

  return (
    <Navigation accessibilityRole="tablist" $bottomInset={insets.bottom}>
      <NavigationItem
        accessibilityRole="tab"
        accessibilityState={{ selected: false }}
        onPress={() => router.push("/tab/FoodStores")}
      >
        <Icon>🏠</Icon>
        <Label $active={false}>홈</Label>
      </NavigationItem>

      <NavigationItem
        accessibilityRole="tab"
        accessibilityState={{ selected: true }}
        onPress={() => router.push("/tab/Coupon")}
      >
        <Icon>🎟️</Icon>
        <Label $active>쿠폰함</Label>
      </NavigationItem>

      <NavigationItem
        accessibilityRole="tab"
        accessibilityState={{ selected: false }}
        onPress={() => router.push("/tab/Like")}
      >
        <Icon>❤️</Icon>
        <Label $active={false}>좋아요</Label>
      </NavigationItem>
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
  min-width: 76px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Text`
  font-size: 20px;
  line-height: 24px;
`;

const Label = styled.Text<{ $active: boolean }>`
  margin-top: 2px;
  color: ${({ $active }) =>
    $active ? colors.primary800 : colors.neutral600};
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 900 : 700)};
`;
