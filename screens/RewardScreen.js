import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input, Button } from "@rneui/themed";

import colors from "../styles/colors";
import CreditItem from "../components/CreditItem";

const data = [
  {
    credits: 50,
    enable: true,
  },
  {
    credits: 100,
    enable: false,
  },
  {
    credits: 150,
    enable: false,
  },
  {
    credits: 200,
    enable: false,
  },
];

const payout = [
  {
    name: "Paytm",
  },
  {
    name: "Google Pay",
  },
  {
    name: "Phone Pe",
  },
  {
    name: "Paypal",
  },
];

const RewardScreen = () => {
  const _renderItem = ({ item, index }) => <CreditItem item={item} />;

  const _renderPayout = ({ item, index }) => (
    <View style={[styles.method, index === 0 ? styles.active : styles.method]}>
      <Text style={[styles.title, index === 0 ? styles.aTitle: styles.title]}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Ionicons
          name="ios-information-circle-outline"
          color={colors.secondary}
          size={24}
        />
        <Text style={styles.text}>
          Each payment method will have different charges and taxes
        </Text>
      </View>
      <Text style={styles.headline}>Select Credits to convert</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item) => item.credits}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
      <Text style={styles.headline}>Select Payout Method</Text>
      <FlatList
        horizontal
        data={payout}
        renderItem={_renderPayout}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        style={styles.listP}
      />
      <Text style={styles.headline}>Payout Information</Text>
      <View style={styles.form}>
        <Input
          placeholder="Name"
          label="Name"
          inputContainerStyle={styles.inputContainer}
          leftIcon={
            <Ionicons name="person" size={18} color={colors.secondText} />
          }
          onChangeText={(value) => console.log(value)}
          errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
        <Input
          placeholder="Mobile Number"
          label="Mobile Number"
          inputContainerStyle={styles.inputContainer}
          leftIcon={
            <Ionicons name="ios-call" size={18} color={colors.secondText} />
          }
          onChangeText={(value) => console.log(value)}
          errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
        <Input
          placeholder="UPI"
          label="UPI"
          inputContainerStyle={styles.inputContainer}
          leftIcon={
            <Ionicons name="ios-card" size={18} color={colors.secondText} />
          }
          onChangeText={(value) => console.log(value)}
          errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
      </View>
      <Button title="Submit" radius={8} color={colors.primary} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.light,
    height: "100%",
  },
  list: {
    maxHeight: 120,
    marginTop: 8,
  },
  listP: {
    maxHeight: 40,
    marginTop: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBack,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  text: {
    color: colors.secondary,
    paddingLeft: 8,
    flexWrap: "wrap",
    flex: 1,
  },
  headline: {
    marginTop: 16,
    fontSize: 16,
    color: colors.secondText,
    fontWeight: "bold",
  },
  form: {
    paddingVertical: 16,
  },
  method: {
    backgroundColor: colors.darkGrey,
    height: 40,
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: 16,
    marginRight: 16,
    borderRadius: 16
  },
  active: {
    backgroundColor: colors.secondary
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  aTitle: {
    color: colors.light
  }
});

export default RewardScreen;
