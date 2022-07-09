import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import StoreItem from "../components/StoreItem";
import colors from "../styles/colors";

const storeData = [
  {
    credits: 50,
    amount: 100
  },
  {
    credits: 100,
    amount: 200
  },
  {
    credits: 200,
    amount: 400
  },
  {
    credits: 500,
    amount: 1000
  },
  {
    credits: 1000,
    amount: 2000
  },
  {
    credits: 2000,
    amount: 4000
  },
  {
    credits: 3000,
    amount: 6000
  },
  {
    credits: 4000,
    amount: 8000
  },
  {
    credits: 5000,
    amount: 10000
  },
  {
    credits: 6000,
    amount: 12000
  },
  {
    credits: 7000,
    amount: 14000
  },
  {
    credits: 8000,
    amount: 16000
  },
  {
    credits: 9000,
    amount: 18000
  },
  {
    credits: 10000,
    amount: 20000
  },
]

const StoreScreen = () => {

  const _renderItem = ({item, index}) => (
    <StoreItem item={item} />
  )

  return (
    <View>
      <FlatList
        data={storeData}
        renderItem={_renderItem}
        keyExtractor={(item) => item.amount}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    backgroundColor: colors.light,
    paddingTop: 16,
  }
})

export default StoreScreen;
