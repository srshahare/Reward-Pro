import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input, Button } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";

import colors from "../styles/colors";

const payout = [
  {
    name: "Amazon 40% cashback",
  },
  {
    name: "Airtel Card",
  },
  {
    name: "Google Play Card",
  },
  {
    name: "Fintouch",
  },
];

const type = [
  {
    name: "Physical",
  },
  {
    name: "E-Code",
  },
];

const data = [
  {
    currency: "INR",
  },
  {
    currency: "USD",
  },
  {
    currency: "AUD",
  },
  {
    currency: "CNY",
  },
  {
    currency: "CAD",
  },
];

const GiftCardScreen = () => {
  const [isCvv, setCvv] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Select Payout Method</Text>
      <View style={styles.flex}>
        {payout.map((item, index) => (
          <View
            key={item.name}
            style={[styles.method, index === 0 ? styles.active : styles.method]}
          >
            <Text
              style={[styles.title, index === 0 ? styles.aTitle : styles.title]}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.headline}>Type of Gift Card</Text>
      <View style={styles.flex}>
        {type.map((item, index) => (
          <View
            key={item.name}
            style={[styles.method, index === 0 ? styles.active : styles.method]}
          >
            <Text
              style={[styles.title, index === 0 ? styles.aTitle : styles.title]}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.headline}>Gift Card Information </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.heading}>Need Expiry date & cvv</Text>
        <Switch value={isCvv} onValueChange={(value) => setCvv(value)} />
      </View>
      <View>
        <Input
          placeholder="Enter Coupon Code"
          inputContainerStyle={styles.inputContainer}
          onChangeText={(value) => console.log(value)}
          errorStyle={{ color: "red" }}
        />
        {!isCvv && (
          <Input
            placeholder="Enter Gift Card Pin (If Required)"
            inputContainerStyle={styles.inputContainer}
            onChangeText={(value) => console.log(value)}
            errorStyle={{ color: "red" }}
          />
        )}
        {isCvv && (
          <View>
            <Input
              placeholder="Enter CVV"
              inputContainerStyle={styles.inputContainer}
              onChangeText={(value) => console.log(value)}
              errorStyle={{ color: "red" }}
            />
            <Input
              placeholder="Enter Expiry Date"
              inputContainerStyle={styles.inputContainer}
              onChangeText={(value) => console.log(value)}
              errorStyle={{ color: "red" }}
            />
          </View>
        )}
        <Input
          placeholder="Enter Gift Card Value"
          inputContainerStyle={styles.inputContainer}
          onChangeText={(value) => console.log(value)}
          errorStyle={{ color: "red" }}
        />
        <Text>Select Currency</Text>
        <Picker
          selectedValue={selectedCredit}
          onValueChange={(itemValue, itemIndex) => setSelectedCredit(itemValue)}
        >
          {data.map((item) => (
            <Picker.Item
              key={item.currency}
              label={`${item.currency}`}
              value={item.currency}
            />
          ))}
        </Picker>
        <Button title="Submit" radius={8} color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: colors.light,
    height: "100%",
  },
  flex: {
    flexDirection: "row",
    flexWrap: "wrap",
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
    marginBottom: 8,
    fontSize: 16,
    color: colors.secondText,
    fontWeight: "bold",
  },
  heading: {
    fontWeight: "700",
    fontSize: 16,
  },
  form: {
    paddingVertical: 16,
  },
  method: {
    backgroundColor: colors.darkGrey,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 50,
  },
  active: {
    backgroundColor: colors.secondary,
  },
  title: {
    fontWeight: "400",
    fontSize: 14,
  },
  aTitle: {
    color: colors.light,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBack,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
});

export default GiftCardScreen;
