import styled from "styled-components/native";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <Wrapper>
      <Content>{text}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  display: flex;
  height: 48px;
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100px;
`;

const Content = styled.Text`
  color: var(--neutral-0, #fff);
`;
