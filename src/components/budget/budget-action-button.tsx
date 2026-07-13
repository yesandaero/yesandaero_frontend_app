import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type BudgetActionButtonProps = {
  disabled?: boolean;
  onPress: () => void;
};

export function BudgetActionButton({
  disabled = false,
  onPress,
}: BudgetActionButtonProps) {
  return (
    <Container>
      <Button
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        $disabled={disabled}
      >
        <ButtonText>이 설정으로 맛집 찾기</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  max-width: 400px;
  align-self: center;
  padding: 8px 20px 10px;
  background-color: ${colors.primary50};
`;

const Button = styled.Pressable<{ $disabled: boolean }>`
  min-height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  background-color: ${colors.primary700};
`;

const ButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 15px;
  font-weight: 800;
  line-height: 23px;
`;
