import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";

const CreditItem = ({ item }) => {
  return (
    <View
      style={[styles.container, item.enable ? styles.active : styles.inactive]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="ios-logo-google-playstore"
          size={28}
          color={colors.secondText}
        />
      </View>
      <Text style={[styles.text, item.enable ? styles.light : styles.text]}>{item.credits} Cr</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.darkGrey,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 100,
  },
  active: {
    backgroundColor: colors.secondary,
  },
  inactive: {
    backgroundColor: colors.darkGrey,
  },
  light: {
    color: colors.light,
  },
  text: {
    color: colors.text,
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16
  },
  iconContainer: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: colors.secondaryBack,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreditItem;
