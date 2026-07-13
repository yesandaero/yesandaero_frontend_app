import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

export function CouponEmptyState() {
  return (
    <EmptyState>
      <EmptyIcon>🎟️</EmptyIcon>
      <EmptyTitle>아직 쿠폰이 없어요</EmptyTitle>
      <EmptyDescription>
        가게 사장님 화면의 QR을 스캔하면 다른 식당에서도 쓸 수 있는 쿠폰이
        생겨요!
      </EmptyDescription>
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
