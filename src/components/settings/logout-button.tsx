import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type LogoutButtonProps = {
  isLoading: boolean;
  onPress: () => void;
};

export function LogoutButton({ isLoading, onPress }: LogoutButtonProps) {
  return (
    <Button
      accessibilityLabel="로그아웃"
      accessibilityRole="button"
      accessibilityState={{ busy: isLoading, disabled: isLoading }}
      disabled={isLoading}
      onPress={onPress}
      $disabled={isLoading}
    >
      <ButtonText>{isLoading ? "로그아웃 중..." : "로그아웃"}</ButtonText>
    </Button>
  );
}

const Button = styled.Pressable<{ $disabled: boolean }>`
  min-height: 54px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
  border-width: 1px;
  border-color: ${colors.errorRed};
  border-radius: 15px;
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  background-color: ${colors.neutral0};
`;

const Icon = styled.Text`
  color: ${colors.errorRed};
  font-size: 20px;
  font-weight: 800;
`;

const ButtonText = styled.Text`
  color: ${colors.errorRed};
  font-size: 16px;
  font-weight: 800;
`;
