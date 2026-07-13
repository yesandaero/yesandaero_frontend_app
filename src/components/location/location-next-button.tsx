import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type LocationNextButtonProps = {
  disabled?: boolean;
  label?: string;
  onPress: () => void;
};

export function LocationNextButton({
  disabled = false,
  label = "다음 단계",
  onPress,
}: LocationNextButtonProps) {
  return (
    <Container>
      <Button
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        $disabled={disabled}
      >
        <ButtonText>{label}</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  max-width: 460px;
  align-self: center;
  padding: 10px 20px 12px;
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
  font-size: 17px;
  font-weight: 800;
  line-height: 23px;
`;
