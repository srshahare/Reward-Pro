import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";

import colors from "../styles/colors";
import Appbar from "../components/Appbar";
import BalanceCard from "../components/BalanceCard";
import MenuBar from "../components/MenuBar";
import TxCard from "../components/TxCard";
import initializeExpoNoti from "../hooks/initializeExpoNoti";
import Auth from "../hooks/authentication";
import ProfileController from "../hooks/profile";
import RewardController from "../hooks/reward";

const screenWidth = Dimensions.get("screen").width;

const HomeScreen = ({ navigation }) => {
  const { currentUser } = Auth();
  const {} = initializeExpoNoti(currentUser, navigation);
  const { profile, getProfileById, loading } = ProfileController();
  const { fetchHistory, historyList } = RewardController();

  useEffect(() => {
    if (currentUser) {
      getProfileById(currentUser);
      fetchHistory(currentUser, 5);
    }
  }, [currentUser]);

  const handleRefresh = () => {
    if (currentUser) {
      getProfileById(currentUser);
      fetchHistory(currentUser, 5);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar navigation={navigation} profile={profile} />
      {loading ? (
        <View></View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.scrollview}
        >
          <View style={styles.header}></View>
          <View style={styles.headerCard}>
            <BalanceCard profile={profile} navigation={navigation} />
          </View>
          <View style={{ marginTop: 100 }}>
            <MenuBar navigation={navigation} />
          </View>
          <View style={styles.txCard}>
            {historyList.length > 0 ? (
              <TxCard list={historyList} />
            ) : (
              <View style={styles.box}>
                <LottieView
                  source={require("../assets/json/10000-empty-box.json")}
                  autoPlay
                  speed={0.2}
                  style={{ height: 250 }}
                />
                <Text style={styles.title}>No Transactions Yet!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.light,
  },
  scrollview: {
    paddingBottom: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
