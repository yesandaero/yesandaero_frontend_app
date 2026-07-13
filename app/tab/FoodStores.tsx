import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

export default function FoodStores() {
  return (
    <Screen>
      <Title>예산에 맞는 맛집을 찾고 있어요</Title>
    </Screen>
  );
}

const Screen = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: ${colors.primary50};
`;

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 22px;
  font-weight: 800;
  text-align: center;
`;
