import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type FoodStoresHeaderProps = {
  budget: number;
};

export function FoodStoresHeader({ budget }: FoodStoresHeaderProps) {
  return (
    <Header>
      <TitleGroup>
        <Title>근처 맛집</Title>
      </TitleGroup>

      <BudgetBadge accessibilityLabel={`예산 ${budget.toLocaleString()}원`}>
        <BudgetText> {budget.toLocaleString()}원 이하</BudgetText>
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

const TitleGroup = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 25px;
  font-weight: 800;
  line-height: 32px;
  letter-spacing: -0.7px;
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
