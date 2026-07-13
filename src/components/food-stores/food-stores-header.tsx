import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type FoodStoresHeaderProps = {
  budget: number;
  onBackPress: () => void;
};

export function FoodStoresHeader({
  budget,
  onBackPress,
}: FoodStoresHeaderProps) {
  return (
    <Header>
      <TitleGroup>
        <Title>근처 맛집</Title>
        <Subtitle>{budget.toLocaleString()}원 이하 · 거리순 정렬</Subtitle>
      </TitleGroup>

      <BudgetBadge accessibilityLabel={`예산 ${budget.toLocaleString()}원`}>
        <BudgetText> {budget.toLocaleString()}원</BudgetText>
      </BudgetBadge>
    </Header>
  );
}

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

const BackButton = styled.Pressable`
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 13px;
  background-color: ${colors.neutral0};
`;

const BackIcon = styled.Text`
  margin-top: -3px;
  color: ${colors.neutral900};
  font-size: 29px;
  line-height: 31px;
`;

const TitleGroup = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 24px;
  font-weight: 900;
`;

const Subtitle = styled.Text`
  margin-top: 2px;
  color: ${colors.neutral700};
  font-size: 12px;
  font-weight: 600;
`;

const BudgetBadge = styled.View`
  min-width: 94px;
  padding: 11px 12px;
  align-items: center;
  border-radius: 22px;
  background-color: ${colors.primary700};
`;

const BudgetText = styled.Text`
  color: ${colors.neutral0};
  font-size: 14px;
  font-weight: 800;
`;
