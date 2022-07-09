import { View, StyleSheet } from "react-native";
import React from "react";
import CircleIcon from "./CircleIcon";

const MenuBar = ({navigation}) => {
  return (
    <View style={styles.container}>
        <CircleIcon onPress={() => navigation.push("Store")} icon="logo-google-playstore" name="Store" />
        <CircleIcon onPress={() => navigation.push("Reward")} icon="gift-outline" name="Reward" />
        <CircleIcon onPress={() => navigation.push("GiftCard")} icon="card-outline" name="Gift Cards" />
        <CircleIcon onPress={() => navigation.push("Chat")} icon="chatbox-outline" name="Chat" />
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
