import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { BudgetActionButton } from "@/components/budget/budget-action-button";
import { BudgetHeader } from "@/components/budget/budget-header";
import { BudgetSelector } from "@/components/budget/budget-selector";
import { LocationBottomNavigation } from "@/components/location/location-bottom-navigation";
import { colors } from "@/constants/color";

const DEFAULT_BUDGET = "10000";

export default function MoneySetting() {
  const [budget, setBudget] = useState(DEFAULT_BUDGET);

  const handleBudgetChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "").replace(/^0+(?=\d)/, "");
    setBudget(numericValue);
  };

  const handleFindRestaurants = () => {
    if (!budget) return;

    router.push({
      pathname: "/tab/FoodStores",
      params: { budget },
    });
  };

  return (
    <Page>
      <ContentScroll
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <BudgetHeader onBackPress={() => router.back()} />
          <BudgetSelector budget={budget} onBudgetChange={handleBudgetChange} />
        </Content>
      </ContentScroll>

      <BudgetActionButton disabled={!budget} onPress={handleFindRestaurants} />
      <LocationBottomNavigation />
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
  background-color: ${colors.primary50};
`;

const ContentScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: ${colors.primary50};
`;

const Content = styled.View`
  width: 100%;
  max-width: 460px;
  align-self: center;
  padding: 14px 18px 20px;
`;
