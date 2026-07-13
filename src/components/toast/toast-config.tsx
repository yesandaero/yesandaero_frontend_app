import { colors } from "@/constants/color";
import type { ToastConfig } from "react-native-toast-message";
import styled from "styled-components/native";

export const toastConfig: ToastConfig = {
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
  box-shadow: 0 8px 24px rgba(156, 28, 28, 0.28);
`;

const ErrorIcon = styled.View`
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background-color: rgba(255, 255, 255, 0.18);
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
