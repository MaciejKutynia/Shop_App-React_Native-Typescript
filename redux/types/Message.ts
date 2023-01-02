import { ReactNode } from "react";

export interface MessageTypes {
  shown: boolean;
  message: ReactNode | string;
  isError: boolean;
  isWarning: boolean;
  okText: ReactNode | string;
  cancelText: ReactNode | string;
  okButtonHandler: null | Function;
  cancelButtonHandler: null | Function;
  isHideByTimer: boolean;
  timer: number;
}
