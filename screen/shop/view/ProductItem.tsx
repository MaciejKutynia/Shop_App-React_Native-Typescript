import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../../hooks/redux";

import globalStyles from "../../../assets/styles/global";

//Types
import { ShopScreenProps } from "../../../types/navigation/Shop";
import { ProductItemType } from "../../../redux/ProductItem";
import { ThemeInterface } from "../../../assets/Colors";
import { activeOpacity } from "../../../utils";

const ProductItem: React.FC<ProductItemType & ShopScreenProps> = (
  props: any,
) => {
  const { item, navigation } = props;

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);
  const currency: string = useAppSelector((state) => state.Theme.currency);
  const currencyRatio: number = useAppSelector(
    (state) => state.Theme.currencyRatio,
  );
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={() => navigation.navigate("Product", { id: item.id })}>
      <View style={styles(colors).productContainer}>
        <Image style={styles(colors).image} source={item.variants[0].img} />
        <View>
          <View style={styles(colors).priceContainer}>
            <Text style={styles(colors).priceText}>
              {(item.variants[0].price * currencyRatio).toFixed(2)} {currency}
            </Text>
          </View>
          <View style={styles(colors).nameContainer}>
            <Text style={styles(colors).nameText}>{item.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    productContainer: {
      width: "80%",
      alignSelf: "center",
      marginVertical: 20,
      marginHorizontal: "5%",
      paddingVertical: 30,
      paddingHorizontal: "5%",
      backgroundColor: colors.whiteColor,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#efefef",
      elevation: 20,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: colors.productShadowColor,
      shadowOffset: {
        width: 5,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    image: {
      width: 80,
      height: 80,
      resizeMode: "contain",
      marginRight: 30,
    },
    nameText: {
      color: colors.textColor,
      fontWeight: "500",
    },
    priceText: {
      color: colors.textColor,
      fontWeight: "600",
    },
    nameContainer: {
      marginVertical: 10,
    },
    priceContainer: {
      marginVertical: 5,
    },
  });

export default ProductItem;
