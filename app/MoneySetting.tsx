import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { BudgetActionButton } from "@/components/budget/budget-action-button";
import { BudgetHeader } from "@/components/budget/budget-header";
import { BudgetSelector } from "@/components/budget/budget-selector";
import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { colors } from "@/constants/color";
import { useSettingsStore } from "@/stores/settings-store";

const DEFAULT_BUDGET = "10000";

export default function MoneySetting() {
  const { source } = useLocalSearchParams<{ source?: string }>();
  const isSettingsFlow = source === "settings";
  const savedBudget = useSettingsStore((state) => state.budget);
  const saveBudget = useSettingsStore((state) => state.setBudget);
  const [budget, setBudget] = useState(
    isSettingsFlow ? String(savedBudget) : DEFAULT_BUDGET,
  );

  const handleBudgetChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "").replace(/^0+(?=\d)/, "");
    setBudget(numericValue);
  };

  const handleFindRestaurants = () => {
    if (!budget) return;

    saveBudget(Number(budget));

    if (isSettingsFlow) {
      router.replace("/tab/Setting");
      return;
    }

    router.replace({
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

      <BudgetActionButton
        disabled={!budget}
        label={isSettingsFlow ? "가격 저장완료" : "이 설정으로 맛집 찾기"}
        onPress={handleFindRestaurants}
      />
      <AppBottomNavigation
        activeTab={isSettingsFlow ? "settings" : undefined}
      />
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
