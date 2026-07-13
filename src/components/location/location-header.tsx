import React from "react";
import styled from "styled-components/native";

import { locationColors } from "./location-theme";

export function LocationHeader() {
  return (
    <Header>
      <Title>지금 어디 계신가요?</Title>
      <Description>현재 위치 기준으로 가까운 가게를 찾아드려요</Description>
    </Header>
  );
}

const Header = styled.View`
  padding: 16px 20px 13px;
  background-color: ${locationColors.background};
`;

const Title = styled.Text`
  color: ${locationColors.goldDark};
  font-size: 25px;
  font-weight: 800;
  line-height: 32px;
  letter-spacing: -0.7px;
`;

const Description = styled.Text`
  margin-top: 2px;
  color: ${locationColors.muted};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.3px;
`;
