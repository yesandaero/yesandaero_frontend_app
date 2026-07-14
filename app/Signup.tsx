import AuthPageLayout from "@/components/auth/auth-page-layout";
import { AuthButton, Question } from "@/components/auth/index";
import CodeInput from "@/components/Signup/CodeInput";
import Input from "@/components/Signup/Input";
import { colors } from "@/constants/color";
import { useSignup } from "@/hooks/use-auth";
import { useSignupStore } from "@/stores/SignupStore";
import { isValidEmail } from "@/utils/isValidEmail";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import styled from "styled-components/native";

interface InputWrapperProps {
  isError?: boolean;
}

export default function Signup() {
  const { email, setEmail, id, setId, password, setPassword, reset } =
    useSignupStore();
  const { signup, isLoading, clearError } = useSignup();

  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const [isEmailError, setIsEmailError] = useState(false);

  const [rePassword, setRePassword] = useState("");
  const [isLengthFull, setIsLengthFull] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(false);

  useEffect(() => {
    setIsSubmitActive(!!(email && id && password && rePassword));
  }, [email, id, password, rePassword]);

  const handleIdChange = (text: string) => {
    setId(text.replace(/\s/g, ""));
    clearError();
  };

  const handleEmailChange = (text: string) => {
    setEmail(text.replace(/\s/g, ""));
    setIsEmailError(false);
    clearError();
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text.replace(/\s/g, ""));
    setIsLengthFull(true);
    setIsPasswordError(false);
    clearError();
  };

  const handleRePasswordChange = (text: string) => {
    setRePassword(text.replace(/\s/g, ""));
    setIsLengthFull(true);
    setIsPasswordError(false);
    clearError();
  };

  const handleSubmit = async () => {
    if (!isSubmitActive || isLoading) return;

    if (!isValidEmail(email)) {
      setIsEmailError(true);
      return;
    }
    if (password.length < 8) {
      setIsLengthFull(false);
      return;
    }
    if (password !== rePassword) {
      setIsPasswordError(true);
      return;
    }

    try {
      await signup({
        username: id,
        email,
        password,
        role: "CUSTOMER",
      });
      reset();
      router.replace("/Login");
    } catch {
      // API 오류는 useSignup의 Toast에서 표시한다.
    }
  };

  return (
    <AuthPageLayout
      title={
        <>
          <LineText>
            <Name>예산대로</Name>의
          </LineText>
          <LineText>회원이 되어주세요!</LineText>
        </>
      }
      footer={
        <>
          <AuthButton
            text={isLoading ? "가입 중..." : "가입하기"}
            isActive={isSubmitActive && !isLoading}
            onPress={handleSubmit}
          />
          <Question
            question="계정이 있으신가요?"
            button="로그인"
            onPress={() => router.push("/Login")}
          />
        </>
      }
    >
      <InputListContainer>
        <FormGroup>
          <InputWrapper>
            <Input
              placeholder="아이디를 입력해주세요."
              value={id}
              onChangeText={handleIdChange}
            />
          </InputWrapper>
        </FormGroup>
        <FormGroup>
          <InputWrapper isError={isEmailError}>
            <Input
              placeholder="이메일을 입력해주세요."
              value={email}
              type="email"
              onChangeText={handleEmailChange}
            />
          </InputWrapper>
          {isEmailError && (
            <ErrorText>이메일 형식이 올바르지 않습니다.</ErrorText>
          )}
        </FormGroup>
        <FormGroup>
          <InputWrapper>
            <CodeInput
              placeholder="비밀번호를 입력해주세요."
              type="password"
              onChangeText={handlePasswordChange}
              value={password}
            />
          </InputWrapper>
        </FormGroup>
        <FormGroup>
          <InputWrapper isError={isPasswordError}>
            <CodeInput
              placeholder="비밀번호를 다시 입력해주세요."
              type="password"
              onChangeText={handleRePasswordChange}
              value={rePassword}
            />
          </InputWrapper>
          {!isLengthFull ? (
            <ErrorText>8자 이상 입력해주세요.</ErrorText>
          ) : isPasswordError ? (
            <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
          ) : null}
        </FormGroup>
      </InputListContainer>
    </AuthPageLayout>
  );
}

const LineText = styled.Text`
  color: ${colors.neutral800};
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
`;

const InputListContainer = styled.View`
  width: 100%;
  gap: 12px;
  align-items: center;
`;

const FormGroup = styled.View`
  width: 100%;
  align-items: center;
  gap: 6px;
`;

const InputWrapper = styled.View<InputWrapperProps>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-width: 1px;
  border-color: ${({ isError }) => (isError ? colors.errorRed : "transparent")};
  border-radius: 12px;
`;

const ErrorText = styled.Text`
  color: ${colors.errorRed};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  align-self: flex-start;
`;

const Name = styled.Text`
  color: ${colors.primary600};
  font-size: 28px;
  font-weight: 700;
`;
