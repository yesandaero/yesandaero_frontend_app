import { api } from "@/apis";

import type {
  Coupon,
  CouponListResponse,
  CouponStatus,
  RegisterCouponRequest,
  UseCouponResponse,
} from "./type";

export const getMyCoupons = async (status?: CouponStatus) => {
  const response = await api.get<CouponListResponse>("/coupons/me", {
    params: status ? { status } : undefined,
  });

  return response.data;
};

export const registerCoupon = async ({ token }: RegisterCouponRequest) => {
  const response = await api.post<Coupon>("/coupons/register", { token });
  return response.data;
};

export const consumeCoupon = async (couponId: number) => {
  const response = await api.post<UseCouponResponse>(
    `/coupons/${couponId}/use`,
  );

  return response.data;
};
