import React, { useMemo } from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type LocationMapPreviewProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  } | null;
  title?: string;
};

const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = 0.008;

export function LocationMapPreview({
  coordinate,
  title = "설정한 위치",
}: LocationMapPreviewProps) {
  const mapUrl = useMemo(() => {
    if (!coordinate) return null;

    const west = coordinate.longitude - LONGITUDE_DELTA / 2;
    const east = coordinate.longitude + LONGITUDE_DELTA / 2;
    const south = coordinate.latitude - LATITUDE_DELTA / 2;
    const north = coordinate.latitude + LATITUDE_DELTA / 2;
    const bounds = [west, south, east, north].join(",");

    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bounds)}&layer=mapnik&marker=${coordinate.latitude}%2C${coordinate.longitude}`;
  }, [coordinate]);

  if (!mapUrl || !coordinate) {
    return (
      <LoadingMap accessibilityLabel="현재 위치를 불러오는 중">
        <LoadingText>현재 위치 지도를 불러오고 있어요</LoadingText>
      </LoadingMap>
    );
  }

  return (
    <MapContainer accessibilityLabel="현재 위치를 표시한 실제 지도">
      <iframe
        allowFullScreen
        aria-label={`${title} 지도`}
        key={`${coordinate.latitude}:${coordinate.longitude}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        style={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
        title={`${title} 지도`}
      />
      <LocationBadge pointerEvents="none">
        <LocationBadgeText numberOfLines={1}>{title}</LocationBadgeText>
      </LocationBadge>
    </MapContainer>
  );
}

const MapContainer = styled.View`
  position: relative;
  height: 410px;
  overflow: hidden;
  background-color: ${colors.primary50};
`;

const LoadingMap = styled.View`
  height: 410px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary50};
`;

const LoadingText = styled.Text`
  color: ${colors.primary700};
  font-size: 14px;
  font-weight: 600;
`;

const LocationBadge = styled.View`
  position: absolute;
  right: 14px;
  bottom: 14px;
  max-width: 75%;
  padding: 8px 12px;
  border-radius: 14px;
  background-color: rgba(255, 255, 255, 0.94);
`;

const LocationBadgeText = styled.Text`
  color: ${colors.primary900};
  font-size: 12px;
  font-weight: 800;
`;
