import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { StoreMenu } from "./store-detail-data";

type StoreMenuSectionProps = {
  menus: StoreMenu[];
};

export function StoreMenuSection({ menus }: StoreMenuSectionProps) {
  return (
    <Section>
      <SectionTitle>메뉴</SectionTitle>
      {menus.length > 0 ? (
        <MenuList>
          {menus.map((menu) => {
            const isDiscounted = menu.discountedPrice < menu.price;

            return (
              <MenuRow key={menu.menuId}>
                <MenuInformation>
                  <MenuName selectable>{menu.name}</MenuName>
                  <MenuDescription selectable>
                    {menu.description}
                  </MenuDescription>
                </MenuInformation>
                <PriceGroup>
                  {isDiscounted ? (
                    <OriginalPrice selectable>
                      {menu.price.toLocaleString()}원
                    </OriginalPrice>
                  ) : null}
                  <CurrentPrice $discounted={isDiscounted} selectable>
                    {menu.discountedPrice.toLocaleString()}원
                  </CurrentPrice>
                </PriceGroup>
              </MenuRow>
            );
          })}
        </MenuList>
      ) : (
        <EmptyText>등록된 메뉴가 없어요.</EmptyText>
      )}
    </Section>
  );
}

const Section = styled.View`
  gap: 8px;
  padding: 0 18px;
`;

const SectionTitle = styled.Text`
  color: ${colors.primary900};
  font-size: 20px;
  margin-top: 10px;
  font-weight: 900;
`;

const MenuList = styled.View``;

const MenuRow = styled.View`
  min-height: 88px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary200};
`;

const MenuInformation = styled.View`
  flex: 1;
  gap: 4px;
`;

const MenuName = styled.Text`
  color: ${colors.neutral900};
  font-size: 17px;
  font-weight: 900;
`;

const MenuDescription = styled.Text`
  color: ${colors.neutral600};
  font-size: 13px;
  font-weight: 600;
`;

const PriceGroup = styled.View`
  align-items: flex-end;
  gap: 2px;
`;

const OriginalPrice = styled.Text`
  color: ${colors.neutral600};
  font-size: 13px;
  font-weight: 700;
  text-decoration-line: line-through;
`;

const CurrentPrice = styled.Text<{ $discounted: boolean }>`
  color: ${({ $discounted }) =>
    $discounted ? colors.errorRed : colors.primary900};
  font-size: 18px;
  font-weight: 900;
`;

const EmptyText = styled.Text`
  padding: 22px 0;
  color: ${colors.neutral600};
  font-size: 14px;
  text-align: center;
`;
