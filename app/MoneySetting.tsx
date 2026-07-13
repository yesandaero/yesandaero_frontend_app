import React from "react";
import styled from "styled-components/native";

export default function MoneySetting() {
  return (
    <Screen>
      <Title>예산 설정</Title>
    </Screen>
  );
}

const Screen = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff9ec;
`;

const Title = styled.Text`
  color: #835200;
  font-size: 28px;
  font-weight: 800;
`;
