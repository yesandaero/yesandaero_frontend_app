import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { StoreBudgetCard } from "@/components/store-detail/store-budget-card";
import { STORE_DETAIL } from "@/components/store-detail/store-detail-data";
import { StoreDetailHeader } from "@/components/store-detail/store-detail-header";
import { StoreProfile } from "@/components/store-detail/store-profile";
import { colors } from "@/constants/color";

export default function StoreDetail() {
  const { budget: budgetParam } = useLocalSearchParams<{ budget?: string }>();
  const parsedBudget = Number(
    Array.isArray(budgetParam) ? budgetParam[0] : budgetParam,
  );
  const budget =
    Number.isFinite(parsedBudget) && parsedBudget > 0 ? parsedBudget : 8000;

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
          <StoreProfile
            address={STORE_DETAIL.address}
            description={STORE_DETAIL.description}
            phone={STORE_DETAIL.phone}
          />
          <StoreBudgetCard budget={budget} />
          <BottomSpacing />
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

const BottomSpacing = styled.View`
  height: 28px;
`;
