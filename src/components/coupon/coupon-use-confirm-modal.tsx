import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type CouponUseConfirmModalProps = {
  isConfirming?: boolean;
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function CouponUseConfirmModal({
  isConfirming = false,
  visible,
  onCancel,
  onConfirm,
}: CouponUseConfirmModalProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <ModalRoot>
        <DimLayer />
        <ConfirmCard accessibilityRole="alert">
          <Title selectable>정말 사용하시겠습니까?</Title>
          <Description>사용된 쿠폰은 쿠폰함에서 삭제됩니다</Description>

          <ButtonRow>
            <CancelButton
              accessibilityRole="button"
              disabled={isConfirming}
              onPress={onCancel}
            >
              <CancelButtonText>아니요</CancelButtonText>
            </CancelButton>
            <ConfirmButton
              accessibilityRole="button"
              disabled={isConfirming}
              onPress={onConfirm}
            >
              <ConfirmButtonText>
                {isConfirming ? "처리 중..." : "예"}
              </ConfirmButtonText>
            </ConfirmButton>
          </ButtonRow>
        </ConfirmCard>
      </ModalRoot>
    </Modal>
  );
}

const Description = styled.Text`
  margin-top: 8px;
  color: gray;
  text-align: center;
`;

const ModalRoot = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const DimLayer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.55;
  background-color: ${colors.neutral1000};
`;

const ConfirmCard = styled.View`
  width: 100%;
  max-width: 320px;
  padding: 22px 20px 18px;
  border-radius: 18px;
  background-color: ${colors.neutral0};
`;

const Title = styled.Text`
  color: ${colors.neutral900};
  font-size: 18px;
  font-weight: 800;
  text-align: center;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-top: 22px;
`;

const CancelButton = styled.Pressable`
  flex: 1;
  min-height: 35px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.neutral300};
  border-radius: 12px;
  background-color: ${colors.neutral0};
`;

const CancelButtonText = styled.Text`
  color: ${colors.neutral700};
  font-size: 15px;
  font-weight: 800;
`;

const ConfirmButton = styled.Pressable`
  flex: 1;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${colors.primary700};
`;

const ConfirmButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 15px;
  font-weight: 800;
`;
