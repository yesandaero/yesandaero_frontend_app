import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { screenLayout } from "@/constants/layout";

type StoreDetailHeaderProps = {
  name: string;
  category: string;
  onBackPress: () => void;
};

export function StoreDetailHeader({
  name,
  category,
  onBackPress,
}: StoreDetailHeaderProps) {
  return (
    <Header>
      <TopRow>
        <BackButton
          accessibilityLabel="이전 화면으로 이동"
          accessibilityRole="button"
          hitSlop={12}
          onPress={onBackPress}
        >
          <BackIcon>‹</BackIcon>
        </BackButton>
      </TopRow>

      <TitleGroup>
        <StoreName selectable>{name}</StoreName>
        <Category selectable>{category}</Category>
      </TitleGroup>
    </Header>
  );
}

const Header = styled.View`
  min-height: 200px;
  justify-content: space-between;
  padding: ${screenLayout.topPadding}px ${screenLayout.horizontalPadding}px 30px;
  background-color: ${colors.primary900};
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const BackButton = styled.Pressable`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${colors.primary700};
`;

const BackIcon = styled.Text`
  margin-top: -3px;
  color: ${colors.neutral0};
  font-size: 32px;
  line-height: 34px;
`;

const TitleGroup = styled.View`
  gap: 4px;
`;

const StoreName = styled.Text`
  color: ${colors.neutral0};
  font-size: 30px;
  font-weight: 900;
`;

const Category = styled.Text`
  color: ${colors.primary100};
  font-size: 15px;
  font-weight: 700;
`;
