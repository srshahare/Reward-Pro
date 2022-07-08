import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";

const TxItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-logo-google-playstore"
            size={18}
            color={colors.secondText}
          />
        </View>
        <View>
          <Text style={styles.text}>Purchased from Play Store</Text>
          <Text style={styles.secondText}>Sat, 25 Jun - 1:50pm</Text>
          <Text style={styles.secondText}>Processing</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Rs 400</Text>
        <Text style={[styles.secondText, {color: colors.dark, fontWeight: 'bold'}]}>Google Pay</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 0,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginHorizontal: 16
  },
  context: {
    flexDirection: "row",
    alignItems: 'flex-start'
  },
  text: {
    color: colors.dark,
  },
  secondText: {
    color: colors.secondText,
    fontSize: 12,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: colors.darkGrey,
    padding: 8,
    borderRadius: 2,
    borderBottomRightRadius: 16,
    marginRight: 8,
    marginTop: 4
  },
  title: {
      fontSize: 16,
      fontWeight: "bold",
  }
});

export default TxItem;
