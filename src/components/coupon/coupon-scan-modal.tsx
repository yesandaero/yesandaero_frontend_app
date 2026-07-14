import {
  CameraView,
  type BarcodeScanningResult,
  useCameraPermissions,
} from "expo-camera";
import React, { useRef } from "react";
import { Modal } from "react-native";
import Toast from "react-native-toast-message";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type CouponScanModalProps = {
  visible: boolean;
  isRegistering: boolean;
  onCancel: () => void;
  onRecognize: (token: string) => void;
};

const extractCouponToken = (qrData: string) => {
  const value = qrData.trim();
  if (!value) return null;

  if (!value.startsWith("couponapp://register")) {
    return value.includes("://") ? null : value;
  }

  const tokenMatch = value.match(/[?&]token=([^&#]+)/);
  if (!tokenMatch?.[1]) return null;

  try {
    return decodeURIComponent(tokenMatch[1]).trim() || null;
  } catch {
    return null;
  }
};

export function CouponScanModal({
  visible,
  isRegistering,
  onCancel,
  onRecognize,
}: CouponScanModalProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const scanLockRef = useRef(false);

  const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    const token = extractCouponToken(data);

    if (isRegistering || scanLockRef.current) return;

    if (!token) {
      scanLockRef.current = true;
      Toast.show({
        type: "error",
        text1: "쿠폰 등록용 QR이 아닙니다.",
      });
      return;
    }

    scanLockRef.current = true;
    onRecognize(token);
  };

  const handleCameraError = () => {
    Toast.show({
      type: "error",
      text1: "카메라를 실행하지 못했습니다.",
    });
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={isRegistering ? undefined : onCancel}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <ModalRoot>
        <DimLayer />
        <ScannerSheet>
          <Title selectable>사장님 화면의 QR을 카메라로 비춰주세요</Title>

          <ScannerPreview accessibilityLabel="쿠폰 QR 스캐너">
            {visible && permission?.granted ? (
              <CameraPreview
                active={visible}
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                facing="back"
                onBarcodeScanned={
                  isRegistering ? undefined : handleBarcodeScanned
                }
                onMountError={handleCameraError}
              />
            ) : (
              <PermissionState>
                <PermissionTitle selectable>
                  {permission
                    ? "카메라 권한이 필요합니다"
                    : "카메라 권한을 확인하고 있어요"}
                </PermissionTitle>
                {permission?.canAskAgain ? (
                  <PermissionButton
                    accessibilityRole="button"
                    onPress={requestPermission}
                  >
                    <PermissionButtonText>카메라 권한 허용</PermissionButtonText>
                  </PermissionButton>
                ) : permission ? (
                  <PermissionDescription selectable>
                    기기 설정에서 카메라 권한을 허용해 주세요.
                  </PermissionDescription>
                ) : null}
              </PermissionState>
            )}

            <ScanFrame pointerEvents="none" />
            <ScannerCaption selectable>
              QR 영역을 네모 안에 맞춰주세요
            </ScannerCaption>

            {isRegistering && (
              <RegistrationOverlay accessibilityRole="progressbar">
                <RegistrationText selectable>쿠폰 등록 중...</RegistrationText>
              </RegistrationOverlay>
            )}
          </ScannerPreview>

          <CancelButton
            accessibilityRole="button"
            disabled={isRegistering}
            onPress={onCancel}
            $disabled={isRegistering}
          >
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
  height: 300px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-color: ${colors.primary500};
  border-radius: 20px;
  background-color: ${colors.neutral900};
`;

const CameraPreview = styled(CameraView)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ScanFrame = styled.View`
  position: absolute;
  width: 190px;
  height: 190px;
  border-width: 3px;
  border-color: ${colors.primary400};
  border-radius: 18px;
`;

const ScannerCaption = styled.Text`
  position: absolute;
  bottom: 14px;
  color: ${colors.neutral0};
  font-size: 12px;
  font-weight: 800;
`;

const PermissionState = styled.View`
  align-items: center;
  gap: 14px;
  padding: 24px;
`;

const PermissionTitle = styled.Text`
  color: ${colors.neutral0};
  font-size: 15px;
  font-weight: 800;
  text-align: center;
`;

const PermissionDescription = styled.Text`
  color: ${colors.neutral300};
  font-size: 13px;
  font-weight: 600;
  line-height: 19px;
  text-align: center;
`;

const PermissionButton = styled.Pressable`
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 12px;
  background-color: ${colors.primary700};
`;

const PermissionButtonText = styled.Text`
  color: ${colors.neutral0};
  font-size: 14px;
  font-weight: 800;
`;

const RegistrationOverlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.66);
`;

const RegistrationText = styled.Text`
  color: ${colors.neutral0};
  font-size: 17px;
  font-weight: 900;
`;

const CancelButton = styled.Pressable<{ $disabled: boolean }>`
  min-height: 44px;
  margin-top: 12px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.neutral300};
  border-radius: 14px;
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
`;

const CancelButtonText = styled.Text`
  color: ${colors.neutral700};
  font-size: 14px;
  font-weight: 800;
`;
