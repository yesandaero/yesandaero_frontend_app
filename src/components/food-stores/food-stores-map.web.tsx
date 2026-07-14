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

export function FoodStoresMap({
  budget,
  initialRegion,
  isLoading = false,
  onBoundsChange,
  stores,
}: FoodStoresMapProps) {
  const bounds = useMemo(
    () => regionToMapBounds(initialRegion),
    [initialRegion],
  );
  const mapUrl = useMemo(() => {
    const bbox = [bounds.swLng, bounds.swLat, bounds.neLng, bounds.neLat].join(
      ",",
    );

    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik`;
  }, [bounds]);
  const storesWithPosition = useMemo(
    () =>
      stores.flatMap((store) => {
        if (!Number.isInteger(store.storeId) || store.storeId <= 0) return [];
        if (!Number.isFinite(store.latitude) || !Number.isFinite(store.longitude)) {
          return [];
        }

        const position = toPercentPosition(store, bounds);
        return position ? [{ store, position }] : [];
      }),
    [bounds, stores],
  );

  useEffect(() => {
    onBoundsChange(bounds);
  }, [bounds, onBoundsChange]);

  return (
    <MapContainer accessibilityLabel="백엔드 가게 위치를 표시한 실제 지도">
      <iframe
        aria-label="가게 위치 지도"
        key={`${initialRegion.latitude}:${initialRegion.longitude}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          pointerEvents: "none",
        }}
        title="가게 위치 지도"
      />

      {storesWithPosition.map(({ store, position }) => (
        <StoreMarker
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
          style={position}
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
        </StoreMarker>
      ))}

      {isLoading && (
        <LoadingBadge accessibilityLiveRegion="polite">
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

const StoreMarker = styled.Pressable`
  position: absolute;
  align-items: center;
  margin-left: -38px;
  margin-top: -16px;
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

const PriceText = styled.Text`
  color: ${colors.primary900};
  font-size: 11px;
  font-weight: 900;
`;

const CouponBadge = styled.Text`
  color: ${colors.errorRed};
  font-size: 9px;
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
