import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import styled from "styled-components/native";

import type { Coupon as CouponData } from "@/apis/Coupon/type";
import { CouponCard } from "@/components/coupon/coupon-card";
import { CouponEmptyState } from "@/components/coupon/coupon-empty-state";
import { CouponHeader } from "@/components/coupon/coupon-header";
import { CouponScanModal } from "@/components/coupon/coupon-scan-modal";
import { CouponSuccessModal } from "@/components/coupon/coupon-success-modal";
import { CouponUseConfirmModal } from "@/components/coupon/coupon-use-confirm-modal";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { colors } from "@/constants/color";
import { screenLayout } from "@/constants/layout";
import { useMyCoupons, useRegisterCoupon } from "@/hooks/use-coupons";

export default function Coupon() {
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [registeredCoupon, setRegisteredCoupon] = useState<CouponData | null>(
    null,
  );
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [usedCouponIds, setUsedCouponIds] = useState<number[]>([]);
  const { coupons, isError, isLoading, isRefetching, refetch } =
    useMyCoupons("REGISTERED");
  const { registerCoupon, isRegistering } = useRegisterCoupon();

  const visibleCoupons = useMemo(
    () => coupons.filter((coupon) => !usedCouponIds.includes(coupon.couponId)),
    [coupons, usedCouponIds],
  );

  const handleRecognizeQr = async (token: string) => {
    try {
      const coupon = await registerCoupon({ token });
      setRegisteredCoupon(coupon);

      if (process.env.EXPO_OS === "ios") {
        void Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
      }
    } catch {
      // API 오류는 useRegisterCoupon의 Toast에서 표시한다.
    } finally {
      setIsScannerVisible(false);
    }
  };

  const handleUseCoupon = () => {
    if (selectedCouponId === null) return;

    setUsedCouponIds((couponIds) => [...couponIds, selectedCouponId]);
    setSelectedCouponId(null);
    Toast.show({ type: "success", text1: "사용됐습니다!" });

    if (process.env.EXPO_OS === "ios") {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <Page>
      <ContentScroll
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <CouponHeader onScanPress={() => setIsScannerVisible(true)} />

          {isLoading ? (
            <StatusState accessibilityLabel="쿠폰을 불러오는 중">
              <ActivityIndicator color={colors.primary700} size="large" />
              <StatusText selectable>쿠폰을 불러오고 있어요.</StatusText>
            </StatusState>
          ) : isError ? (
            <StatusState>
              <StatusText selectable>쿠폰을 불러오지 못했습니다.</StatusText>
              <RetryButton
                accessibilityRole="button"
                disabled={isRefetching}
                onPress={() => void refetch()}
              >
                <RetryButtonText>
                  {isRefetching ? "다시 불러오는 중..." : "다시 시도"}
                </RetryButtonText>
              </RetryButton>
            </StatusState>
          ) : visibleCoupons.length > 0 ? (
            <CouponList>
              {visibleCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.couponId}
                  coupon={coupon}
                  onUsePress={setSelectedCouponId}
                />
              ))}
            </CouponList>
          ) : (
            <CouponEmptyState />
          )}
        </Content>
      </ContentScroll>

      <AppBottomNavigation activeTab="coupon" />

      <CouponScanModal
        visible={isScannerVisible}
        isRegistering={isRegistering}
        onCancel={() => setIsScannerVisible(false)}
        onRecognize={handleRecognizeQr}
      />
      <CouponSuccessModal
        couponName={registeredCoupon?.name ?? ""}
        storeName={registeredCoupon?.store.name ?? ""}
        visible={registeredCoupon !== null}
        onConfirm={() => setRegisteredCoupon(null)}
      />
      <CouponUseConfirmModal
        visible={selectedCouponId !== null}
        onCancel={() => setSelectedCouponId(null)}
        onConfirm={handleUseCoupon}
      />
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
`;

const ContentScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: ${colors.neutral0};
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  max-width: ${screenLayout.contentMaxWidth}px;
  align-self: center;
  padding: ${screenLayout.topPadding}px ${screenLayout.horizontalPadding}px
    ${screenLayout.bottomPadding}px;
`;

const CouponList = styled.View`
  gap: 12px;
  margin-top: 22px;
`;

const StatusState = styled.View`
  flex: 1;
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
