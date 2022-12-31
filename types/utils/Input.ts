import { TextInputProps } from "react-native";

export interface InputTypes extends TextInputProps {
  label: string;
  id: string;
  style?: object;
  errorText?: string;
  getData: (value: string, id: string, isValid: boolean) => void;
  required?: boolean;
  email?: boolean;
}

export interface ReducerTypes {
  value: string;
  isValid: boolean;
  touched: boolean;
}
