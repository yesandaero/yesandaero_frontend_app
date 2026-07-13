import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { FoodStore } from "./food-store-data";

type FoodStoreListProps = {
  stores: FoodStore[];
};

export function FoodStoreList({ stores }: FoodStoreListProps) {
  if (stores.length === 0) {
    return (
      <EmptyCard>
        <EmptyEmoji>🍽️</EmptyEmoji>
        <EmptyTitle>조건에 맞는 맛집이 없어요</EmptyTitle>
        <EmptyDescription>카테고리나 검색어를 바꿔보세요.</EmptyDescription>
      </EmptyCard>
    );
  }

  return (
    <List>
      {stores.map((store) => (
        <StoreCard key={store.id}>
          <StoreEmoji>{store.emoji}</StoreEmoji>
          <StoreInformation>
            <StoreTopRow>
              <StoreName numberOfLines={1}>{store.name}</StoreName>
              <Rating>★ {store.rating.toFixed(1)}</Rating>
            </StoreTopRow>
            <StoreMeta>
              {store.category} · {store.menu}
            </StoreMeta>
            <StoreBottomRow>
              <Discount>{store.discount}% 할인</Discount>
              <Price>{store.price.toLocaleString()}원</Price>
            </StoreBottomRow>
          </StoreInformation>
        </StoreCard>
      ))}
    </List>
  );
}

const List = styled.View`
  gap: 9px;
  padding-bottom: 12px;
`;

const StoreCard = styled.View`
  min-height: 94px;
  flex-direction: row;
  align-items: center;
  padding: 13px;
  border-width: 1px;
  border-color: ${colors.primary200};
  border-radius: 16px;
  background-color: ${colors.neutral0};
`;

const StoreEmoji = styled.Text`
  width: 46px;
  font-size: 30px;
`;

const StoreInformation = styled.View`
  flex: 1;
`;

const StoreTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const StoreName = styled.Text`
  flex: 1;
  color: ${colors.neutral900};
  font-size: 16px;
  font-weight: 900;
`;

const Rating = styled.Text`
  color: ${colors.primary700};
  font-size: 12px;
  font-weight: 800;
`;

const StoreMeta = styled.Text`
  margin-top: 4px;
  color: ${colors.neutral600};
  font-size: 12px;
  font-weight: 600;
`;

const StoreBottomRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 7px;
`;

const Discount = styled.Text`
  color: ${colors.primary700};
  font-size: 12px;
  font-weight: 800;
`;

const Price = styled.Text`
  color: ${colors.primary900};
  font-size: 15px;
  font-weight: 900;
`;

const EmptyCard = styled.View`
  height: 210px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.primary200};
  border-radius: 18px;
  background-color: ${colors.neutral0};
`;

const EmptyEmoji = styled.Text`
  font-size: 32px;
`;

const EmptyTitle = styled.Text`
  margin-top: 8px;
  color: ${colors.neutral900};
  font-size: 16px;
  font-weight: 800;
`;

const EmptyDescription = styled.Text`
  margin-top: 4px;
  color: ${colors.neutral600};
  font-size: 13px;
`;
