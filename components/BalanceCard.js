import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";

import colors from "../styles/colors";

const BalanceCard = () => {
  return (
    <View style={[styles.container, Platform.OS === "android" ?styles.containerA : styles.containerB]}>
      <View style={styles.context}>
        <Text style={styles.contextText}>Total Balance</Text>
        <Text style={styles.title}>400 Credits</Text>
        <Button
          title="Add Credits"
          radius={50}
          icon={<Ionicons name="add" size={20} color={colors.light} />}
          containerStyle={{width: 150}}
          color={colors.primary}
        />
      </View>
      <View style={styles.bottomBox}>
      <Text style={styles.text}>Check all you balances here </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 20,
    height: 220,
    padding: 8,
  },
  context: {
    padding: 16,
    backgroundColor: colors.primaryBack,
    height: "70%",
    borderRadius: 20,
    alignItems: "center",
  },
  containerA: {
    elevation: 8,
  },
  containerB: {
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 4,
    shadowOpacity: 1.0
  },
  bottomBox: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextText: {
    color: colors.secondText,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    marginVertical: 8,
    color: colors.primaryDark,
  },
  text: {
      color: colors.dark,
      fontWeight: 'bold'
  }
});

export default BalanceCard;
