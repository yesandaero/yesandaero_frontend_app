import { toastConfig } from "@/components/toast/toast-config";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
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
