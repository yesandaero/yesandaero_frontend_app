import React from "react";
import styled from "styled-components/native";

import { locationColors } from "./location-theme";

type LocationNextButtonProps = {
  disabled?: boolean;
  onPress: () => void;
};

export function LocationNextButton({ disabled = false, onPress }: LocationNextButtonProps) {
  return (
    <Container>
      <Button
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        $disabled={disabled}
      >
        <ButtonText>다음: 예산 설정</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  padding: 0 20px 12px;
`;

const Button = styled.Pressable<{ $disabled: boolean }>`
  min-height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  background-color: ${locationColors.gold};
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: 800;
  line-height: 23px;
`;
