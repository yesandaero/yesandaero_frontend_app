import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type StoreSummaryProps = {
  distance: string;
};

export function StoreSummary({ distance }: StoreSummaryProps) {
  return (
    <Summary>
      <BadgeRow>
        <StatusBadge>
          <StatusText>● 지금 영업중</StatusText>
        </StatusBadge>
        <InfoBadge>
          <InfoText>{distance}</InfoText>
        </InfoBadge>
        <DiscountBadge>
          <DiscountText>🏷️ 할인 진행중</DiscountText>
        </DiscountBadge>
        <InfoBadge>
          <InfoText>혼밥 가능</InfoText>
        </InfoBadge>
        <InfoBadge>
          <InfoText>단체 가능</InfoText>
        </InfoBadge>
      </BadgeRow>

      <DiscountBanner>
        <DiscountBannerText>🏷️ 전체 메뉴 10% 할인</DiscountBannerText>
      </DiscountBanner>

      <BenefitRow>
        <BenefitBadge>
          <BenefitText>🎓 학생 할인</BenefitText>
        </BenefitBadge>
        <BenefitBadge>
          <BenefitText>🎟️ 쿠폰 사용 가능</BenefitText>
        </BenefitBadge>
      </BenefitRow>
    </Summary>
  );
}

const Summary = styled.View`
  gap: 14px;
  padding: 18px 18px 8px;
`;

const BadgeRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StatusBadge = styled.View`
  padding: 10px 12px;
  border-radius: 18px;
  background-color: ${colors.primary100};
`;

const StatusText = styled.Text`
  color: ${colors.successGreen};
  font-size: 13px;
  font-weight: 900;
`;

const InfoBadge = styled.View`
  padding: 10px 12px;
  border-radius: 18px;
  background-color: ${colors.primary100};
`;

const InfoText = styled.Text`
  color: ${colors.primary900};
  font-size: 13px;
  font-weight: 800;
`;

const DiscountBadge = styled.View`
  padding: 10px 12px;
  border-radius: 18px;
  background-color: ${colors.primary50};
`;

const DiscountText = styled.Text`
  color: ${colors.errorRed};
  font-size: 13px;
  font-weight: 900;
`;

const DiscountBanner = styled.View`
  min-height: 62px;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
  background-color: ${colors.primary300};
`;

const DiscountBannerText = styled.Text`
  color: ${colors.primary900};
  font-size: 16px;
  font-weight: 900;
`;

const BenefitRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const BenefitBadge = styled.View`
  padding: 8px 11px;
  border-radius: 12px;
  background-color: ${colors.primary100};
`;

const BenefitText = styled.Text`
  color: ${colors.primary900};
  font-size: 12px;
  font-weight: 800;
`;
