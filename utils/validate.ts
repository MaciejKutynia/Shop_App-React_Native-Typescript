import { ValidationTypes } from "../types/utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default (value: string, props: ValidationTypes): boolean => {
  let isValid = true;
  if (props.required && value.trim().length === 0) {
    isValid = false;
  }
  if (props.email && !value.match(emailRegex)) {
    isValid = false;
  }
  if (props.min && +value < +props.min) {
    isValid = false;
  }
  if (props.max && +value >= +props.max) {
    isValid = false;
  }
  return isValid;
};
