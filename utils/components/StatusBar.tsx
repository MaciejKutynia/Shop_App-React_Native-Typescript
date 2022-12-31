import React, { useState } from "react";

import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../hooks/redux";

const HEIGHT = StatusBar.currentHeight;

const MyStatusBar = () => {
  const colors = useAppSelector((state) => state.Theme.colors);
  const theme = useAppSelector((state) => state.Theme.theme);
  return (
    <View style={[styles.statusBar, { backgroundColor: colors.primary }]}>
      <SafeAreaView>
        <StatusBar
          translucent
          backgroundColor={colors.primary}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: HEIGHT,
  },
});

export default MyStatusBar;
