import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import colors from "../styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "@rneui/themed";

const msgs = [
  {
    msg: "hello",
    me: true,
  },
  {
    msg: "hi",
    me: false,
  },
  {
    msg: "so lets start the process",
    me: true,
  },
  {
    msg: "yeah I have one doubt in this",
    me: false,
  },
  {
    msg: "okay tell me",
    me: false,
  },
  {
    msg: "hi!",
    me: false,
  },
  {
    msg: "so lets starft the process",
    me: true,
  },
  {
    msg: "yeah I have onef doubt in this",
    me: false,
  },
  {
    msg: "okay ftell me",
    me: false,
  },
  {
    msg: "hfi",
    me: false,
  },
  {
    msg: "so lets stahrt the process",
    me: true,
  },
  {
    msg: "yeah I have ohne doubt in this",
    me: false,
  },
  {
    msg: "okay tell mhe",
    me: false,
  },
  {
    msg: "hhi",
    me: false,
  },
  {
    msg: "so lets start the procpess",
    me: true,
  },
  {
    msg: "yeah I have one domubt in this",
    me: false,
  },
  {
    msg: "okay tlell me",
    me: false,
  },
];
const screenHeight = Dimensions.get("screen").height;

const ChatScreen = () => {
  const _renderItem = ({ item, index }) => (
    <View style={[styles.msgBox, item.me ? styles.meBox : styles.msgBox]}>
      <Text style={[styles.msgText, item.me ? styles.meText : styles.msgText]}>
        {item.msg}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={msgs}
        renderItem={_renderItem}
        keyExtractor={(item) => item.msg}
      />
      <View style={styles.bottom}>
        <Button
          containerStyle={styles.icon}
          color={colors.primary}
          radius={50}
          icon={
            <Ionicons
              name="attach-outline"
              color={colors.light}
              size={24}
            />
          }
        />
        <TextInput style={styles.input} placeholder="Type something..." />
        <Button
          containerStyle={styles.icon}
          color={colors.primary}
          radius={50}
          icon={
            <Ionicons
              name="ios-send"
              color={colors.light}
              size={24}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  icon: {
    backgroundColor: colors.grey,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.light,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    elevation: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16
  },
  input: {
    borderWidth: 1,
    width: "70%",
    padding: 12,
    borderRadius: 50,
    borderColor: colors.grey
  },
  msgBox: {
    borderRadius: 16,
    padding: 8,
    marginTop: 4,
    alignItems: "flex-start",
  },
  meBox: {
    alignItems: "flex-end",
  },
  msgText: {
    backgroundColor: colors.secondaryBack,
    padding: 16,
    paddingVertical: 10,
    borderRadius: 50,
    borderBottomLeftRadius: 0,
    elevation: 4
  },
  meText: {
    backgroundColor: colors.secondary,
    color: colors.light,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 50,
    elevation: 8
  },
});

export default ChatScreen;
