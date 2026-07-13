import { getMyCoupons, registerCoupon } from "@/apis/Coupon";
import type {
  CouponStatus,
  RegisterCouponRequest,
} from "@/apis/Coupon/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const couponKeys = {
  all: ["coupons"] as const,
  mine: (status?: CouponStatus) => [...couponKeys.all, "me", status] as const,
};

const isUnauthorizedError = (error: unknown) =>
  error instanceof AxiosError && error.response?.status === 401;

const getCouponErrorMessage = (error: unknown, action: "list" | "register") => {
  if (!(error instanceof AxiosError)) {
    return "요청을 처리하지 못했습니다.";
  }

  if (!error.response) {
    return "서버에 연결할 수 없습니다.";
  }

  if (action === "register" && error.response.status === 409) {
    return "이미 등록된 쿠폰입니다.";
  }

  return action === "list"
    ? "쿠폰을 불러오지 못했습니다."
    : "쿠폰을 등록하지 못했습니다.";
};

export function useMyCoupons(status: CouponStatus = "REGISTERED") {
  const query = useQuery({
    queryKey: couponKeys.mine(status),
    queryFn: () => getMyCoupons(status),
    retry: false,
  });

  useEffect(() => {
    if (!query.error || isUnauthorizedError(query.error)) return;

    Toast.show({
      type: "error",
      text1: getCouponErrorMessage(query.error, "list"),
    });
  }, [query.error]);

  return {
    coupons: query.data?.coupons ?? [],
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    refetch: query.refetch,
  };
}

export function useRegisterCoupon() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [...couponKeys.all, "register"],
    mutationFn: (request: RegisterCouponRequest) => registerCoupon(request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: couponKeys.all });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) return;

      Toast.show({
        type: "error",
        text1: getCouponErrorMessage(error, "register"),
      });
    },
    retry: false,
  });

  return {
    registerCoupon: mutation.mutateAsync,
    isRegistering: mutation.isPending,
  };
}
