import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { StoreMenu } from "./store-detail-data";

type StoreHighlightsProps = {
  closeTime: string;
  distanceMeters: number;
  menus: StoreMenu[];
  openTime: string;
  usableCouponCount: number;
  walkingMinutes: number;
};

export function StoreHighlights({
  closeTime,
  distanceMeters,
  menus,
  openTime,
  usableCouponCount,
  walkingMinutes,
}: StoreHighlightsProps) {
  const maxDiscountRate = menus.reduce((maxRate, menu) => {
    if (menu.price <= 0 || menu.discountedPrice >= menu.price) return maxRate;

    return Math.max(
      maxRate,
      Math.round(((menu.price - menu.discountedPrice) / menu.price) * 100),
    );
  }, 0);

  return (
    <Section>
      <BadgeRow>
        <Badge>
          <BadgeText selectable>
            🕘 {openTime} ~ {closeTime}
          </BadgeText>
        </Badge>
        <Badge>
          <BadgeText selectable>
            도보 {walkingMinutes}분 · {distanceMeters.toLocaleString()}m
          </BadgeText>
        </Badge>
      </BadgeRow>

      {maxDiscountRate > 0 ? (
        <DiscountBanner>
          <DiscountText selectable>
            🏷️ 메뉴 최대 {maxDiscountRate}% 할인
          </DiscountText>
        </DiscountBanner>
      ) : null}

      {usableCouponCount > 0 ? (
        <CouponBadge>
          <CouponText selectable>
            🎟️ 사용 가능한 쿠폰 {usableCouponCount}장
          </CouponText>
        </CouponBadge>
      ) : null}
    </Section>
  );
}

const Section = styled.View`
  gap: 14px;
  padding: 18px;
`;

const BadgeRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const Badge = styled.View`
  min-height: 38px;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 18px;
  background-color: ${colors.primary100};
`;

const BadgeText = styled.Text`
  color: ${colors.primary900};
  font-size: 13px;
  font-weight: 800;
`;

const DiscountBanner = styled.View`
  min-height: 66px;
  justify-content: center;
  padding: 16px;
  border-radius: 18px;
  background-color: ${colors.primary300};
`;

const DiscountText = styled.Text`
  color: ${colors.primary900};
  font-size: 17px;
  font-weight: 900;
`;

const CouponBadge = styled.View`
  align-self: flex-start;
  padding: 9px 12px;
  border-radius: 16px;
  background-color: ${colors.primary100};
`;

const CouponText = styled.Text`
  color: ${colors.primary900};
  font-size: 13px;
  font-weight: 800;
`;
