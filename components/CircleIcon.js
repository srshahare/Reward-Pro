import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";

const CircleIcon = ({ icon, name }) => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={24} color={colors.secondText} />
      </View>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
  },
  text: {
    marginTop: 4,
    color: colors.secondText
  },
  circle: {
    borderRadius: 50,
    backgroundColor: colors.secondaryBack,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CircleIcon;
