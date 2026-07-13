import { Href, Link } from "expo-router";
import React from "react";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

type SettingsOptionCardProps = {
  description: string;
  href: Href;
  icon: string;
  title: string;
};

export function SettingsOptionCard({
  description,
  href,
  icon,
  title,
}: SettingsOptionCardProps) {
  return (
    <Link href={href} asChild>
      <Card accessibilityLabel={title}>
        <Icon>{icon}</Icon>
        <TextGroup>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextGroup>
        <Chevron>›</Chevron>
      </Card>
    </Link>
  );
}

const Card = styled.Pressable`
  min-height: 100px;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-width: 1px;
  border-color: ${colors.primary200};
  border-radius: 18px;
  background-color: ${colors.neutral0};
`;

const Icon = styled.Text`
  width: 42px;
  font-size: 30px;
  text-align: center;
`;

const TextGroup = styled.View`
  flex: 1;
  gap: 5px;
`;

const Title = styled.Text`
  color: ${colors.neutral900};
  font-size: 17px;
  font-weight: 900;
`;

const Description = styled.Text`
  color: ${colors.neutral600};
  font-size: 13px;
  font-weight: 600;
  line-height: 19px;
`;

const Chevron = styled.Text`
  color: ${colors.primary800};
  font-size: 30px;
  line-height: 32px;
`;
