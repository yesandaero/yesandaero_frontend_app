import { colors } from "@/constants/color";
import styled from "styled-components/native";

interface SignupInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  type?: "text" | "password" | "email" | "number";
}

export default function Input({
  placeholder,
  onChangeText,
  value,
  type = "text",
}: SignupInputProps) {
  const isPassword = type === "password";

  const getKeyboardType = () => {
    if (type === "email") return "email-address";
    if (type === "number") return "numeric";
    return "default";
  };

  return (
    <Container>
      <Wrapper
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isPassword}
        keyboardType={getKeyboardType()}
        placeholderTextColor={colors.neutral400}
      />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 48px;
  background-color: ${colors.neutral100};
  border-radius: 12px;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.TextInput`
  flex: 1;
  color: ${colors.neutral900};
  font-size: 16px;
`;
