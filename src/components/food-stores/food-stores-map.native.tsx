import { router } from "expo-router";
import React from "react";
import MapView, { Marker, type Region } from "react-native-maps";
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

export function FoodStoresMap({
  budget,
  initialRegion,
  isLoading = false,
  onBoundsChange,
  stores,
}: FoodStoresMapProps) {
  const handleRegionChangeComplete = (region: Region) => {
    onBoundsChange(regionToMapBounds(region));
  };

  return (
    <MapContainer accessibilityLabel="설정한 위치 주변 맛집 지도">
      <MapView
        key={`${initialRegion.latitude}:${initialRegion.longitude}`}
        initialRegion={initialRegion}
        moveOnMarkerPress={false}
        pitchEnabled={false}
        rotateEnabled={false}
        showsCompass={false}
        showsPointsOfInterest={false}
        style={{ flex: 1 }}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {stores
          .filter(
            (store) => Number.isInteger(store.storeId) && store.storeId > 0,
          )
          .map((store) => (
          <Marker
            key={store.storeId}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            description={`${store.openTime}~${store.closeTime}`}
            onPress={() =>
              router.push({
                pathname: "/StoreDetail",
                params: {
                  budget: String(budget),
                  storeId: String(store.storeId),
                },
              })
            }
            title={store.name}
          >
            <MarkerContent>
              <PriceBubble>
                <PriceText>{store.avgPrice.toLocaleString()}원</PriceText>
                {store.hasUsableCoupon && <CouponBadge>쿠폰</CouponBadge>}
              </PriceBubble>
              <Pin>
                <PinEmoji>🍽️</PinEmoji>
              </Pin>
            </MarkerContent>
          </Marker>
          ))}
      </MapView>
      {isLoading && (
        <LoadingBadge accessibilityLiveRegion="polite">
          <LoadingText>가게 불러오는 중...</LoadingText>
        </LoadingBadge>
      )}
    </MapContainer>
  );
}

const MapContainer = styled.View`
  height: 320px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 18px;
  background-color: ${colors.primary100};
`;

const MarkerContent = styled.View`
  align-items: center;
`;

const PriceBubble = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 5px 9px;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 14px;
  background-color: ${colors.neutral0};
`;

const CouponBadge = styled.Text`
  color: ${colors.errorRed};
  font-size: 9px;
  font-weight: 900;
`;

const PriceText = styled.Text`
  color: ${colors.primary900};
  font-size: 12px;
  font-weight: 900;
`;

const Pin = styled.View`
  width: 36px;
  height: 36px;
  margin-top: 3px;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background-color: ${colors.primary700};
`;

const PinEmoji = styled.Text`
  font-size: 17px;
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
