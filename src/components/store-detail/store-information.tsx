import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type StoreInformationProps = {
  distance: string;
  address: string;
  openingHours: string;
  minimumOrder: string;
  rating: string;
};

export function StoreInformation({
  distance,
  address,
  openingHours,
  minimumOrder,
  rating,
}: StoreInformationProps) {
  const information = [
    ["거리", distance],
    ["주소", address],
    ["영업시간", openingHours],
    ["최소주문", minimumOrder],
    ["평점", rating],
  ];

  return (
    <Section>
      <SectionTitle>가게 정보</SectionTitle>
      <InformationList>
        {information.map(([label, value]) => (
          <InformationRow key={label}>
            <InformationLabel selectable>{label}</InformationLabel>
            <InformationValue selectable>{value}</InformationValue>
          </InformationRow>
        ))}
      </InformationList>
    </Section>
  );
}

const Section = styled.View`
  gap: 12px;
  padding: 30px 18px 0;
`;

const SectionTitle = styled.Text`
  color: ${colors.primary900};
  font-size: 20px;
  font-weight: 900;
`;

const InformationList = styled.View``;

const InformationRow = styled.View`
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary200};
`;

const InformationLabel = styled.Text`
  width: 88px;
  color: ${colors.neutral600};
  font-size: 14px;
  font-weight: 800;
`;

const InformationValue = styled.Text`
  flex: 1;
  color: ${colors.neutral900};
  font-size: 14px;
  font-weight: 600;
`;
