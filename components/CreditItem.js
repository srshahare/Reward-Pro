import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";

const CreditItem = ({ item, setSelectedCredits, selectedCredits }) => {
  return (
    <TouchableOpacity
    onPress={() => setSelectedCredits(item)}
      style={[
        styles.container,
        selectedCredits === item ? styles.active : styles.inactive,
      ]}
    >
      <View style={styles.context}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-logo-google-playstore"
            size={28}
            color={colors.secondText}
          />
        </View>
        <Text
          style={[
            styles.text,
            selectedCredits === item ? styles.light : styles.text,
          ]}
        >
          {item} Cr
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    
    height: 120,
    width: 100,
  },
  context: {
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 16,
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
