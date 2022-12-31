import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login, { loginOptions } from "../../screen/auth/Login";
import Register from "../../screen/auth/Register";
import {
  AuthNavigationInterface,
  AuthNavigationStackList,
} from "../../types/navigation/Auth";

const AuthNavigator = createNativeStackNavigator<AuthNavigationStackList>();

const AuthNavigation: React.FC<AuthNavigationInterface> = (props) => {
  const { stackOptions } = props;
  return (
    <AuthNavigator.Navigator screenOptions={stackOptions}>
      <AuthNavigator.Screen
        name="Login"
        options={loginOptions}
        component={Login}
      />
      <AuthNavigator.Screen name="Register" component={Register} />
    </AuthNavigator.Navigator>
  );
};

export default AuthNavigation;
