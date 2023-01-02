export interface ThemeInterface {
  primary?: string;
  secondary?: string;
  backgroundColor?: string;
  productShadowColor?: string;
  layerColor?: string;
  cardBackground?: string;
  gray?: string;
  whiteColor?: string;
  textColor?: string;
  rejectColor?: string;
  acceptColor?: string;
  redColor?: string;
  orangeColor?: string;
}

export interface ColorsType {
  dark: ThemeInterface;
  light: ThemeInterface;
}

const common: ThemeInterface = {
  whiteColor: "#fff",
  textColor: "#121212",
  rejectColor: "#e30202",
  acceptColor: "#08e800",
  redColor: "#FF0000",
  orangeColor: "#fd8f00",
};

const dark: ThemeInterface = {
  primary: "#121212",
  secondary: "#ffffff",
  backgroundColor: "#151515",
  productShadowColor: "rgba(255,255,255,0.5)",
  layerColor: "rgba(255,255,255,0.8)",
  cardBackground: "#343434",
  gray: "#888888",
  ...common,
};

const light: ThemeInterface = {
  primary: "#ffffff",
  backgroundColor: "#f9f9f9",
  secondary: "#121212",
  productShadowColor: "rgba(0,0,0,0.5)",
  layerColor: "rgba(0,0,0,0.8)",
  cardBackground: "#dddddd",
  gray: "#777777",
  ...common,
};

const Colors: ColorsType = {
  dark,
  light,
};

export function getColors<T extends object, U extends keyof T>(
  Colors: T,
  theme: U,
) {
  return Colors[theme];
}

export default Colors;
