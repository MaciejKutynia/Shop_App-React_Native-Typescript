import React from "react";
import { Pressable, Text, View } from "react-native";

import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import DashboardScreen from "../../screen/dashboard";

const DashboardNavigator = createDrawerNavigator();

const DashboardNavigation = (props: any) => {
  return (
    <DashboardNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View>
            <DrawerItemList {...props} />
            <Pressable onPress={() => console.log("logout")}>
              <Text>Test</Text>
            </Pressable>
          </View>
        );
      }}>
      <DashboardNavigator.Screen name="Test" component={DashboardScreen} />
    </DashboardNavigator.Navigator>
  );
};

export default DashboardNavigation;
