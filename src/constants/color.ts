export const colors = {
  primary50: "#FFF5F5",
  primary100: "#FFE3E3",
  primary200: "#FFC9C9",
  primary300: "#FFA8A8",
  primary400: "#FF8787",
  primary500: "#FA5252",
  primary600: "#E64980",
  primary700: "#E03131",
  primary800: "#C92A2A",
  primary900: "#9C1C1C",

  neutral0: "#FFFFFF",
  neutral50: "#F8F9FA",
  neutral100: "#F1F3F5",
  neutral200: "#E9ECEF",
  neutral300: "#DEE2E6",
  neutral400: "#CED4DA",
  neutral500: "#ADB5BD",
  neutral600: "#868E96",
  neutral700: "#495057",
  neutral800: "#343A40",
  neutral900: "#212529",
  neutral1000: "#000000",

  successGreen: "#2E7D52",
  warningAmber: "#F59E0B",
  errorRed: "#DC2626",
  infoBlue: "#FF8787",
} as const;

export type ColorsType = typeof colors;
