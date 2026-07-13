import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

export function LocationHeader() {
  return (
    <Header>
      <Title>지금 어디 계신가요?</Title>
      <Description>현재 위치 기준으로 가까운 가게를 찾아드려요</Description>
    </Header>
  );
}

const Header = styled.View`
  padding: 50px 20px 13px;
  background-color: white;
`;

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 25px;
  font-weight: 800;
  line-height: 32px;
  letter-spacing: -0.7px;
`;

const Description = styled.Text`
  margin-top: 2px;
  color: ${colors.primary800};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.3px;
`;
