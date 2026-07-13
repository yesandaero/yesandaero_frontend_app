import { colors } from "@/constants/color";
import type { ToastConfig } from "react-native-toast-message";
import styled from "styled-components/native";

export const toastConfig: ToastConfig = {
  success: ({ text1 }) => (
    <SuccessCard accessibilityRole="alert">
      <SuccessIcon>
        <SuccessIconText>✓</SuccessIconText>
      </SuccessIcon>
      <SuccessMessage selectable numberOfLines={2}>
        {text1}
      </SuccessMessage>
    </SuccessCard>
  ),
  error: ({ text1 }) => (
    <ErrorCard accessibilityRole="alert">
      <ErrorIcon>
        <ErrorIconText>!</ErrorIconText>
      </ErrorIcon>
      <ErrorMessage selectable numberOfLines={2}>
        {text1}
      </ErrorMessage>
    </ErrorCard>
  ),
};

const SuccessCard = styled.View`
  max-width: 82%;
  min-height: 46px;
  align-self: flex-end;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-right: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  background-color: ${colors.primary700};
  box-shadow: 0 8px 24px ${colors.primary300};
`;

const SuccessIcon = styled.View`
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background-color: ${colors.primary500};
`;

const SuccessIconText = styled.Text`
  color: ${colors.neutral0};
  font-size: 14px;
  font-weight: 900;
`;

const SuccessMessage = styled.Text`
  flex-shrink: 1;
  color: ${colors.neutral0};
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
`;

const ErrorCard = styled.View`
  max-width: 92%;
  min-height: 58px;
  align-self: flex-end;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-right: 16px;
  padding: 14px 18px;
  border-radius: 14px;
  background-color: ${colors.primary800};
  box-shadow: 0 8px 24px ${colors.primary300};
`;

const ErrorIcon = styled.View`
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background-color: ${colors.primary600};
`;

const ErrorIconText = styled.Text`
  color: ${colors.neutral0};
  font-size: 18px;
  font-weight: 800;
`;

const ErrorMessage = styled.Text`
  flex-shrink: 1;
  color: ${colors.neutral0};
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;
