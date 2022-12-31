interface AuthTypes {
  token: string;
  userID: number | string;
  isAL: boolean;
  registerSuccess: boolean;
  allowBiometric: boolean;
  askBiometric: boolean;
  enableNotifications: boolean;
}

export default AuthTypes;
