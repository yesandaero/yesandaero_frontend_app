import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

export function SettingsHeader() {
  return (
    <Header>
      <Title>설정</Title>
      <Description>
        현재 위치와 한 끼 예산을 언제든 다시 설정할 수 있어요.
      </Description>
    </Header>
  );
}

const Header = styled.View`
  gap: 6px;
  padding: 12px 2px 18px;
  background-color: white;
`;

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 26px;
  font-weight: 900;
`;

const Description = styled.Text`
  color: ${colors.neutral600};
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
`;
