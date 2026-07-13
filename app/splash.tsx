import { Image } from "expo-image";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { colors } from "@/constants/color";

const SPLASH_DURATION_MS = 2000;

export default function Splash() {
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       router.replace("/Login");
  //     }, SPLASH_DURATION_MS);

  //     return () => clearTimeout(timer);
  //   }, []);

  return (
    <SplashScroll
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <Title>예산대로</Title>
      <Logo
        accessibilityLabel="예산대로 로고"
        source={require("../src/assets/Logo/logo.png")}
        transition={150}
      />
    </SplashScroll>
  );
}

const SplashScroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})`
  flex: 1;
  background-color: ${colors.neutral0};
`;

const Title = styled.Text`
  font-size: 25px;
  color: ${colors.primary800};
  font-weight: 800;
`;

const Logo = styled(Image)`
  width: 60%;
  aspect-ratio: 1;
`;
