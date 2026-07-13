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
        <Title>쿠폰함</Title>
        <Description>사장님 화면의 QR을 스캔하세요!</Description>
      </TitleGroup>

      <ScanButton accessibilityRole="button" onPress={onScanPress}>
        <ScanButtonText>QR 스캔하기</ScanButtonText>
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

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 25px;
  font-weight: 800;
  line-height: 32px;
  letter-spacing: -0.7px;
`;

const Description = styled.Text`
  color: ${colors.neutral700};
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
`;

const ScanButton = styled.Pressable`
  min-height: 50px;
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
