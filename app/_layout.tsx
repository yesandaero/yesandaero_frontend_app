import { tokenStorage } from "@/apis";
import { toastConfig } from "@/components/toast/toast-config";
import { queryClient } from "@/lib/query-client";
import { useAuthSessionStore } from "@/stores/auth-session-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { router, Stack, usePathname } from "expo-router";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

const PUBLIC_PATHS = new Set(["/", "/splash", "/Login", "/Signup"]);
const GUEST_ONLY_PATHS = new Set(["/Login", "/Signup"]);

function RootNavigator() {
  const pathname = usePathname();
  const isAuthenticated = useAuthSessionStore(
    (state) => state.isAuthenticated,
  );
  const setAuthenticated = useAuthSessionStore(
    (state) => state.setAuthenticated,
  );
  const previousAuthentication = useRef<boolean | null>(null);
  const isProtectedPath = !PUBLIC_PATHS.has(pathname);
  const isGuestOnlyPath = GUEST_ONLY_PATHS.has(pathname);

  useEffect(() => {
    let isMounted = true;

    void Promise.all([
      tokenStorage.getAccessToken(),
      tokenStorage.getRefreshToken(),
    ])
      .then(([accessToken, refreshToken]) => {
        if (!isMounted) return;
        setAuthenticated(Boolean(accessToken && refreshToken));
      })
      .catch(() => {
        if (!isMounted) return;
        setAuthenticated(false);
      });

    return () => {
      isMounted = false;
    };
  }, [setAuthenticated]);

  useEffect(() => {
    if (isAuthenticated === null) return;

    const wasAuthenticated = previousAuthentication.current;
    previousAuthentication.current = isAuthenticated;

    if (!isAuthenticated && isProtectedPath) {
      if (wasAuthenticated !== true) {
        Toast.show({
          type: "error",
          text1: "로그인이 필요합니다!",
        });
      }
      router.replace("/Login");
      return;
    }

    if (isAuthenticated && isGuestOnlyPath) {
      router.replace("/tab/FoodStores");
    }
  }, [isAuthenticated, isGuestOnlyPath, isProtectedPath, pathname]);

  if (
    isAuthenticated === null ||
    (!isAuthenticated && isProtectedPath) ||
    (isAuthenticated && isGuestOnlyPath)
  ) {
    return <View style={{ flex: 1 }} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
      <Toast
        config={toastConfig}
        position="top"
        topOffset={56}
        visibilityTime={1500}
      />
    </>
  );
}
