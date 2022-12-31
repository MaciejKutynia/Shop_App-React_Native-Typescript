import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../screen/Home";
import {
  ShopNavigationInterface,
  ShopNavigationStackList,
} from "../../types/navigation/Shop";
import ProductScreen from "../../screen/shop/view/ProductScreen";

const ShopNavigator = createNativeStackNavigator<ShopNavigationStackList>();

const ShopNavigation: React.FC<ShopNavigationInterface> = (props) => {
  const { stackOptions } = props;
  return (
    <ShopNavigator.Navigator screenOptions={stackOptions}>
      <ShopNavigator.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <ShopNavigator.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerBackTitleVisible: false }}
      />
    </ShopNavigator.Navigator>
  );
};

export default ShopNavigation;
