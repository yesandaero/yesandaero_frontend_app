import React from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { FoodStore } from "./food-store-data";

type FoodStoresMapProps = {
  stores: FoodStore[];
};

const SCHOOL_REGION = {
  latitude: 36.39151,
  longitude: 127.36307,
  latitudeDelta: 0.007,
  longitudeDelta: 0.007,
};

export function FoodStoresMap({ stores }: FoodStoresMapProps) {
  return (
    <MapContainer accessibilityLabel="대덕소프트웨어마이스터고 주변 맛집 지도">
      <MapView
        initialRegion={SCHOOL_REGION}
        moveOnMarkerPress={false}
        pitchEnabled={false}
        rotateEnabled={false}
        showsCompass={false}
        showsPointsOfInterest={false}
        style={{ flex: 1 }}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={store.coordinate}
            description={store.menu}
            title={store.name}
          >
            <MarkerContent>
              <PriceBubble>
                <PriceText>{store.price.toLocaleString()}원</PriceText>
              </PriceBubble>
              <Pin>
                <PinEmoji>{store.emoji}</PinEmoji>
              </Pin>
            </MarkerContent>
          </Marker>
        ))}
      </MapView>
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
  padding: 5px 9px;
  border-width: 1px;
  border-color: ${colors.primary300};
  border-radius: 14px;
  background-color: ${colors.neutral0};
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
