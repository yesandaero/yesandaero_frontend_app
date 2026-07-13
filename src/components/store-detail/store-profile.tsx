import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type StoreProfileProps = {
  address: string;
  description: string;
  phone: string;
};

export function StoreProfile({
  address,
  description,
  phone,
}: StoreProfileProps) {
  return (
    <Section>
      <SectionTitle>가게 정보</SectionTitle>
      <InformationCard>
        <InformationRow>
          <Label>소개</Label>
          <Value selectable>{description}</Value>
        </InformationRow>
        <InformationRow>
          <Label>주소</Label>
          <Value selectable>{address}</Value>
        </InformationRow>
        <InformationRow>
          <Label>전화번호</Label>
          <Value selectable>{phone}</Value>
        </InformationRow>
      </InformationCard>
    </Section>
  );
}

const Section = styled.View`
  gap: 12px;
  padding: 24px 18px 0;
`;

const SectionTitle = styled.Text`
  color: ${colors.primary900};
  font-size: 20px;
  font-weight: 900;
`;

const InformationCard = styled.View`
  overflow: hidden;
  border-width: 1px;
  border-color: ${colors.primary200};
  border-radius: 16px;
  background-color: ${colors.neutral0};
`;

const InformationRow = styled.View`
  min-height: 56px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary100};
`;

const Label = styled.Text`
  width: 62px;
  color: ${colors.neutral600};
  font-size: 14px;
  font-weight: 700;
`;

const Value = styled.Text`
  flex: 1;
  color: ${colors.neutral900};
  font-size: 15px;
  font-weight: 700;
`;
