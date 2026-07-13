import { router } from "expo-router";
import React, { useEffect } from "react";
import styled from "styled-components/native";

import type { MapStore, StoreMapBounds } from "@/apis/Store/type";
import { colors } from "@/constants/color";
import { DEFAULT_MAP_BOUNDS } from "./food-store-data";

type FoodStoresMapProps = {
  budget: number;
  isLoading?: boolean;
  onBoundsChange: (bounds: StoreMapBounds) => void;
  stores: MapStore[];
};

const POSITIONS = [
  { left: "12%", top: "12%" },
  { left: "55%", top: "18%" },
  { left: "65%", top: "44%" },
  { left: "24%", top: "55%" },
  { left: "43%", top: "35%" },
] as const;

export function FoodStoresMapFallback({
  budget,
  isLoading = false,
  onBoundsChange,
  stores,
}: FoodStoresMapProps) {
  useEffect(() => {
    onBoundsChange(DEFAULT_MAP_BOUNDS);
  }, [onBoundsChange]);

  return (
    <MapContainer accessibilityLabel="대덕소프트웨어마이스터고 주변 맛집 지도 미리보기">
      <Road $horizontal $position="28%" />
      <Road $horizontal $position="68%" />
      <Road $position="30%" />
      <Road $position="72%" />

      <SchoolLabel>대덕소프트웨어마이스터고</SchoolLabel>

      {stores.map((store, index) => {
        const position = POSITIONS[index % POSITIONS.length];

        return (
          <MarkerPreview
            key={store.storeId}
            accessibilityLabel={`${store.name} 상세 보기`}
            onPress={() =>
              router.push({
                pathname: "/StoreDetail",
                params: {
                  budget: String(budget),
                  storeId: String(store.storeId),
                },
              })
            }
            style={{ left: position.left, top: position.top }}
          >
            <PriceBubble>
              <PriceText>{store.avgPrice.toLocaleString()}원</PriceText>
              {store.hasUsableCoupon && <CouponBadge>쿠폰</CouponBadge>}
            </PriceBubble>
            <Pin>
              <PinEmoji>🍽️</PinEmoji>
            </Pin>
          </MarkerPreview>
        );
      })}
      {isLoading && (
        <LoadingBadge>
          <LoadingText>가게 불러오는 중...</LoadingText>
        </LoadingBadge>
      )}
    </MapContainer>
  );
}

const MapContainer = styled.View`
  position: relative;
  height: 320px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 18px;
  background-color: ${colors.primary100};
`;

const Road = styled.View<{ $horizontal?: boolean; $position: string }>`
  position: absolute;
  ${({ $horizontal, $position }) =>
    $horizontal
      ? `left: 0; right: 0; top: ${$position}; height: 1px;`
      : `top: 0; bottom: 0; left: ${$position}; width: 1px;`}
  background-color: ${colors.primary200};
`;

const SchoolLabel = styled.Text`
  position: absolute;
  right: 12px;
  bottom: 10px;
  color: ${colors.primary800};
  font-size: 11px;
  font-weight: 800;
`;

const MarkerPreview = styled.Pressable`
  position: absolute;
  align-items: center;
`;

const PriceBubble = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 13px;
  background-color: ${colors.neutral0};
`;

const CouponBadge = styled.Text`
  color: ${colors.errorRed};
  font-size: 9px;
  font-weight: 900;
`;

const PriceText = styled.Text`
  color: ${colors.primary900};
  font-size: 11px;
  font-weight: 900;
`;

const Pin = styled.View`
  width: 34px;
  height: 34px;
  margin-top: 3px;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  background-color: ${colors.primary700};
`;

const PinEmoji = styled.Text`
  font-size: 16px;
`;

const LoadingBadge = styled.View`
  position: absolute;
  top: 10px;
  align-self: center;
  padding: 7px 12px;
  border-radius: 14px;
  background-color: ${colors.neutral900};
`;

const LoadingText = styled.Text`
  color: ${colors.neutral0};
  font-size: 11px;
  font-weight: 800;
`;
