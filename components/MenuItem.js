import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";

const MenuItem = ({name, icon}) => {
  return (
    <View style={{ borderRadius: 8, overflow: "hidden" }}>
      <TouchableNativeFeedback>
        <View style={styles.container}>
          <View style={styles.flex}>
            <Ionicons name={icon} size={18} />
            <Text style={styles.text}>{name}</Text>
          </View>
          <Ionicons name="caret-forward" size={18} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.primaryBack,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default MenuItem;
