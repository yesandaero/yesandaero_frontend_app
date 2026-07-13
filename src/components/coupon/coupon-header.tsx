import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type CouponHeaderProps = {
  onScanPress: () => void;
};

export function CouponHeader({ onScanPress }: CouponHeaderProps) {
  return (
    <Header>
      <TitleGroup>
        <Eyebrow>MY COUPON</Eyebrow>
        <Title>쿠폰함</Title>
        <Description>
          사장님 화면의 QR을 스캔하면 쿠폰을 받을 수 있어요.
        </Description>
      </TitleGroup>

      <ScanButton accessibilityRole="button" onPress={onScanPress}>
        <ScanButtonText>▣ 쿠폰 받기 (QR 스캔)</ScanButtonText>
      </ScanButton>
    </Header>
  );
}

const Header = styled.View`
  gap: 18px;
`;

const TitleGroup = styled.View`
  gap: 4px;
`;

const Eyebrow = styled.Text`
  color: ${colors.primary600};
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.4px;
`;

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 28px;
  font-weight: 900;
`;

const Description = styled.Text`
  color: ${colors.neutral700};
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
`;

const ScanButton = styled.Pressable`
  min-height: 52px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${colors.primary700};
`;

const ScanButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 16px;
  font-weight: 900;
`;
