import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type CouponCardProps = {
  isUsed: boolean;
  onUsePress: () => void;
};

export function CouponCard({ isUsed, onUsePress }: CouponCardProps) {
  return (
    <Card accessibilityLabel="아메리카노 무료 쿠폰">
      <CardTopRow>
        <StatusBadge $used={isUsed}>
          <StatusText $used={isUsed}>
            {isUsed ? "사용완료" : "사용가능"}
          </StatusText>
        </StatusBadge>
      </CardTopRow>

      <Source selectable>이모네 국밥 QR 스캔 적립</Source>
      <CouponTitle selectable>아메리카노 무료 쿠폰</CouponTitle>
      <Store selectable>사용처 · 스덕컴 카페</Store>

      <Divider />

      <UseButton
        accessibilityRole="button"
        accessibilityState={{ disabled: isUsed }}
        disabled={isUsed}
        $used={isUsed}
        onPress={onUsePress}
      >
        <UseButtonText $used={isUsed}>
          {isUsed ? "사용 완료" : "쿠폰 사용하기"}
        </UseButtonText>
      </UseButton>
    </Card>
  );
}

const Card = styled.View`
  margin-top: 22px;
  padding: 20px;
  border-width: 1px;
  border-color: ${colors.primary200};
  border-radius: 20px;
  background-color: ${colors.neutral0};
  box-shadow: 0 8px 20px ${colors.primary200};
`;

const CardTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StatusBadge = styled.View<{ $used: boolean }>`
  padding: 6px 10px;
  border-radius: 12px;
  background-color: ${({ $used }) =>
    $used ? colors.neutral200 : colors.primary100};
`;

const StatusText = styled.Text<{ $used: boolean }>`
  color: ${({ $used }) => ($used ? colors.neutral600 : colors.primary800)};
  font-size: 12px;
  font-weight: 800;
`;

const Source = styled.Text`
  margin-top: 18px;
  color: ${colors.neutral600};
  font-size: 12px;
  font-weight: 700;
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

const Divider = styled.View`
  height: 1px;
  margin: 20px 0 16px;
  background-color: ${colors.primary100};
`;

const UseButton = styled.Pressable<{ $used: boolean }>`
  min-height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${({ $used }) =>
    $used ? colors.neutral300 : colors.primary700};
`;

const UseButtonText = styled.Text<{ $used: boolean }>`
  color: ${({ $used }) => ($used ? colors.neutral600 : colors.neutral0)};
  font-size: 15px;
  font-weight: 900;
`;
