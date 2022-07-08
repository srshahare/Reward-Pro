import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React from "react";
import TxItem from "../components/TxItem";
import colors from "../styles/colors";

const screenWidth = Dimensions.get("screen").width;
const HistoryScreen = () => {
  const _renderItem = () => <TxItem />;
  return (
    <View style={styles.container}>
      <FlatList
      ListHeaderComponent={() => <View style={styles.listHeader}>
        <Text style={styles.title}>Transfers</Text>
        <View style={styles.cardBox}>
          <Text style={styles.cardText}>Tap on transaction item for more detail</Text>
        </View>
      </View>}
        keyExtractor={item => item}
        renderItem={_renderItem}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    color: colors.light,
    fontSize: 16
  },
  listHeader: {
    height: 175,
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 16
  },
  title: {
    fontSize: 32,
    color: colors.light,
    fontWeight: "bold"
  }
});

export default HistoryScreen;
