interface ThemeTypes {
  theme: string;
  locale: string;
  colors: {
    [key: string]: string;
  };
  currency: string;
  currencyRatio: number;
  loading: boolean;
  messages: {
    [key: string]: string;
  };
}

export default ThemeTypes;
