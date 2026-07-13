import { colors } from "@/constants/color";
import styled from "styled-components/native";

interface QuestionProps {
  question: string;
  button: string;
  onPress: () => void;
}

export default function Question({ question, button, onPress }: QuestionProps) {
  return (
    <Wrapper>
      <No>{question}</No>
      <Button onPress={onPress} hitSlop={8} accessibilityRole="button">
        <Go>{button}</Go>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

const No = styled.Text`
  color: ${colors.neutral600};
`;

const Button = styled.Pressable`
  padding: 4px 0;
`;

const Go = styled.Text`
  color: ${colors.primary300};
`;
