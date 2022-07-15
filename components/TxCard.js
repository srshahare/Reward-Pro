import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import colors from "../styles/colors";
import TxItem from "./TxItem";

const TxCard = ({list}) => {
  return (
    <View
      style={[
        styles.container,
        Platform.OS === "android" ? styles.containerA : styles.containerB,
      ]}
    >
      <Text style={styles.secondText}>Recent Transactions</Text>
      <View style={styles.list}>
      {list.map(item => (
        <TxItem key={item.id} item={item} />
      ))}
      </View>
      <View>
        {/* <Text style={styles.primaryText}>See all {">"} </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
    padding: 16,
    borderRadius: 16,
  },
  list: {
    marginHorizontal: -16
  },
  containerA: {
    elevation: 8,
  },
  containerB: {
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
  },
  secondText: {
    fontSize: 16,
    color: colors.secondText,
  },
  primaryText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default TxCard;
