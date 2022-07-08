import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";

import colors from "../styles/colors";
import MenuItem from "../components/MenuItem";

const screenWidth = Dimensions.get("screen").width;

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.cardBox}>
          <Avatar
            size={64}
            rounded
            title="P"
            containerStyle={{ backgroundColor: "coral" }}
          />
          <Text style={styles.cardText}>User Name</Text>
          <Text style={styles.cardText}>user@gmail.com</Text>
        </View>
      </View>
      <View style={styles.box}>
      <MenuItem name="Change Password" icon="ios-lock-closed" />
      <MenuItem name="Faq's" icon="help" />
      <MenuItem name="About Us" icon="ios-information" />
      <MenuItem name="Privacy Policy" icon="key" />
      <MenuItem name="Share App" icon="share-social" />
      <MenuItem name="Logout" icon="log-out-outline" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  cardBox: {
    borderWidth: 1,
    position: "absolute",
    bottom: 0,
    height: 130,
    width: screenWidth - 32,
    left: 16,
    borderBottomWidth: 0,
    borderColor: colors.light,
    borderRadius: 16,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: colors.light,
    fontSize: 16,
  },
  listHeader: {
    height: 220,
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
  box: {
    paddingHorizontal: 16,
    marginTop: 16
  }
});

export default ProfileScreen;
