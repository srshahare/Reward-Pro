import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Input, Button } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";

const TxScreen = () => {
  return (
    <ScrollView>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Send Query</Text>
        <Text style={styles.cardText}>
          Our team member will reach to your email address
        </Text>
      </View>
      <View style={styles.context}>
        <Input
          placeholder="Query subject"
          inputContainerStyle={styles.inputContainer}
          leftIcon={<Ionicons name="text" size={24} color="black" />}
          onChangeText={(value) => console.log(value)}
          errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
        <Input
          placeholder="Email address"
          inputContainerStyle={styles.inputContainer}
          leftIcon={<Ionicons name="ios-mail" size={24} color="black" />}
          onChangeText={(value) => console.log(value)}
          errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
        <Input
          numberOfLines={4}
          multiline={true}
          placeholder="Describe your query"
          inputContainerStyle={styles.inputContainer}
          leftIcon={<Ionicons name="ios-chatbox" size={24} color="black" />}
          onChangeText={(value) => console.log(value)}
          errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
        <View style={styles.bottom}>
          <Button
            title="Submit"
            radius={8}
            icon={<Ionicons name="add" size={20} color={colors.light} />}
            color={colors.primary}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  cardText: {
    color: colors.light,
    fontSize: 16,
  },
  listHeader: {
    height: 150,
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    color: colors.light,
    fontWeight: "bold",
  },
  context: {
    padding: 8,
  },
  inputContainer: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: colors.darkGrey,
  },
  bottom: {
    paddingHorizontal: 8,
    marginTop: 32
  }
});

export default TxScreen;
