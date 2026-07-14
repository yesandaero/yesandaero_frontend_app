import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { LocationConfirmCard } from "@/components/location/location-confirm-card";
import { LocationHeader } from "@/components/location/location-header";
import { LocationMapPreview } from "@/components/location/location-map-preview";
import { LocationNextButton } from "@/components/location/location-next-button";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { screenLayout } from "@/constants/layout";
import { useRoadAddress } from "@/hooks/use-road-address";
import { useSettingsStore } from "@/stores/settings-store";

export default function Location() {
  const { source } = useLocalSearchParams<{ source?: string }>();
  const isSettingsFlow = source === "settings";
  const queryClient = useQueryClient();
  const savedLocation = useSettingsStore((state) => state.location);
  const {
    address,
    getCurrentRoadAddress,
    isLocating,
    isSearching,
    searchRoadAddress,
    selectedLocation,
  } = useRoadAddress(savedLocation ?? undefined);
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

    saveLocation(selectedLocation);
    queryClient.removeQueries({ queryKey: ["stores", "map"] });
    queryClient.removeQueries({ queryKey: ["stores", "list"] });

    if (isSettingsFlow) {
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
        <Content>
          <LocationMapPreview
            coordinate={selectedLocation}
            title={selectedLocation.address}
          />
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
  max-width: ${screenLayout.contentMaxWidth}px;
  align-self: center;
  background-color: white;
  justify-content: flex-start;
  margin-bottom: 65px;
`;

const CardOverlap = styled.View`
  width: 100%;
  max-width: ${screenLayout.contentMaxWidth}px;
  align-self: center;
  z-index: 2;
  margin-bottom: -70px;
  padding: 0 ${screenLayout.horizontalPadding}px;
`;
