import { tokenStorage } from "@/apis";
import { createUser, loginUser } from "@/apis/Auth";
import type { LoginProps, SignupProps } from "@/apis/Auth/type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface ApiErrorBody {
  message?: string;
  detail?: string;
  title?: string;
  data?: {
    message?: string;
  };
}

type AuthAction = "login" | "signup";

const getAuthErrorMessage = (error: unknown, action: AuthAction) => {
  if (!(error instanceof AxiosError)) {
    return error instanceof Error
      ? error.message
      : "요청을 처리하지 못했습니다. 다시 시도해 주세요.";
  }

  const status = error.response?.status;

  if (!error.response) {
    return "서버에 연결할 수 없습니다. 네트워크 상태를 확인해 주세요.";
  }

  if (action === "login" && status === 401) {
    return "이메일 또는 비밀번호가 일치하지 않습니다.";
  }

  if (action === "signup" && status === 400) {
    return "입력값 형식이 올바르지 않습니다.";
  }

  if (action === "signup" && status === 409) {
    return "이미 사용 중인 이메일입니다.";
  }

  const responseData = error.response.data as ApiErrorBody | undefined;
  return (
    responseData?.detail ??
    responseData?.message ??
    responseData?.data?.message ??
    responseData?.title ??
    "요청을 처리하지 못했습니다. 다시 시도해 주세요."
  );
};

const showAuthErrorToast = (error: unknown, action: AuthAction) => {
  Toast.show({
    type: "error",
    text1: action === "login" ? "로그인 실패" : "회원가입 실패",
    text2: getAuthErrorMessage(error, action),
  });
};

export function useLogin() {
  const mutation = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (credentials: LoginProps) => {
      const tokens = await loginUser(credentials);

      if (!tokens.accessToken || !tokens.refreshToken) {
        throw new Error("로그인 응답에 토큰이 없습니다.");
      }

      await tokenStorage.setTokens(tokens);
      return tokens;
    },
    onError: (error) => showAuthErrorToast(error, "login"),
    retry: false,
  });

  return {
    login: mutation.mutateAsync,
    isLoading: mutation.isPending,
    clearError: mutation.reset,
  };
}

export function useSignup() {
  const mutation = useMutation({
    mutationKey: ["auth", "signup"],
    mutationFn: (user: SignupProps) => createUser(user),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "회원가입 완료",
        text2: "로그인해 주세요.",
      });
    },
    onError: (error) => showAuthErrorToast(error, "signup"),
    retry: false,
  });

  return {
    signup: mutation.mutateAsync,
    isLoading: mutation.isPending,
    clearError: mutation.reset,
  };
}
