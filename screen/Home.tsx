import React from "react";
import { useAppSelector } from "../hooks/redux";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import globalStyles from "../assets/styles/global";

import ProductItem from "./shop/view/ProductItem";

//Types
import { ShopScreenProps } from "../types/navigation/Shop";
import { ThemeInterface } from "../assets/Colors";

import PRODUCTS from "../assets/dummy-data/PRODUCTS";

const Home: React.FC<ShopScreenProps> = (props) => {
  const { navigation, route } = props;

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  return (
    <View style={globalStyles(colors).screen}>
      <FlatList
        style={{ width: "100%" }}
        renderItem={(item) => (
          <ProductItem item={item.item} navigation={navigation} route={route} />
        )}
        data={PRODUCTS}
        keyExtractor={(item) => item?.id?.toString()}></FlatList>
    </View>
  );
};

export default Home;
