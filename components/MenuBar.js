import { View, StyleSheet } from "react-native";
import React from "react";
import CircleIcon from "./CircleIcon";

const MenuBar = () => {
  return (
    <View style={styles.container}>
        <CircleIcon icon="logo-google-playstore" name="Store" />
        <CircleIcon icon="gift-outline" name="Reward" />
        <CircleIcon icon="card-outline" name="Gift Cards" />
        <CircleIcon icon="chatbox-outline" name="Chat" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
});

export default MenuBar;
