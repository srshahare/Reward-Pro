import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";

const Appbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
      <Text style={styles.appbarText}>Hello, Username</Text>
        <Ionicons name="notifications" size={24} color={colors.light} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
  },
  appbarText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.light
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
});

export default Appbar;
