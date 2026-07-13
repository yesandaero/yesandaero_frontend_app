import * as Linking from "expo-linking";
import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type StoreDirectionsProps = {
  latitude: number;
  longitude: number;
  name: string;
};

export function StoreDirections({
  latitude,
  longitude,
  name,
}: StoreDirectionsProps) {
  const encodedName = encodeURIComponent(name);

  return (
    <Section>
      <SectionTitle>길찾기</SectionTitle>
      <ButtonRow>
        <NaverButton
          accessibilityLabel="네이버 지도에서 길찾기"
          onPress={() =>
            void Linking.openURL(
              `https://map.naver.com/p/search/${encodedName}?c=${longitude},${latitude},15,0,0,0,dh`,
            )
          }
        >
          <ButtonText>네이버 지도</ButtonText>
        </NaverButton>
        <CaCaoButton
          accessibilityLabel="카카오맵에서 길찾기"
          onPress={() =>
            void Linking.openURL(
              `https://map.kakao.com/link/to/${encodedName},${latitude},${longitude}`,
            )
          }
        >
          <ButtonText>카카오맵</ButtonText>
        </CaCaoButton>
      </ButtonRow>
    </Section>
  );
}

const Section = styled.View`
  gap: 12px;
  padding: 28px 18px 0;
`;

const SectionTitle = styled.Text`
  color: ${colors.primary900};
  font-size: 20px;
  font-weight: 900;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const CaCaoButton = styled.Pressable`
  min-height: 54px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #ffd900;
`;

const NaverButton = styled.Pressable`
  min-height: 54px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #00c900;
`;

const ButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 16px;
  font-weight: 900;
`;
