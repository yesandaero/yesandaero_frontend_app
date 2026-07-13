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
        autoCapitalize={type === "email" ? "none" : "sentences"}
        autoComplete={type === "email" ? "email" : "off"}
        placeholderTextColor={colors.neutral400}
      />
    </Container>
  );
}

const Container = styled.View`
  background-color: ${colors.neutral100};
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid ${colors.neutral100};
  padding: 0px 20px;
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.TextInput`
  flex: 1;
`;
