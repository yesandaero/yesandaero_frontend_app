import { router } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { StoreBudgetCard } from "@/components/store-detail/store-budget-card";
import { STORE_DETAIL } from "@/components/store-detail/store-detail-data";
import { StoreDetailHeader } from "@/components/store-detail/store-detail-header";
import { StoreDirections } from "@/components/store-detail/store-directions";
import { StoreInformation } from "@/components/store-detail/store-information";
import { StoreMenuSection } from "@/components/store-detail/store-menu-section";
import { StoreSummary } from "@/components/store-detail/store-summary";
import { colors } from "@/constants/color";

export default function StoreDetail() {
  return (
    <Page>
      <ScreenScroll
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <StoreDetailHeader
            category={STORE_DETAIL.category}
            name={STORE_DETAIL.name}
            onBackPress={() => router.back()}
          />
          <StoreSummary distance={STORE_DETAIL.distance} />
          <StoreMenuSection menus={STORE_DETAIL.menus} />
          <StoreBudgetCard budget={STORE_DETAIL.budget} orderPrice={3600} />
          <StoreInformation
            address={STORE_DETAIL.address}
            distance={STORE_DETAIL.distance}
            minimumOrder={STORE_DETAIL.minimumOrder}
            openingHours={STORE_DETAIL.openingHours}
            rating={STORE_DETAIL.rating}
          />
          <StoreDirections />
        </Content>
      </ScreenScroll>

      <AppBottomNavigation activeTab="home" />
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
  width: 100%;
  max-width: 460px;
  align-self: center;
  background-color: ${colors.primary50};
`;
