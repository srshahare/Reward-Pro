import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";
import { Button } from "@rneui/themed";

const StoreItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-logo-google-playstore"
            size={28}
            color={colors.secondText}
          />
        </View>
        <View>
          <Text style={styles.title}>{item.credits} Credits</Text>
          <Text style={styles.text}>Rs {item.amount} (50% tax)</Text>
        </View>
      </View>
      <Button
        title="Buy"
        radius={8}
        containerStyle={{ width: 100 }}
        color={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconContainer: {
    borderRadius: 50,
    width: 65,
    height: 65,
    backgroundColor: colors.secondaryBack,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },
  flex: {
    flexDirection: "row",
    alignItems: 'center'
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.secondary
  },
  text: {
      color: colors.secondText,
      fontSize: 16
  }
});

export default StoreItem;
