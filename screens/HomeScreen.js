import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useEffect } from "react";
import colors from "../styles/colors";
import Appbar from "../components/Appbar";
import BalanceCard from "../components/BalanceCard";
import MenuBar from "../components/MenuBar";
import TxCard from "../components/TxCard";
import initializeExpoNoti from "../hooks/initializeExpoNoti";
import Auth from "../hooks/authentication";
import ProfileController from "../hooks/profile";

const screenWidth = Dimensions.get("screen").width;

const HomeScreen = ({navigation}) => {

  const { currentUser } = Auth();
  const {} = initializeExpoNoti(currentUser, navigation);
  const { profile, getProfileById, loading } = ProfileController()

  useEffect(() => {
    if(currentUser) {
      getProfileById(currentUser)
    }
  }, [currentUser])

  return (
    <View style={styles.container}>
      <Appbar navigation={navigation} profile={profile} />
      {loading ?
      <View></View>:
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.headerCard}>
          <BalanceCard profile={profile} navigation={navigation} />
        </View>
        <View style={{ marginTop: 100 }}>
          <MenuBar navigation={navigation} />
        </View>
        <View style={styles.txCard}>
          <TxCard />
        </View>
      </ScrollView>
      }
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
