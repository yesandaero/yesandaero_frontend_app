import React, { useEffect, useRef } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import styled from "styled-components/native";

import { locationColors } from "./location-theme";

type LocationMapPreviewProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  } | null;
};

const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = 0.008;

export function LocationMapPreview({ coordinate }: LocationMapPreviewProps) {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!coordinate) return;

    mapRef.current?.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      450,
    );
  }, [coordinate]);

  if (!coordinate) {
    return (
      <LoadingMap accessibilityLabel="현재 위치를 불러오는 중">
        <LoadingText>현재 위치 지도를 불러오고 있어요</LoadingText>
      </LoadingMap>
    );
  }

  return (
    <MapContainer accessibilityLabel="현재 위치를 표시한 지도">
      <MapView
        ref={mapRef}
        initialRegion={{
          ...coordinate,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        loadingEnabled
        moveOnMarkerPress={false}
        showsCompass={false}
        showsMyLocationButton
        showsPointsOfInterest={false}
        showsUserLocation
        style={{ flex: 1 }}
      >
        <Circle
          center={coordinate}
          fillColor="rgba(155, 98, 0, 0.12)"
          radius={80}
          strokeColor="rgba(155, 98, 0, 0.32)"
          strokeWidth={1}
        />
        <Marker
          coordinate={coordinate}
          pinColor={locationColors.gold}
          title="대덕소프트웨어마이스터고등학교"
        />
      </MapView>
    </MapContainer>
  );
}

const MapContainer = styled.View`
  height: 250px;
  overflow: hidden;
  background-color: ${locationColors.map};
`;

const LoadingMap = styled.View`
  height: 250px;
  align-items: center;
  justify-content: center;
  background-color: ${locationColors.map};
`;

const LoadingText = styled.Text`
  color: ${locationColors.muted};
  font-size: 14px;
  font-weight: 600;
`;
