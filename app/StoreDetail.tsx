import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import styled from "styled-components/native";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { StoreBudgetCard } from "@/components/store-detail/store-budget-card";
import { StoreDetailHeader } from "@/components/store-detail/store-detail-header";
import { StoreDirections } from "@/components/store-detail/store-directions";
import { StoreHighlights } from "@/components/store-detail/store-highlights";
import { StoreMenuSection } from "@/components/store-detail/store-menu-section";
import { StoreProfile } from "@/components/store-detail/store-profile";
import { colors } from "@/constants/color";
import { useStoreDetail } from "@/hooks/use-stores";
import { useSettingsStore } from "@/stores/settings-store";

export default function StoreDetail() {
  const { budget: budgetParam, storeId: storeIdParam } = useLocalSearchParams<{
    budget?: string;
    storeId?: string;
  }>();
  const savedBudget = useSettingsStore((state) => state.budget);
  const savedLocation = useSettingsStore((state) => state.location);
  const parsedBudget = Number(
    Array.isArray(budgetParam) ? budgetParam[0] : budgetParam,
  );
  const budget =
    Number.isFinite(parsedBudget) && parsedBudget > 0
      ? parsedBudget
      : savedBudget;
  const parsedStoreId = Number(
    Array.isArray(storeIdParam) ? storeIdParam[0] : storeIdParam,
  );
  const storeId =
    Number.isInteger(parsedStoreId) && parsedStoreId > 0 ? parsedStoreId : null;
  const detailLocation = useMemo(
    () =>
      savedLocation
        ? { lat: savedLocation.latitude, lng: savedLocation.longitude }
        : undefined,
    [savedLocation],
  );
  const { store, isLoading, isError, isRefetching, refetch } = useStoreDetail(
    storeId,
    detailLocation,
  );
  const lowestMenuPrice = store?.menus.reduce(
    (lowestPrice, menu) => Math.min(lowestPrice, menu.discountedPrice),
    Number.POSITIVE_INFINITY,
  );
  const orderPrice =
    typeof lowestMenuPrice === "number" && Number.isFinite(lowestMenuPrice)
      ? lowestMenuPrice
      : 0;
  const categoryLabel = store
    ? ({
        KOREAN: "한식",
        CHINESE: "중식",
        JAPANESE: "일식",
        WESTERN: "양식",
        SNACK: "분식",
        CAFE: "카페",
      }[store.category] ?? store.category)
    : "";

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace({
      pathname: "/tab/FoodStores",
      params: { budget: String(budget) },
    });
  };

  return (
    <Page>
      <ScreenScroll
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <StoreDetailHeader
            category={categoryLabel}
            name={store?.name ?? "가게 상세"}
            onBackPress={handleBackPress}
          />
          {store ? (
            <>
              <StoreHighlights
                closeTime={store.closeTime}
                distanceMeters={store.distanceMeters}
                menus={store.menus}
                openTime={store.openTime}
                usableCouponCount={store.usableCouponCount}
                walkingMinutes={store.walkingMinutes}
              />
              <StoreMenuSection menus={store.menus} />
              <StoreBudgetCard budget={budget} orderPrice={orderPrice} />
              <StoreProfile
                address={store.address}
                avgPrice={store.avgPrice}
                closeTime={store.closeTime}
                description={store.description}
                distanceMeters={store.distanceMeters}
                minOrderAmount={store.minOrderAmount}
                openTime={store.openTime}
                phone={store.phone}
                walkingMinutes={store.walkingMinutes}
              />
              <StoreDirections
                latitude={store.latitude}
                longitude={store.longitude}
                name={store.name}
              />
            </>
          ) : (
            <StatusState accessibilityLiveRegion="polite">
              {isLoading ? (
                <>
                  <ActivityIndicator color={colors.primary700} size="large" />
                  <StatusText>가게 정보를 불러오고 있어요.</StatusText>
                </>
              ) : (
                <>
                  <StatusText>
                    {storeId === null
                      ? "가게 정보가 올바르지 않습니다."
                      : "가게 정보를 불러오지 못했습니다."}
                  </StatusText>
                  {isError && (
                    <RetryButton
                      accessibilityRole="button"
                      disabled={isRefetching}
                      onPress={() => void refetch()}
                    >
                      <RetryButtonText>
                        {isRefetching ? "다시 불러오는 중..." : "다시 시도"}
                      </RetryButtonText>
                    </RetryButton>
                  )}
                </>
              )}
            </StatusState>
          )}
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

const StatusState = styled.View`
  min-height: 360px;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 36px 22px;
`;

const StatusText = styled.Text`
  color: ${colors.neutral700};
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

const RetryButton = styled.Pressable`
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 12px;
  background-color: ${colors.primary700};
`;

const RetryButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 14px;
  font-weight: 800;
`;
