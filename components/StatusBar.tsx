import React from "react";
import { StatusBar, SafeAreaView, View, StyleSheet } from "react-native";

const MyStatusBar: React.FC = (props) => {
  return (
    <View>
      <SafeAreaView>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="#fff"
        />
      </SafeAreaView>
    </View>
  );
};

export default MyStatusBar;
