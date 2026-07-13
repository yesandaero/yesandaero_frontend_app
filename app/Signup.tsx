import Button from "@/components/Signup/Button";
import { Text } from "@react-navigation/elements";
import React from "react";
import styled from "styled-components/native";

export default function Signup() {
  return (
    <Wrapper>
      <Text>예산대로</Text>
      <Buttons>
        <Button text="로그인" />
        <Button text="회원가입" />
      </Buttons>
    </Wrapper>
  );
}

const Wrapper = styled.View``;

const Buttons = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
`;
