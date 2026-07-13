import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type CouponScanModalProps = {
  visible: boolean;
  onCancel: () => void;
  onRecognize: () => void;
};

export function CouponScanModal({
  visible,
  onCancel,
  onRecognize,
}: CouponScanModalProps) {
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
        <ScannerSheet>
          <SimulationBadge>
            <SimulationText>SIMULATION MODE</SimulationText>
          </SimulationBadge>
          <Title>사장님 화면의 QR을 카메라로 비춰주세요</Title>

          <ScannerPreview accessibilityLabel="가상 QR 스캐너">
            <ScannerGlow />
            <QrSymbol>▦</QrSymbol>
            <ScanLine />
            <ScannerCaption>QR 영역을 네모 안에 맞춰주세요</ScannerCaption>
          </ScannerPreview>

          <RecognizeButton accessibilityRole="button" onPress={onRecognize}>
            <RecognizeButtonText>QR 인식하기 (시뮬레이션)</RecognizeButtonText>
          </RecognizeButton>
          <CancelButton accessibilityRole="button" onPress={onCancel}>
            <CancelButtonText>취소</CancelButtonText>
          </CancelButton>
        </ScannerSheet>
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

const ScannerSheet = styled.View`
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border-radius: 22px;
  background-color: ${colors.neutral0};
`;

const SimulationBadge = styled.View`
  align-self: center;
  padding: 5px 9px;
  border-radius: 10px;
  background-color: ${colors.primary100};
`;

const SimulationText = styled.Text`
  color: ${colors.primary800};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
`;

const Title = styled.Text`
  margin: 12px 0 18px;
  color: ${colors.neutral900};
  font-size: 18px;
  font-weight: 900;
  line-height: 25px;
  text-align: center;
`;

const ScannerPreview = styled.View`
  position: relative;
  height: 230px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-color: ${colors.primary500};
  border-radius: 20px;
  background-color: ${colors.neutral900};
`;

const ScannerGlow = styled.View`
  position: absolute;
  width: 150px;
  height: 150px;
  opacity: 0.22;
  border-radius: 75px;
  background-color: ${colors.primary400};
`;

const QrSymbol = styled.Text`
  color: ${colors.neutral0};
  font-size: 92px;
  font-weight: 300;
`;

const ScanLine = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
  top: 112px;
  height: 2px;
  background-color: ${colors.primary400};
`;

const ScannerCaption = styled.Text`
  position: absolute;
  bottom: 12px;
  color: ${colors.neutral300};
  font-size: 11px;
  font-weight: 700;
`;

const RecognizeButton = styled.Pressable`
  min-height: 48px;
  margin-top: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${colors.primary700};
`;

const RecognizeButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 14px;
  font-weight: 900;
`;

const CancelButton = styled.Pressable`
  min-height: 44px;
  margin-top: 8px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.neutral300};
  border-radius: 14px;
`;

const CancelButtonText = styled.Text`
  color: ${colors.neutral700};
  font-size: 14px;
  font-weight: 800;
`;
