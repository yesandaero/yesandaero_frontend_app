import { AuthButton, Question } from "@/components/auth/index";
import CodeInput from "@/components/Signup/CodeInput";
import Input from "@/components/Signup/Input";
import { colors } from "@/constants/color";
import { useSignupStore } from "@/stores/SignupStore";
import { isValidEmail } from "@/utils/isValidEmail";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import styled from "styled-components/native";

interface InputWrapperProps {
  isError?: boolean;
}

export default function Signup() {
  const { email, setEmail, id, setId, password, setPassword } =
    useSignupStore();

  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const [isEmailError, setIsEmailError] = useState(false);

  const [isIdDuplication, setIsIdDuplication] = useState(false);

  const [rePassword, setRePassword] = useState("");
  const [isLengthFull, setIsLengthFull] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(false);

  useEffect(() => {
    setIsSubmitActive(!!(email && id && password && rePassword));
  }, [email, id, password, rePassword]);

  const handleIdChange = (text: string) => {
    setId(text.replace(/\s/g, ""));
    setIsIdDuplication(false);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text.replace(/\s/g, ""));
    setIsEmailError(false);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text.replace(/\s/g, ""));
    setIsLengthFull(true);
    setIsPasswordError(false);
  };

  const handleRePasswordChange = (text: string) => {
    setRePassword(text.replace(/\s/g, ""));
    setIsLengthFull(true);
    setIsPasswordError(false);
  };

  const handleSubmit = () => {
    if (id === "에러아이디") {
      setIsIdDuplication(true);
      return;
    }
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

    router.push("/Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <Container>
          <TitleWrapper>
            <LineText>
              <Name>예산대로</Name>의
            </LineText>
            <LineText>회원이 되어주세요!</LineText>
          </TitleWrapper>

          <Wrapper>
            <InputListContainer>
              <FormGroup>
                <InputWrapper isError={isIdDuplication}>
                  <Input
                    placeholder="아이디를 입력해주세요."
                    value={id}
                    onChangeText={handleIdChange}
                  />
                </InputWrapper>
                {isIdDuplication && (
                  <ErrorText>이미 사용중인 아이디입니다.</ErrorText>
                )}
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

            <Footer>
              <AuthButton
                text="가입하기"
                isActive={isSubmitActive}
                onPress={handleSubmit}
              />
              <Question
                question="계정이 있으신가요?"
                button="로그인"
                onPress={() => router.push("/Login")}
              />
            </Footer>
          </Wrapper>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: white;
`;

const TitleWrapper = styled.View`
  margin: 24px 0 16px 15px;
`;

const LineText = styled.Text`
  color: ${colors.neutral800};
  font-size: 28px;
  font-weight: 700;
`;

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
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
  width: 93%;
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
  margin-left: 4%;
`;

const Footer = styled.View`
  margin-top: 24px;
  width: 100%;
  align-items: center;
`;

const Name = styled.Text`
  color: ${colors.primary600};
  font-size: 28px;
  font-weight: 700;
`;
