import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { StoreMenu } from "./store-detail-data";

type StoreMenuSectionProps = {
  menus: readonly StoreMenu[];
};

export function StoreMenuSection({ menus }: StoreMenuSectionProps) {
  return (
    <Section>
      <SectionTitle>메뉴</SectionTitle>
      {menus.map((menu) => (
        <MenuRow key={menu.id}>
          <MenuInformation>
            <MenuTitleRow>
              <MenuName $soldOut={Boolean(menu.soldOut)} selectable>
                {menu.name}
              </MenuName>
              {menu.soldOut ? (
                <SoldOutBadge>
                  <SoldOutText>품절</SoldOutText>
                </SoldOutBadge>
              ) : null}
            </MenuTitleRow>
            <MenuDescription selectable>{menu.description}</MenuDescription>
          </MenuInformation>

          <PriceGroup>
            {menu.originalPrice ? (
              <OriginalPrice selectable>
                {menu.originalPrice.toLocaleString()}원
              </OriginalPrice>
            ) : null}
            <CurrentPrice $discounted={Boolean(menu.originalPrice)} selectable>
              {menu.price.toLocaleString()}원
            </CurrentPrice>
          </PriceGroup>
        </MenuRow>
      ))}
    </Section>
  );
}

const Section = styled.View`
  padding: 0 18px;
`;

const SectionTitle = styled.Text`
  margin-bottom: 4px;
  color: ${colors.primary900};
  font-size: 20px;
  font-weight: 900;
`;

const MenuRow = styled.View`
  min-height: 76px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 13px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary200};
`;

const MenuInformation = styled.View`
  flex: 1;
`;

const MenuTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 7px;
`;

const MenuName = styled.Text<{ $soldOut: boolean }>`
  color: ${({ $soldOut }) =>
    $soldOut ? colors.neutral600 : colors.neutral900};
  font-size: 16px;
  font-weight: 900;
  text-decoration-line: ${({ $soldOut }) =>
    $soldOut ? "line-through" : "none"};
`;

const SoldOutBadge = styled.View`
  padding: 3px 7px;
  border-radius: 8px;
  background-color: ${colors.primary100};
`;

const SoldOutText = styled.Text`
  color: ${colors.errorRed};
  font-size: 10px;
  font-weight: 900;
`;

const MenuDescription = styled.Text`
  margin-top: 4px;
  color: ${colors.neutral600};
  font-size: 12px;
  font-weight: 600;
`;

const PriceGroup = styled.View`
  align-items: flex-end;
`;

const OriginalPrice = styled.Text`
  color: ${colors.neutral600};
  font-size: 12px;
  font-weight: 700;
  text-decoration-line: line-through;
`;

const CurrentPrice = styled.Text<{ $discounted: boolean }>`
  margin-top: 2px;
  color: ${({ $discounted }) =>
    $discounted ? colors.errorRed : colors.primary900};
  font-size: 17px;
  font-weight: 900;
`;
