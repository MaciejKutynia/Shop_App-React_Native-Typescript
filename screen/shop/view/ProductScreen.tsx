import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge } from "react-native-paper";
import { useAppSelector } from "../../../hooks/redux";
import { useIntl } from "react-intl";

import { ThemeInterface } from "../../../assets/Colors";

import PRODUCTS from "../../../assets/dummy-data/PRODUCTS";
import { ProductType } from "../../../assets/dummy-data/Product_Model";
import globalStyles from "../../../assets/styles/global";
import { activeOpacity } from "../../../utils";

const ProductScreen = (props: any) => {
  const { formatMessage } = useIntl();
  const { navigation, route } = props;
  const { id } = route.params;

  const [selectedProduct, _] = useState<ProductType | undefined>(
    PRODUCTS.find((product) => product.id === id),
  );
  const [variant, setVariant] = useState(0);

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);
  const currency: string = useAppSelector((state) => state.Theme.currency);
  const currencyRatio: number = useAppSelector(
    (state) => state.Theme.currencyRatio,
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedProduct?.name,
    });
  }, [selectedProduct]);

  return (
    <View
      style={[globalStyles(colors).screen, { justifyContent: "flex-start" }]}>
      <ScrollView style={{ paddingBottom: 50 }}>
        <Image
          style={styles(colors).image}
          source={selectedProduct?.variants[variant]?.img}
        />
        <View style={styles(colors).colorPicker}>
          {selectedProduct?.variants?.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={activeOpacity}
              style={styles(colors).badge}
              onPress={() => setVariant(index)}>
              <View>
                <Badge
                  style={{
                    backgroundColor: item.color,
                    borderRadius: 0,
                    marginBottom: 5,
                  }}
                  size={40}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles(colors).descContainer}>
          <Text style={styles(colors).descLabel}>
            {formatMessage({ id: "Price:", defaultMessage: "Cena:" })}
          </Text>
          <View style={styles(colors).descTextContainer}>
            <Text style={styles(colors).priceText}>
              {(
                selectedProduct?.variants[variant]?.price * currencyRatio
              ).toFixed(2)}{" "}
              {currency}
            </Text>
          </View>
        </View>
        <View style={styles(colors).descContainer}>
          <Text style={styles(colors).descLabel}>
            {formatMessage({ id: "Description:", defaultMessage: "Opis:" })}
          </Text>
          <View style={styles(colors).descTextContainer}>
            <Text style={styles(colors).descText}>
              {selectedProduct?.variants[variant].description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={cartBar(colors).cartActionsContainer}>
        {/* TODO: Add onPress handler */}
        <Pressable style={cartBar(colors).button}>
          <Text style={cartBar(colors).buttonText}>
            {formatMessage({
              id: "Add to cart",
              defaultMessage: "Dodaj do koszyka",
            })}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    image: {
      marginTop: 20,
      marginBottom: 20,
      width: 300,
      height: 300,
      alignSelf: "center",
      resizeMode: "contain",
    },
    colorPicker: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    badge: {
      marginHorizontal: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    descContainer: {
      margin: 10,
      marginTop: 30,
      width: "90%",
      alignSelf: "center",
    },
    descLabel: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
    },
    descTextContainer: {
      marginTop: 15,
    },
    descText: {
      fontSize: 16,
    },
    priceText: {
      fontSize: 16,
      textAlign: "center",
    },
  });

const cartBar = (colors: ThemeInterface) =>
  StyleSheet.create({
    cartActionsContainer: {
      width: "100%",
      height: 70,
      backgroundColor: colors.primary,
      position: "absolute",
      bottom: 0,
      left: 0,
      justifyContent: "center",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.secondary,
    },
    button: {
      backgroundColor: colors.secondary,
      height: "70%",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 15,
    },
    buttonText: {
      color: colors.primary,
      fontWeight: "700",
    },
  });

export default ProductScreen;
