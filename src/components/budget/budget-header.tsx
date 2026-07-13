import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type BudgetHeaderProps = {
  onBackPress: () => void;
};

export function BudgetHeader({ onBackPress }: BudgetHeaderProps) {
  return (
    <Header>
      <BackButton
        accessibilityLabel="이전 화면으로 돌아가기"
        accessibilityRole="button"
        hitSlop={8}
        onPress={onBackPress}
      >
        <BackIcon>←</BackIcon>
      </BackButton>

      <HeadingGroup>
        <Title>얼마로 드실 건가요?</Title>
        <Description>보유 금액에 맞는 곳만 골라드려요</Description>
      </HeadingGroup>
    </Header>
  );
}

const Header = styled.View`
  align-items: left;
  gap: 12px;
  padding-bottom: 18px;
  background-color: white;
`;

const BackButton = styled.Pressable`
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.primary200};
  border-radius: 12px;
  background-color: white;
`;

const BackIcon = styled.Text`
  color: ${colors.neutral900};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

const HeadingGroup = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 25px;
  font-weight: 800;
  line-height: 32px;
  letter-spacing: -0.7px;
`;

const Description = styled.Text`
  color: ${colors.primary700};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
