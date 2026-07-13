import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import styled from "styled-components/native";

import { CouponCard } from "@/components/coupon/coupon-card";
import { CouponEmptyState } from "@/components/coupon/coupon-empty-state";
import { CouponHeader } from "@/components/coupon/coupon-header";
import { CouponScanModal } from "@/components/coupon/coupon-scan-modal";
import { CouponSuccessModal } from "@/components/coupon/coupon-success-modal";
import { CouponUseConfirmModal } from "@/components/coupon/coupon-use-confirm-modal";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { screenLayout } from "@/constants/layout";

export default function Coupon() {
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isCouponRegistered, setIsCouponRegistered] = useState(false);
  const [isUseConfirmVisible, setIsUseConfirmVisible] = useState(false);

  const handleRecognizeQr = () => {
    setIsScannerVisible(false);
    setIsSuccessVisible(true);
  };

  const handleRegisterCoupon = () => {
    setIsSuccessVisible(false);
    setIsCouponRegistered(true);

    if (process.env.EXPO_OS === "ios") {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleUseCoupon = () => {
    setIsUseConfirmVisible(false);
    setIsCouponRegistered(false);
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

          {isCouponRegistered ? (
            <CouponCard onUsePress={() => setIsUseConfirmVisible(true)} />
          ) : (
            <CouponEmptyState />
          )}
        </Content>
      </ContentScroll>

      <AppBottomNavigation activeTab="coupon" />

      <CouponScanModal
        visible={isScannerVisible}
        onCancel={() => setIsScannerVisible(false)}
        onRecognize={handleRecognizeQr}
      />
      <CouponSuccessModal
        visible={isSuccessVisible}
        onConfirm={handleRegisterCoupon}
      />
      <CouponUseConfirmModal
        visible={isUseConfirmVisible}
        onCancel={() => setIsUseConfirmVisible(false)}
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
  background-color: white;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  max-width: ${screenLayout.contentMaxWidth}px;
  align-self: center;
  padding: ${screenLayout.topPadding}px ${screenLayout.horizontalPadding}px
    ${screenLayout.bottomPadding}px;
`;
