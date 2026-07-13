import { Link } from "expo-router";
import React from "react";
import styled from "styled-components/native";

import type { MapStore, StoreCategory } from "@/apis/Store/type";
import { colors } from "@/constants/color";
import { getCategoryLabel } from "./food-store-data";

type FoodStoreListProps = {
  budget: number;
  categories: StoreCategory[];
  stores: MapStore[];
};

export function FoodStoreList({
  budget,
  categories,
  stores,
}: FoodStoreListProps) {
  if (stores.length === 0) {
    return (
      <EmptyCard>
        <EmptyTitle>조건에 맞는 맛집이 없어요</EmptyTitle>
        <EmptyDescription>카테고리나 검색어를 바꿔보세요.</EmptyDescription>
      </EmptyCard>
    );
  }

  return (
    <List>
      {stores.map((store) => (
        <Link
          key={store.storeId}
          href={{
            pathname: "/StoreDetail",
            params: {
              budget: String(budget),
              storeId: String(store.storeId),
            },
          }}
          asChild
        >
          <StoreCard accessibilityLabel={`${store.name} 상세 보기`}>
            <StoreInformation>
              <StoreTopRow>
                <StoreName numberOfLines={1}>{store.name}</StoreName>
              </StoreTopRow>
              <StoreMeta>
                {getCategoryLabel(store.category, categories)} · {store.openTime}
                ~{store.closeTime}
              </StoreMeta>
              <StoreBottomRow>
                <Distance>
                  {store.walkingMinutes !== null &&
                  store.distanceMeters !== null
                    ? `도보 ${store.walkingMinutes}분 · ${store.distanceMeters.toLocaleString()}m`
                    : "거리 정보 없음"}
                  {store.hasUsableCoupon ? " · 🎟️ 쿠폰 사용 가능" : ""}
                </Distance>
                <Price>{store.avgPrice.toLocaleString()}원</Price>
              </StoreBottomRow>
            </StoreInformation>
          </StoreCard>
        </Link>
      ))}
    </List>
  );
}

const List = styled.View`
  gap: 9px;
  padding-bottom: 12px;
`;

const StoreCard = styled.Pressable`
  min-height: 94px;
  flex-direction: row;
  align-items: center;
  padding: 16px 18px;
  border-width: 1px;
  border-color: ${colors.primary200};
  border-radius: 16px;
  background-color: ${colors.neutral0};
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

const Distance = styled.Text`
  flex: 1;
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
