import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { AppBottomNavigation } from "@/components/navigation/app-bottom-navigation";
import { colors } from "@/constants/color";

export default function Like() {
  return (
    <Page>
      <ContentScroll
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <Title>좋아요</Title>
          <Description>마음에 드는 맛집을 저장해두는 공간이에요.</Description>

          <EmptyState>
            <EmptyIcon>❤️</EmptyIcon>
            <EmptyTitle>아직 저장한 맛집이 없어요</EmptyTitle>
            <EmptyDescription>
              맛집을 둘러보고 좋아요를 눌러보세요.
            </EmptyDescription>
          </EmptyState>
        </Content>
      </ContentScroll>

      <AppBottomNavigation activeTab="like" />
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
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  max-width: 460px;
  align-self: center;
  padding: 14px 18px 28px;
`;

const Title = styled.Text`
  color: ${colors.primary900};
  font-size: 28px;
  font-weight: 900;
`;

const Description = styled.Text`
  margin-top: 5px;
  color: ${colors.neutral700};
  font-size: 14px;
  font-weight: 600;
`;

const EmptyState = styled.View`
  flex: 1;
  min-height: 360px;
  align-items: center;
  justify-content: center;
`;

const EmptyIcon = styled.Text`
  font-size: 44px;
`;

const EmptyTitle = styled.Text`
  margin-top: 14px;
  color: ${colors.neutral900};
  font-size: 19px;
  font-weight: 900;
`;

const EmptyDescription = styled.Text`
  margin-top: 7px;
  color: ${colors.neutral600};
  font-size: 13px;
  font-weight: 600;
`;
