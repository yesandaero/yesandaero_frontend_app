import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type StoreBudgetCardProps = {
  budget: number;
};

export function StoreBudgetCard({ budget }: StoreBudgetCardProps) {
  return (
    <Section>
      <SectionTitle>예산 대비</SectionTitle>
      <BudgetCard>
        <BudgetDescription>설정한 예산</BudgetDescription>
        <BudgetAmount selectable>{budget.toLocaleString()}원 이하</BudgetAmount>
      </BudgetCard>
    </Section>
  );
}

const Section = styled.View`
  gap: 12px;
  padding: 30px 18px 0;
`;

const SectionTitle = styled.Text`
  color: ${colors.primary900};
  font-size: 20px;
  font-weight: 900;
`;

const BudgetCard = styled.View`
  min-height: 68px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${colors.primary100};
`;

const BudgetDescription = styled.Text`
  flex: 1;
  color: ${colors.neutral900};
  font-size: 14px;
  font-weight: 600;
`;

const BudgetAmount = styled.Text`
  color: ${colors.primary900};
  font-size: 16px;
  font-weight: 900;
`;
