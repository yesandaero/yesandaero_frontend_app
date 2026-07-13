import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { LocationConfirmCard } from "@/components/location/location-confirm-card";
import { LocationHeader } from "@/components/location/location-header";
import { LocationMapPreview } from "@/components/location/location-map-preview";
import { LocationNextButton } from "@/components/location/location-next-button";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { useRoadAddress } from "@/hooks/use-road-address";
import { useSettingsStore } from "@/stores/settings-store";

export default function Location() {
  const { source } = useLocalSearchParams<{ source?: string }>();
  const isSettingsFlow = source === "settings";
  const {
    address,
    getCurrentRoadAddress,
    isLocating,
    isSearching,
    searchRoadAddress,
    selectedLocation,
  } = useRoadAddress();
  const [draftAddress, setDraftAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const saveLocation = useSettingsStore((state) => state.setLocation);

  const handleStartEditing = () => {
    setDraftAddress("");
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setDraftAddress("");
    setIsEditing(false);
  };

  const handleConfirmLocation = async () => {
    if (!isEditing) {
      await getCurrentRoadAddress();
      return;
    }

    const result = await searchRoadAddress(draftAddress);

    if (result) {
      setDraftAddress("");
      setIsEditing(false);
    }
  };

  const handleNext = () => {
    if (!selectedLocation) return;

    if (isSettingsFlow) {
      saveLocation(selectedLocation);
      router.replace("/tab/Setting");
      return;
    }

    router.push({
      pathname: "/MoneySetting",
      params: {
        latitude: String(selectedLocation.latitude),
        longitude: String(selectedLocation.longitude),
        roadAddress: selectedLocation.address,
      },
    });
  };

  return (
    <Page>
      <ScreenScroll
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LocationHeader />
        <Content>
          <LocationMapPreview coordinate={selectedLocation} />

          <CardOverlap>
            <LocationConfirmCard
              address={address}
              draftAddress={draftAddress}
              isEditing={isEditing}
              isLoading={isLocating || isSearching}
              onCancelEditing={handleCancelEditing}
              onConfirm={handleConfirmLocation}
              onDraftAddressChange={setDraftAddress}
              onStartEditing={handleStartEditing}
            />
          </CardOverlap>
        </Content>
      </ScreenScroll>
      <LocationNextButton
        disabled={!selectedLocation || isLocating}
        label={isSettingsFlow ? "완료" : "다음 단계"}
        onPress={handleNext}
      />
      <AppBottomNavigation
        activeTab={isSettingsFlow ? "settings" : undefined}
      />
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const ScreenScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  max-width: 460px;
  display: flex;
  background-color: white;
  justify-content: center;
  margin-bottom: 65px;
`;

const CardOverlap = styled.View`
  z-index: 2;
  margin-top: -60px;
  padding: 0 18px;
`;
