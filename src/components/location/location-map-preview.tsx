import React from "react";
import styled from "styled-components/native";

import { locationColors } from "./location-theme";

const GRID_LINES = Array.from({ length: 11 }, (_, index) => index);

export function LocationMapPreview() {
  return (
    <Map accessibilityLabel="현재 위치를 표시한 지도 미리보기">
      {GRID_LINES.map((line) => (
        <VerticalGridLine key={`vertical-${line}`} style={{ left: `${line * 10}%` }} />
      ))}
      {GRID_LINES.map((line) => (
        <HorizontalGridLine key={`horizontal-${line}`} style={{ top: `${line * 10}%` }} />
      ))}

      <LocationMarker>
        <AccuracyCircle />
        <Pin>
          <PinHead />
          <PinTail />
        </Pin>
      </LocationMarker>
    </Map>
  );
}

const Map = styled.View`
  position: relative;
  height: 350px;
  overflow: hidden;
  background-color: ${locationColors.map};
`;

const VerticalGridLine = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: ${locationColors.grid};
`;

const HorizontalGridLine = styled.View`
  position: absolute;
  right: 0;
  left: 0;
  height: 1px;
  background-color: ${locationColors.grid};
`;

const LocationMarker = styled.View`
  position: absolute;
  top: 42%;
  left: 50%;
  width: 112px;
  height: 128px;
  align-items: center;
  justify-content: flex-end;
  transform: translate(-56px, -54px);
`;

const AccuracyCircle = styled.View`
  position: absolute;
  bottom: 0;
  width: 112px;
  height: 112px;
  border-radius: 56px;
  background-color: rgba(190, 132, 22, 0.1);
`;

const Pin = styled.View`
  position: absolute;
  top: 0;
  align-items: center;
  box-shadow: 0 5px 8px rgba(91, 57, 0, 0.24);
`;

const PinHead = styled.View`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  background-color: ${locationColors.gold};
`;

const PinTail = styled.View`
  width: 0;
  height: 0;
  margin-top: -4px;
  border-top-width: 16px;
  border-right-width: 10px;
  border-left-width: 10px;
  border-top-color: ${locationColors.gold};
  border-right-color: transparent;
  border-left-color: transparent;
`;
