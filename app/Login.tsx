import AuthPageLayout from "@/components/auth/auth-page-layout";
import AuthButton from "@/components/auth/AuthButton";
import Input from "@/components/auth/LoginInput";
import Question from "@/components/auth/Question";
import { colors } from "@/constants/color";
import { useLogin } from "@/hooks/use-auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import styled from "styled-components/native";

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, clearError } = useLogin();

  const inputEmail = (text: string) => {
    setEmail(text.replace(/\s/g, ""));
    clearError();
  };

  const inputPassword = (text: string) => {
    setPassword(text.replace(/\s/g, ""));
    clearError();
  };

  useEffect(() => {
    if (email && password) {
      setIsActive(true);
      return;
    }
    setIsActive(false);
  }, [email, password]);

  const handleLogin = async () => {
    if (!isActive || isLoading) return;

    try {
      await login({ email, password });
      Toast.show({
        type: "success",
        text1: "로그인 완료",
        text2: "정상적으로 로그인되었습니다.",
      });
      router.replace("/Location");
    } catch {
      // API 오류는 useLogin의 Toast에서 표시한다.
    }
  };

  const handleSignupPress = () => {
    router.push("/Signup");
  };

  return (
    <AuthPageLayout
      title={
        <>
          <LineText>
            <Name>예산대로</Name>에 다시
          </LineText>
          <LineText>오신 것을 환영해요!</LineText>
        </>
      }
      footer={
        <>
          <AuthButton
            text={isLoading ? "로그인 중..." : "로그인"}
            isActive={isActive && !isLoading}
            onPress={handleLogin}
          />
          <Question
            question="계정이 없으신가요?"
            button="회원가입"
            onPress={handleSignupPress}
          />
        </>
      }
    >
      <InputWrapper>
        <Input
          placeholder="이메일을 입력해주세요."
          type="email"
          onChangeText={inputEmail}
          value={email}
        />
        <Input
          placeholder="비밀번호를 입력해주세요."
          type="password"
          onChangeText={inputPassword}
          value={password}
        />
      </InputWrapper>
    </AuthPageLayout>
  );
}

const InputWrapper = styled.View`
  width: 100%;
  gap: 16px;
`;

const Name = styled.Text`
  color: ${colors.primary600};
  font-size: 28px;
  font-weight: 700;
`;

const LineText = styled.Text`
  color: ${colors.neutral800};
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
`;
