import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
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
  const mapRef = useRef<MapView>(null);
  const fittedLocationRef = useRef<string | null>(null);
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

  useEffect(() => {
    if (validStores.length === 0) return;
    const locationKey = `${initialRegion.latitude}:${initialRegion.longitude}`;
    if (fittedLocationRef.current === locationKey) return;
    fittedLocationRef.current = locationKey;

    mapRef.current?.fitToCoordinates(
      [
        {
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
        },
        ...validStores.map((store) => ({
          latitude: store.latitude,
          longitude: store.longitude,
        })),
      ],
      {
        animated: true,
        edgePadding: { top: 64, right: 48, bottom: 64, left: 48 },
      },
    );
  }, [initialRegion.latitude, initialRegion.longitude, validStores]);

  const handleRegionChangeComplete = (region: Region) => {
    onBoundsChange(regionToMapBounds(region));
  };

  return (
    <MapContainer accessibilityLabel="설정한 위치 주변 맛집 지도">
      <MapView
        ref={mapRef}
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
        <Marker
          key={`current-location:${initialRegion.latitude}:${initialRegion.longitude}`}
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
          description="사용자가 설정에서 선택한 위치입니다."
          pinColor={colors.primary500}
          title="설정한 현재 위치"
          zIndex={1000}
        />
        {validStores.map((store) => (
          <Marker
            key={store.storeId}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            description={`${store.openTime}~${store.closeTime}`}
            pinColor={
              store.hasUsableCoupon ? colors.errorRed : colors.primary700
            }
            onPress={() =>
              router.push({
                pathname: "/StoreDetail",
                params: {
                  budget: String(budget),
                  storeId: String(store.storeId),
                },
              })
            }
            title={`${store.name}${
              typeof store.avgPrice === "number"
                ? ` · ${store.avgPrice.toLocaleString()}원`
                : ""
            }${store.hasUsableCoupon ? " · 쿠폰 사용 가능" : ""}`}
          />
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
