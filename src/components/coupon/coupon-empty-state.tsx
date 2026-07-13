import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type CouponEmptyStateProps = {
  onScanPress: () => void;
};

export function CouponEmptyState({ onScanPress }: CouponEmptyStateProps) {
  return (
    <EmptyState>
      <EmptyIcon>🎟️</EmptyIcon>
      <EmptyTitle>아직 쿠폰이 없어요</EmptyTitle>
      <EmptyDescription>
        가게 사장님 화면의 QR을 스캔하면 다른 식당에서도 쓸 수 있는 쿠폰이 생겨요.
      </EmptyDescription>
      <EmptyAction accessibilityRole="button" onPress={onScanPress}>
        <EmptyActionText>QR 스캔 시작하기</EmptyActionText>
      </EmptyAction>
    </EmptyState>
  );
}

const EmptyState = styled.View`
  flex: 1;
  min-height: 360px;
  align-items: center;
  justify-content: center;
  padding: 36px 22px;
`;

const EmptyIcon = styled.Text`
  font-size: 50px;
`;

const EmptyTitle = styled.Text`
  margin-top: 16px;
  color: ${colors.neutral900};
  font-size: 20px;
  font-weight: 900;
`;

const EmptyDescription = styled.Text`
  margin-top: 8px;
  color: ${colors.neutral600};
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  text-align: center;
`;

const EmptyAction = styled.Pressable`
  min-height: 44px;
  margin-top: 22px;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 14px;
  background-color: ${colors.neutral0};
`;

const EmptyActionText = styled.Text`
  color: ${colors.primary800};
  font-size: 14px;
  font-weight: 800;
`;
