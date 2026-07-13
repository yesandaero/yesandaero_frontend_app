import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import { locationColors } from "./location-theme";

type LocationConfirmCardProps = {
  address: string;
  draftAddress: string;
  isEditing: boolean;
  isLoading: boolean;
  onCancelEditing: () => void;
  onConfirm: () => void;
  onDraftAddressChange: (address: string) => void;
  onStartEditing: () => void;
};

export function LocationConfirmCard({
  address,
  draftAddress,
  isEditing,
  isLoading,
  onCancelEditing,
  onConfirm,
  onDraftAddressChange,
  onStartEditing,
}: LocationConfirmCardProps) {
  const isConfirmDisabled = isLoading || (isEditing && !draftAddress.trim());

  return (
    <Card>
      <Label>{isEditing ? "도로명 주소" : "현재 위치"}</Label>

      {isEditing ? (
        <AddressInput
          autoFocus
          accessibilityLabel="도로명 주소 입력"
          onChangeText={onDraftAddressChange}
          onSubmitEditing={onConfirm}
          placeholder="예: 대학로 99"
          placeholderTextColor="#AA9C7A"
          returnKeyType="done"
          value={draftAddress}
        />
      ) : (
        <Address selectable>{address}</Address>
      )}

      <ButtonRow>
        <ConfirmButton
          accessibilityRole="button"
          disabled={isConfirmDisabled}
          onPress={onConfirm}
          $disabled={isConfirmDisabled}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ConfirmButtonText>
              {isEditing ? "주소 검색" : "현재 위치 새로고침"}
            </ConfirmButtonText>
          )}
        </ConfirmButton>

        <ManualButton
          accessibilityRole="button"
          onPress={isEditing ? onCancelEditing : onStartEditing}
        >
          <ManualButtonText>
            {isEditing ? "취소" : "도로명 주소 검색"}
          </ManualButtonText>
        </ManualButton>
      </ButtonRow>
    </Card>
  );
}

const Card = styled.View`
  min-height: 140px;
  padding: 17px 18px 16px;
  border-radius: 20px;
  background-color: ${locationColors.card};
  box-shadow: 0 12px 28px rgba(100, 70, 12, 0.13);
`;

const Label = styled.Text`
  color: ${locationColors.muted};
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 1px;
`;

const Address = styled.Text`
  margin-top: 4px;
  color: ${locationColors.goldDark};
  font-size: 19px;
  font-weight: 800;
  line-height: 25px;
  letter-spacing: -0.5px;
`;

const AddressInput = styled.TextInput`
  height: 40px;
  margin-top: 5px;
  padding: 0 12px;
  border: 1px solid ${locationColors.outline};
  border-radius: 12px;
  color: ${locationColors.text};
  background-color: #fffdf8;
  font-size: 15px;
  font-weight: 600;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 13px;
`;

const ConfirmButton = styled.Pressable<{ $disabled: boolean }>`
  flex: 1;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-radius: 24px;
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  background-color: ${locationColors.gold};
`;

const ConfirmButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  line-height: 19px;
  text-align: center;
`;

const ManualButton = styled.Pressable`
  flex: 1;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border: 2px solid ${locationColors.outline};
  border-radius: 24px;
  background-color: #ffffff;
`;

const ManualButtonText = styled.Text`
  color: ${locationColors.muted};
  font-size: 14px;
  font-weight: 800;
  line-height: 19px;
  text-align: center;
`;
