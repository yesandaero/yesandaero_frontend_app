import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { LocationBottomNavigation } from "@/components/location/location-bottom-navigation";
import { LocationConfirmCard } from "@/components/location/location-confirm-card";
import { LocationHeader } from "@/components/location/location-header";
import { LocationMapPreview } from "@/components/location/location-map-preview";
import { LocationNextButton } from "@/components/location/location-next-button";
import { colors } from "@/constants/color";
import { useRoadAddress } from "@/hooks/use-road-address";

export default function Location() {
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
        <Content>
          <LocationHeader />
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
        onPress={handleNext}
      />
      <LocationBottomNavigation />
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
  background-color: ${colors.primary50};
`;

const ScreenScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: ${colors.primary50};
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  max-width: 460px;
  align-self: center;
  background-color: ${colors.primary50};
`;

const CardOverlap = styled.View`
  z-index: 2;
  margin-top: -38px;
  padding: 0 18px;
`;
