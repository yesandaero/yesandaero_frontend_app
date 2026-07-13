import { api } from "@/apis";

import type {
  Coupon,
  CouponListResponse,
  CouponStatus,
  RegisterCouponRequest,
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
