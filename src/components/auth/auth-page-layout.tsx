import type { PropsWithChildren, ReactNode } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import styled from "styled-components/native";

import { colors } from "@/constants/color";
import { screenLayout } from "@/constants/layout";

interface AuthPageLayoutProps extends PropsWithChildren {
  title: ReactNode;
  footer: ReactNode;
}

export default function AuthPageLayout({
  title,
  footer,
  children,
}: AuthPageLayoutProps) {
  return (
    <KeyboardAvoidingView
      behavior={process.env.EXPO_OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: colors.neutral0 }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Title>{title}</Title>
          <Content>{children}</Content>
          <Footer>{footer}</Footer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Container = styled.View`
  width: 100%;
  max-width: ${screenLayout.authContentMaxWidth}px;
  min-height: 100%;
  flex: 1;
  align-self: center;
  padding: ${screenLayout.topPadding}px ${screenLayout.horizontalPadding}px
    ${screenLayout.bottomPadding}px;
`;

const Title = styled.View`
  min-height: 76px;
  justify-content: flex-start;
  margin-bottom: 24px;
`;

const Content = styled.View`
  width: 100%;
`;

const Footer = styled.View`
  width: 100%;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding: 24px 0 32px;
`;
