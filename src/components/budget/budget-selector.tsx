import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

const BUDGET_PRESETS = [5000, 10000, 15000, 20000, 25000];

type BudgetSelectorProps = {
  budget: string;
  onBudgetChange: (budget: string) => void;
};

function formatWon(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export function BudgetSelector({
  budget,
  onBudgetChange,
}: BudgetSelectorProps) {
  return (
    <Section>
      <InputContainer>
        <AmountInput
          accessibilityLabel="식사 예산"
          keyboardType="number-pad"
          maxLength={8}
          onChangeText={onBudgetChange}
          placeholder="0"
          placeholderTextColor={colors.neutral500}
          returnKeyType="done"
          selectionColor={colors.primary700}
          style={{ fontVariant: ["tabular-nums"] }}
          value={budget}
        />
        <Won>원 이하</Won>
      </InputContainer>

      <PresetList>
        {BUDGET_PRESETS.map((preset) => {
          const isSelected = budget === String(preset);

          return (
            <PresetButton
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={preset}
              onPress={() => onBudgetChange(String(preset))}
              $selected={isSelected}
            >
              <PresetText $selected={isSelected}>
                {formatWon(preset)}
              </PresetText>
            </PresetButton>
          );
        })}
      </PresetList>
    </Section>
  );
}

const Section = styled.View``;

const InputContainer = styled.View`
  min-height: 74px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 0 18px;
  border: 2px solid ${colors.primary200};
  border-radius: 18px;
  background-color: ${colors.neutral0};
`;

const AmountInput = styled.TextInput`
  flex: 1;
  padding: 0;
  color: ${colors.primary700};
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  text-align: right;
`;

const Won = styled.Text`
  color: ${colors.primary700};
  font-size: 18px;
  font-weight: 800;
`;

const PresetList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 12px;
`;

const PresetButton = styled.Pressable<{ $selected: boolean }>`
  min-width: 88px;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  border: 2px solid ${colors.primary200};
  border-radius: 20px;
  background-color: ${({ $selected }) =>
    $selected ? colors.primary100 : colors.neutral0};
`;

const PresetText = styled.Text<{ $selected: boolean }>`
  color: ${({ $selected }) =>
    $selected ? colors.primary900 : colors.primary700};
  font-size: 14px;
  font-weight: 800;
  line-height: 19px;
`;
