import { tokenStorage } from "@/apis";
import { logoutUser } from "@/apis/Auth";
import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const clearSessionAndMoveToLogin = async () => {
  await tokenStorage.clearTokens();
  queryClient.clear();

  if (router.canDismiss()) {
    router.dismissAll();
  }

  router.replace("/Login");
};

const getLogoutErrorMessage = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return "로그아웃 요청을 처리하지 못했습니다.";
  }

  if (!error.response) {
    return "서버에 연결할 수 없습니다.";
  }

  return "로그아웃에 실패했습니다.";
};

export function useLogout() {
  const mutation = useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: logoutUser,
    onSuccess: async () => {
      await clearSessionAndMoveToLogin();
      Toast.show({
        type: "success",
        text1: "로그아웃되었습니다.",
      });
    },
    onError: async (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        await clearSessionAndMoveToLogin();
        return;
      }

      Toast.show({
        type: "error",
        text1: getLogoutErrorMessage(error),
      });
    },
    retry: false,
  });

  return {
    logout: mutation.mutate,
    isLoggingOut: mutation.isPending,
  };
}
