import React from "react";
import styled from "styled-components/native";

import { locationColors } from "./location-theme";

type LocationMapPreviewProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  } | null;
};

export function LocationMapPreview({ coordinate }: LocationMapPreviewProps) {
  return (
    <MapFallback accessibilityLabel="현재 위치 지도">
      <FallbackText>
        {coordinate ? "현재 위치를 확인했습니다" : "현재 위치 지도를 불러오고 있어요"}
      </FallbackText>
    </MapFallback>
  );
}

const MapFallback = styled.View`
  height: 250px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: ${locationColors.map};
`;

const Pin = styled.Text`
  font-size: 34px;
`;

const FallbackText = styled.Text`
  color: ${locationColors.muted};
  font-size: 14px;
  font-weight: 600;
`;
