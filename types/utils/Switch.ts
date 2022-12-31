import { ReactNode } from "react";

export interface SwitchTypes {
  icon: ReactNode;
  id: string;
  initial: boolean | undefined;
  label: ReactNode | string;
  onChangeHandler: (id: string) => void;
}
