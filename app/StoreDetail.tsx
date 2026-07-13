import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { StoreBudgetCard } from "@/components/store-detail/store-budget-card";
import { STORE_DETAIL } from "@/components/store-detail/store-detail-data";
import { StoreDetailHeader } from "@/components/store-detail/store-detail-header";
import { StoreDirections } from "@/components/store-detail/store-directions";
import { StoreHighlights } from "@/components/store-detail/store-highlights";
import { StoreMenuSection } from "@/components/store-detail/store-menu-section";
import { StoreProfile } from "@/components/store-detail/store-profile";
import { colors } from "@/constants/color";

export default function StoreDetail() {
  const { budget: budgetParam } = useLocalSearchParams<{ budget?: string }>();
  const parsedBudget = Number(
    Array.isArray(budgetParam) ? budgetParam[0] : budgetParam,
  );
  const budget =
    Number.isFinite(parsedBudget) && parsedBudget > 0 ? parsedBudget : 8000;
  const lowestMenuPrice = STORE_DETAIL.menus.reduce(
    (lowestPrice, menu) => Math.min(lowestPrice, menu.discountedPrice),
    Number.POSITIVE_INFINITY,
  );
  const orderPrice = Number.isFinite(lowestMenuPrice) ? lowestMenuPrice : 0;
  const categoryLabel =
    {
      KOREAN: "한식",
      CHINESE: "중식",
      JAPANESE: "일식",
      WESTERN: "양식",
      SNACK: "분식",
      CAFE: "카페",
    }[STORE_DETAIL.category] ?? STORE_DETAIL.category;

  return (
    <Page>
      <ScreenScroll
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <StoreDetailHeader
            category={categoryLabel}
            name={STORE_DETAIL.name}
            onBackPress={() => router.back()}
          />
          <StoreHighlights
            closeTime={STORE_DETAIL.closeTime}
            distanceMeters={STORE_DETAIL.distanceMeters}
            menus={STORE_DETAIL.menus}
            openTime={STORE_DETAIL.openTime}
            usableCouponCount={STORE_DETAIL.usableCouponCount}
            walkingMinutes={STORE_DETAIL.walkingMinutes}
          />
          <StoreMenuSection menus={STORE_DETAIL.menus} />
          <StoreBudgetCard budget={budget} orderPrice={orderPrice} />
          <StoreProfile
            address={STORE_DETAIL.address}
            avgPrice={STORE_DETAIL.avgPrice}
            closeTime={STORE_DETAIL.closeTime}
            description={STORE_DETAIL.description}
            distanceMeters={STORE_DETAIL.distanceMeters}
            minOrderAmount={STORE_DETAIL.minOrderAmount}
            openTime={STORE_DETAIL.openTime}
            phone={STORE_DETAIL.phone}
            walkingMinutes={STORE_DETAIL.walkingMinutes}
          />
          <StoreDirections
            latitude={STORE_DETAIL.latitude}
            longitude={STORE_DETAIL.longitude}
            name={STORE_DETAIL.name}
          />
          <BottomSpacing />
        </Content>
      </ScreenScroll>

      <AppBottomNavigation activeTab="home" />
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
  background-color: ${colors.primary50};
`;

const ScreenScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: ${colors.primary50};
`;

const Content = styled.View`
  width: 100%;
  max-width: 460px;
  align-self: center;
  background-color: ${colors.primary50};
`;

const BottomSpacing = styled.View`
  height: 28px;
`;
