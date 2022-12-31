import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAppSelector } from "../hooks/redux";

import AppTabNavigation from "./AppTabNavigation";

const AppNavigator: React.FC = () => {
  const token = useAppSelector((state) => state.Auth.token);
  return (
    <NavigationContainer>
      <AppTabNavigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
