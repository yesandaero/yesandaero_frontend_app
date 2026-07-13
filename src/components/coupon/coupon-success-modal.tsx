import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type CouponSuccessModalProps = {
  visible: boolean;
  onConfirm: () => void;
};

export function CouponSuccessModal({
  visible,
  onConfirm,
}: CouponSuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onConfirm}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <ModalRoot>
        <DimLayer />
        <SuccessCard accessibilityRole="alert">
          <Title>이모네 국밥 QR 인식 완료!</Title>
          <Description>
            다른 식당에서 바로 쓸 수 있는 쿠폰이 발급됐어요.
          </Description>

          <CouponPreview>
            <PreviewTitle>아메리카노 무료 쿠폰</PreviewTitle>
            <PreviewStore>사용처 · 스덕컴 카페</PreviewStore>
          </CouponPreview>

          <ConfirmButton accessibilityRole="button" onPress={onConfirm}>
            <ConfirmButtonText>확인</ConfirmButtonText>
          </ConfirmButton>
        </SuccessCard>
      </ModalRoot>
    </Modal>
  );
}

const ModalRoot = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 22px;
`;

const DimLayer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.68;
  background-color: ${colors.neutral1000};
`;

const SuccessCard = styled.View`
  width: 100%;
  max-width: 400px;
  align-items: center;
  padding: 26px 22px 22px;
  border-radius: 22px;
  background-color: ${colors.neutral0};
`;

const Title = styled.Text`
  margin-top: 10px;
  color: ${colors.primary900};
  font-size: 19px;
  font-weight: 900;
  text-align: center;
`;

const Description = styled.Text`
  margin-top: 6px;
  color: ${colors.neutral600};
  font-size: 13px;
  font-weight: 600;
  line-height: 19px;
  text-align: center;
`;

const CouponPreview = styled.View`
  width: 100%;
  margin-top: 18px;
  padding: 16px;
  border-width: 1px;
  border-color: ${colors.primary200};
  border-radius: 16px;
  background-color: ${colors.primary100};
`;

const PreviewTitle = styled.Text`
  margin-top: 4px;
  color: ${colors.primary900};
  font-size: 18px;
  font-weight: 900;
`;

const PreviewStore = styled.Text`
  margin-top: 5px;
  color: ${colors.neutral700};
  font-size: 12px;
  font-weight: 600;
`;

const ConfirmButton = styled.Pressable`
  width: 100%;
  min-height: 48px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${colors.primary700};
`;

const ConfirmButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 15px;
  font-weight: 900;
`;
