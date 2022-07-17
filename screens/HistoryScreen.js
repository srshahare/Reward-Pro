import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import TxItem from "../components/TxItem";
import colors from "../styles/colors";
import Auth from "../hooks/authentication";
import RewardController from "../hooks/reward";

const screenWidth = Dimensions.get("screen").width;
const HistoryScreen = () => {
  const { currentUser } = Auth();
  const { fetchHistory, historyList, loading } = RewardController();

  useEffect(() => {
    if (currentUser) {
      fetchHistory(currentUser, null);
    }
  }, [currentUser]);

  const handleRefresh = () => {
    if (currentUser) {
      fetchHistory(currentUser, null);
    }
  };

  const _renderItem = ({ item, index }) => <TxItem item={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={
          <View style={styles.box}>
            <LottieView
              source={require("../assets/json/10000-empty-box.json")}
              autoPlay
              speed={0.2}
              style={{ height: 250 }}
            />
            <Text style={styles.titleP}>No Transactions Yet!</Text>
          </View>
        }
        onRefresh={handleRefresh}
        refreshing={loading}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.title}>Transfers</Text>
            <View style={styles.cardBox}>
              <Text style={styles.cardText}>
                Tap on transaction item for more detail
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        renderItem={_renderItem}
        data={historyList}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
    height: 75,
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
    height: 175,
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: colors.light,
    fontWeight: "bold",
  },
  titleP: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.dark
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HistoryScreen;
