import { router } from "expo-router";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components/native";

import type { MapStore, StoreMapBounds } from "@/apis/Store/type";
import { colors } from "@/constants/color";
import {
  type FoodMapRegion,
  regionToMapBounds,
} from "./food-store-data";

type FoodStoresMapProps = {
  budget: number;
  initialRegion: FoodMapRegion;
  isLoading?: boolean;
  onBoundsChange: (bounds: StoreMapBounds) => void;
  stores: MapStore[];
};

const toPercentPosition = (
  store: MapStore,
  bounds: StoreMapBounds,
) => {
  const longitudeRange = bounds.neLng - bounds.swLng;
  const latitudeRange = bounds.neLat - bounds.swLat;

  if (longitudeRange <= 0 || latitudeRange <= 0) return null;

  const left = ((store.longitude - bounds.swLng) / longitudeRange) * 100;
  const top = ((bounds.neLat - store.latitude) / latitudeRange) * 100;

  if (left < 0 || left > 100 || top < 0 || top > 100) return null;

  return {
    left: `${left}%` as `${number}%`,
    top: `${top}%` as `${number}%`,
  };
};

export function FoodStoresMapFallback({
  budget,
  initialRegion,
  isLoading = false,
  onBoundsChange,
  stores,
}: FoodStoresMapProps) {
  const queryBounds = useMemo(
    () => regionToMapBounds(initialRegion),
    [initialRegion],
  );
  const validStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          Number.isInteger(store.storeId) &&
          store.storeId > 0 &&
          Number.isFinite(store.latitude) &&
          Number.isFinite(store.longitude),
      ),
    [stores],
  );
  const bounds = useMemo(() => {
    if (validStores.length === 0) return queryBounds;

    const latitudes = [
      initialRegion.latitude,
      ...validStores.map((store) => store.latitude),
    ];
    const longitudes = [
      initialRegion.longitude,
      ...validStores.map((store) => store.longitude),
    ];
    const latitudePadding = Math.max(
      (Math.max(...latitudes) - Math.min(...latitudes)) * 0.12,
      0.001,
    );
    const longitudePadding = Math.max(
      (Math.max(...longitudes) - Math.min(...longitudes)) * 0.12,
      0.001,
    );

    return {
      swLat: Math.min(...latitudes) - latitudePadding,
      swLng: Math.min(...longitudes) - longitudePadding,
      neLat: Math.max(...latitudes) + latitudePadding,
      neLng: Math.max(...longitudes) + longitudePadding,
    };
  }, [initialRegion.latitude, initialRegion.longitude, queryBounds, validStores]);
  const storesWithPosition = useMemo(
    () =>
      validStores.flatMap((store) => {
        const position = toPercentPosition(store, bounds);
        return position ? [{ store, position }] : [];
      }),
    [bounds, validStores],
  );

  useEffect(() => {
    onBoundsChange(queryBounds);
  }, [onBoundsChange, queryBounds]);

  return (
    <MapContainer accessibilityLabel="설정한 위치 주변 맛집 지도 미리보기">
      <Road $horizontal $position="28%" />
      <Road $horizontal $position="68%" />
      <Road $position="30%" />
      <Road $position="72%" />

      <CurrentLocationMarker accessibilityLabel="사용자가 입력한 위치" />
      <LocationLabel>설정한 위치</LocationLabel>

      {storesWithPosition.map(({ store, position }) => (
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
              <PriceText>
                {typeof store.avgPrice === "number"
                  ? `${store.avgPrice.toLocaleString()}원`
                  : "가격 정보 없음"}
              </PriceText>
              {store.hasUsableCoupon && <CouponBadge>쿠폰</CouponBadge>}
            </PriceBubble>
            <Pin>
              <PinEmoji>🍽️</PinEmoji>
            </Pin>
          </MarkerPreview>
        ))}
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

const LocationLabel = styled.Text`
  position: absolute;
  right: 12px;
  bottom: 10px;
  color: ${colors.primary800};
  font-size: 11px;
  font-weight: 800;
`;

const CurrentLocationMarker = styled.View`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14px;
  height: 14px;
  margin-left: -7px;
  margin-top: -7px;
  border-width: 3px;
  border-color: ${colors.neutral0};
  border-radius: 7px;
  background-color: ${colors.errorRed};
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
