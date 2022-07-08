import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";
import colors from "../styles/colors";
import Appbar from "../components/Appbar";
import BalanceCard from "../components/BalanceCard";
import MenuBar from "../components/MenuBar";
import TxCard from "../components/TxCard";

const screenWidth = Dimensions.get("screen").width;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Appbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.headerCard}>
          <BalanceCard />
        </View>
        <View style={{ marginTop: 100 }}>
          <MenuBar />
        </View>
        <View style={styles.txCard}>
          <TxCard />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.light,
  },
  header: {
    height: 150,
    backgroundColor: colors.primary,
    width: screenWidth,
  },
  headerCard: {
    position: "absolute",
    top: 0,
    width: screenWidth - 32,
    left: 16,
  },
  txCard: {
    marginTop: 32,
    paddingHorizontal: 16
  }
});

export default HomeScreen;
