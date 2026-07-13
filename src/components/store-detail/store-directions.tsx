import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

export function StoreDirections() {
  return (
    <Section>
      <SectionTitle>길찾기</SectionTitle>
      <ButtonRow>
        <DirectionButton>
          <DirectionButtonText>네이버 지도</DirectionButtonText>
        </DirectionButton>
        <DirectionButton>
          <DirectionButtonText>카카오맵</DirectionButtonText>
        </DirectionButton>
      </ButtonRow>
    </Section>
  );
}

const Section = styled.View`
  gap: 12px;
  padding: 30px 18px 28px;
`;

const SectionTitle = styled.Text`
  color: ${colors.primary900};
  font-size: 20px;
  font-weight: 900;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const DirectionButton = styled.View`
  min-height: 54px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: ${colors.primary700};
`;

const DirectionButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 16px;
  font-weight: 900;
`;
