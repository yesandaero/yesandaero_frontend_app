export type CouponStatus = "REGISTERED" | "USED" | "EXPIRED";

export type CouponStore = {
  storeId: number;
  name: string;
  category?: string;
};

export type Coupon = {
  couponId: number;
  name: string;
  store: CouponStore;
  status: CouponStatus;
  expiresAt: string;
};

export type CouponListResponse = {
  coupons: Coupon[];
};

export type RegisterCouponRequest = {
  token: string;
};

export type CouponDiscountType = "AMOUNT" | "PERCENT";

export type UseCouponResponse = {
  couponId: number;
  name: string;
  discountType: CouponDiscountType;
  discountValue: number;
  status: "USED";
  usedAt: string;
};
