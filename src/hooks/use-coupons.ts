import { consumeCoupon, getMyCoupons, registerCoupon } from "@/apis/Coupon";
import type {
  Coupon,
  CouponListResponse,
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

type CouponAction = "list" | "register" | "use";

const getCouponErrorMessage = (error: unknown, action: CouponAction) => {
  if (!(error instanceof AxiosError)) {
    return "요청을 처리하지 못했습니다.";
  }

  if (!error.response) {
    return "서버에 연결할 수 없습니다.";
  }

  if (action === "register" && error.response.status === 409) {
    return "이미 등록된 쿠폰입니다.";
  }

  if (action === "use") {
    if (error.response.status === 403) {
      return "본인 쿠폰만 사용할 수 있습니다.";
    }

    if (error.response.status === 404) {
      return "존재하지 않는 쿠폰입니다.";
    }

    if (error.response.status === 409) {
      return "이미 사용됐거나 만료된 쿠폰입니다.";
    }

    return "쿠폰을 사용하지 못했습니다.";
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
    onSuccess: (registeredCoupon) => {
      queryClient.setQueryData<CouponListResponse>(
        couponKeys.mine("REGISTERED"),
        (currentCoupons) => {
          if (!currentCoupons) {
            return { coupons: [registeredCoupon] };
          }

          const coupons = currentCoupons.coupons.filter(
            (coupon: Coupon) => coupon.couponId !== registeredCoupon.couponId,
          );

          return {
            ...currentCoupons,
            coupons: [registeredCoupon, ...coupons],
          };
        },
      );

      void queryClient.invalidateQueries({ queryKey: couponKeys.all });
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

export function useCouponUsage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [...couponKeys.all, "use"],
    mutationFn: (couponId: number) => consumeCoupon(couponId),
    onSuccess: (usedCoupon) => {
      queryClient.setQueryData<CouponListResponse>(
        couponKeys.mine("REGISTERED"),
        (currentCoupons) =>
          currentCoupons
            ? {
                ...currentCoupons,
                coupons: currentCoupons.coupons.filter(
                  (coupon) => coupon.couponId !== usedCoupon.couponId,
                ),
              }
            : currentCoupons,
      );

      void queryClient.invalidateQueries({ queryKey: couponKeys.all });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) return;

      Toast.show({
        type: "error",
        text1: getCouponErrorMessage(error, "use"),
      });
    },
    retry: false,
  });

  return {
    consumeCoupon: mutation.mutateAsync,
    isUsing: mutation.isPending,
  };
}
