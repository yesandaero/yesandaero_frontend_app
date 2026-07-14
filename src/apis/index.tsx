import axios, {
  AxiosError,
  create,
  type InternalAxiosRequestConfig,
} from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

import { useAuthSessionStore } from "@/stores/auth-session-store";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const REFRESH_PATH = "/auth/refresh";

const skipUrls = [
  "/auth/login",
  "/auth/signup",
  REFRESH_PATH,
  "/projects/structures",
  "/projects/status",
  "/projects/detail",
  "/projects/file",
];

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const isWeb = process.env.EXPO_OS === "web";

const getStoredToken = async (key: string) => {
  if (isWeb) {
    return globalThis.localStorage?.getItem(key) ?? null;
  }

  return SecureStore.getItemAsync(key);
};

const setStoredToken = async (key: string, value: string) => {
  if (isWeb) {
    globalThis.localStorage?.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
};

const deleteStoredToken = async (key: string) => {
  if (isWeb) {
    globalThis.localStorage?.removeItem(key);
    return;
  }

  await SecureStore.deleteItemAsync(key);
};

export const tokenStorage = {
  getAccessToken: () => getStoredToken(ACCESS_TOKEN_KEY),
  getRefreshToken: () => getStoredToken(REFRESH_TOKEN_KEY),
  setTokens: async ({ accessToken, refreshToken }: TokenPair) => {
    await Promise.all([
      setStoredToken(ACCESS_TOKEN_KEY, accessToken),
      setStoredToken(REFRESH_TOKEN_KEY, refreshToken),
    ]);
    useAuthSessionStore.getState().setAuthenticated(true);
  },
  clearTokens: async () => {
    await Promise.all([
      deleteStoredToken(ACCESS_TOKEN_KEY),
      deleteStoredToken(REFRESH_TOKEN_KEY),
    ]);
    useAuthSessionStore.getState().setAuthenticated(false);
  },
};

const isSkipUrl = (url?: string) =>
  !!url && skipUrls.some((skipUrl) => url.includes(skipUrl));

export const api = create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

let currentRefreshPromise: Promise<string> | null = null;
let hasConfirmedSession = false;

const showSessionExpiredToast = () => {
  Toast.show({
    type: "error",
    text1: "세션이 만료되었습니다.",
  });
};

const handleRefreshFailure = async (refreshError: unknown) => {
  const refreshStatus =
    refreshError instanceof AxiosError
      ? refreshError.response?.status
      : undefined;

  const shouldEndSession =
    !(refreshError instanceof AxiosError) || refreshStatus !== undefined;

  if (shouldEndSession) {
    await tokenStorage.clearTokens();
    if (hasConfirmedSession) {
      showSessionExpiredToast();
    }
    hasConfirmedSession = false;
    router.replace("/Login");
  }

  throw refreshError;
};

const refreshAccessToken = async () => {
  const refreshToken = await tokenStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("저장된 refreshToken이 없습니다.");
  }

  const response = await axios.post<TokenPair>(
    `${BASE_URL ?? ""}${REFRESH_PATH}`,
    { refreshToken },
    {
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    },
  );

  const tokens = response.data;

  if (!tokens.accessToken || !tokens.refreshToken) {
    throw new Error("토큰 재발급 응답 형식이 올바르지 않습니다.");
  }

  await tokenStorage.setTokens(tokens);
  return tokens.accessToken;
};

api.interceptors.request.use(async (config) => {
  if (isSkipUrl(config.url)) return config;

  const accessToken = await tokenStorage.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (!isSkipUrl(response.config.url)) {
      hasConfirmedSession = true;
    }

    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !config ||
      config._retry ||
      isSkipUrl(config.url)
    ) {
      return Promise.reject(error);
    }

    const [accessToken, refreshToken] = await Promise.all([
      tokenStorage.getAccessToken(),
      tokenStorage.getRefreshToken(),
    ]);

    if (!refreshToken) {
      if (accessToken) {
        await tokenStorage.clearTokens();
        if (hasConfirmedSession) {
          showSessionExpiredToast();
        }
        hasConfirmedSession = false;
        router.replace("/Login");
      }

      return Promise.reject(error);
    }

    config._retry = true;

    try {
      if (!currentRefreshPromise) {
        currentRefreshPromise = refreshAccessToken()
          .catch(handleRefreshFailure)
          .finally(() => {
            currentRefreshPromise = null;
          });
      }

      const newAccessToken = await currentRefreshPromise;
      config.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(config);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
