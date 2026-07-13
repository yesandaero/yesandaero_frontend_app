import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type CouponCardProps = {
  onUsePress: () => void;
};

export function CouponCard({ onUsePress }: CouponCardProps) {
  return (
    <Card accessibilityLabel="아메리카노 무료 쿠폰">
      <CardTopRow>
        <StatusBadge>
          <StatusText>사용가능</StatusText>
        </StatusBadge>
      </CardTopRow>

      <CouponTitle selectable>아메리카노 무료 쿠폰</CouponTitle>
      <Store selectable>사용처: 스덕컴 카페</Store>
      <Expired selectable>발급일: 2026-7-13</Expired>

      <Divider />

      <UseButton
        accessibilityRole="button"
        onPress={onUsePress}
      >
        <UseButtonText>쿠폰 사용하기</UseButtonText>
      </UseButton>
    </Card>
  );
}

const Card = styled.View`
  margin-top: 22px;
  padding: 20px;
  border-width: 1px;
  border-color: ${colors.neutral200};
  border-radius: 20px;
  background-color: ${colors.neutral0};
`;

const CardTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const StatusBadge = styled.View`
  padding: 6px 10px;
  border-radius: 12px;
  background-color: ${colors.primary100};
`;

const StatusText = styled.Text`
  color: ${colors.primary800};
  font-size: 12px;
  font-weight: 800;
`;

const CouponTitle = styled.Text`
  margin-top: 5px;
  color: ${colors.primary900};
  font-size: 20px;
  font-weight: 900;
`;

const Store = styled.Text`
  margin-top: 7px;
  color: ${colors.neutral700};
  font-size: 14px;
  font-weight: 600;
`;

const Expired = styled.Text`
  margin-top: 7px;
  color: ${colors.neutral600};
  font-size: 14px;
  font-weight: 600;
`;

const Divider = styled.View`
  height: 1px;
  margin: 20px 0 16px;
  background-color: ${colors.primary100};
`;

const UseButton = styled.Pressable`
  min-height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${colors.primary700};
`;

const UseButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 15px;
  font-weight: 900;
`;
