import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { LogoutButton } from "@/components/settings/logout-button";
import { SettingsHeader } from "@/components/settings/settings-header";
import { SettingsOptionCard } from "@/components/settings/settings-option-card";
import { screenLayout } from "@/constants/layout";
import { useLogout } from "@/hooks/use-logout";

export default function Setting() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <Page>
      <ContentScroll
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <SettingsHeader />
          <OptionList>
            <SettingsOptionCard
              description="도로명 주소와 지도 위치를 다시 선택해요."
              href={{ pathname: "/Location", params: { source: "settings" } }}
              icon="📍"
              title="위치 다시 설정"
            />
            <SettingsOptionCard
              description="맛집을 찾을 때 사용할 한 끼 예산을 바꿔요."
              href={{
                pathname: "/MoneySetting",
                params: { source: "settings" },
              }}
              icon="💰"
              title="가격 다시 설정"
            />
          </OptionList>
          <LogoutButton isLoading={isLoggingOut} onPress={logout} />
        </Content>
      </ContentScroll>

      <AppBottomNavigation activeTab="settings" />
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
`;

const ContentScroll = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  width: 100%;
  max-width: ${screenLayout.contentMaxWidth}px;
  align-self: center;
  padding: ${screenLayout.topPadding}px ${screenLayout.horizontalPadding}px
    ${screenLayout.bottomPadding}px;
`;

const OptionList = styled.View`
  gap: 12px;
`;
