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
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { colors } from "@/constants/color";

export default function Coupon() {
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isCouponRegistered, setIsCouponRegistered] = useState(false);
  const [isCouponUsed, setIsCouponUsed] = useState(false);

  const handleRecognizeQr = () => {
    setIsScannerVisible(false);
    setIsSuccessVisible(true);
  };

  const handleRegisterCoupon = () => {
    setIsSuccessVisible(false);
    setIsCouponRegistered(true);
    setIsCouponUsed(false);

    if (process.env.EXPO_OS === "ios") {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleUseCoupon = () => {
    if (isCouponUsed) return;

    setIsCouponUsed(true);
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
            <CouponCard isUsed={isCouponUsed} onUsePress={handleUseCoupon} />
          ) : (
            <CouponEmptyState onScanPress={() => setIsScannerVisible(true)} />
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
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
  background-color: ${colors.primary50};
`;

const ContentScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: ${colors.primary50};
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  max-width: 460px;
  align-self: center;
  padding: 14px 18px 28px;
`;
