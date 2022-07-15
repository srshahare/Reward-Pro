import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../styles/colors";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { Button } from "@rneui/themed";
import ChatController from "../hooks/chat";
import Auth from "../hooks/authentication";
import GalleryController from "../hooks/gallary";

const ChatScreen = ({ navigation }) => {
  const [msg, setMsg] = useState("");
  const [imgVisible, setImgVisible] = useState(false);
  const [img, setImg] = useState("");

  const { currentUser } = Auth();
  const { openGallery, image, setImage, resetImage } = GalleryController();

  const handleCopyMsg = async (msg) => {
    await Clipboard.setStringAsync(msg);
    Toast.show({
      type: "info",
      text1: `Copied to Clipboard`,
      text2: `Message has been copied to clipboard`,
      position: "top",
      topOffset: 32,
    });
  };

  const _renderItem = ({ item, index }) => (
    <TouchableOpacity
      onLongPress={() => handleCopyMsg(item?.msg)}
      style={[
        styles.msgBox,
        item.senderId !== "admin" ? styles.meBox : styles.msgBox,
      ]}
    >
      {item.type === "img" ? (
        <TouchableOpacity
          onPress={() => {
            setImgVisible(!imgVisible);
            setImg(item.url);
          }}
          style={[
            styles.msgImg,
            item.senderId !== "admin" ? styles.meImg : styles.msgImg,
          ]}
        >
          {item?.url !== "" && (
            <Image
              style={styles.chatImg}
              source={{ uri: item?.url }}
              alt="chat-image"
            />
          )}
          {item?.msg !== "" && (
            <Text
              style={[
                styles.msgText,
                item.senderId !== "admin" ? styles.meText : styles.msgText,
              ]}
            >
              {item.msg}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <Text
          style={[
            styles.msgText,
            item.senderId !== "admin" ? styles.meText : styles.msgText,
          ]}
        >
          {item.msg}
        </Text>
      )}
      <Modal
        animationType="fade"
        visible={imgVisible}
        presentationStyle="pageSheet"
        statusBarTranslucent={true}
        collapsable
        // transparent={true}
        onRequestClose={() => setImgVisible(!imgVisible)}
        style={{ backgroundColor: "black" }}
      >
        <View style={styles.imgContext}>
          <Ionicons
            onPress={() => setImgVisible(!imgVisible)}
            name="arrow-back-circle"
            color={colors.light}
            size={40}
            style={styles.back}
          />
          <Image
            style={styles.fullImg}
            source={{ uri: img }}
            alt="chat-image"
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );

  const { chats, sendMessage, fetchMessages } = ChatController();

  const handleSendMsg = () => {
    if (msg === "" && !image) {
      return Toast.show({
        type: "error",
        text1: `Oops!`,
        text2: `Empty message cannot be sent`,
        position: "top",
        topOffset: 32,
      });
    }

    if (image) {
      sendMessage(msg, "admin", currentUser, "img", image);
    } else {
      sendMessage(msg, "admin", currentUser, "text", null);
    }
    setMsg("");
    setImage(null);
  };

  const chatSize = chats.length;

  useEffect(() => {
    if (currentUser) {
      console.log("triggerd");
      fetchItems(currentUser);
    }
    async function fetchItems(currentUser) {
      try {
        await fetchMessages(currentUser);
      } catch (err) {
        console.log(err);
      }
    }
  }, [chatSize, currentUser]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ scaleY: -1 }}
        contentContainerStyle={styles.list}
        data={chats}
        //   inverted
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.bottom}>
        <Button
          containerStyle={styles.icon}
          color={colors.primary}
          onPress={openGallery}
          radius={50}
          icon={
            <Ionicons name="attach-outline" color={colors.light} size={24} />
          }
        />
        <View style={styles.inputBox}>
          <TextInput
            clearButtonMode="while-editing"
            value={msg}
            onChangeText={(text) => setMsg(text)}
            style={styles.input}
            placeholder={`Type something...`}
          />
          {image && (
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={{ uri: image?.uri }}
                alt="chat-image"
              />
              <Ionicons
                onPress={resetImage}
                name="close"
                size={24}
                color={colors.darkGrey}
                style={styles.imgIcon}
              />
            </View>
          )}
        </View>
        <Button
          onPress={handleSendMsg}
          containerStyle={styles.icon}
          color={colors.primary}
          radius={50}
          icon={<Ionicons name="ios-send" color={colors.light} size={24} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 50,
    height: 50,
    borderColor: colors.grey,
  },
  input: {
    padding: 12,
    zIndex: 8,
  },
  imgContainer: {
    width: "100%",
    height: 200,
    position: "absolute",
    bottom: 0,
    left: 0,
    elevation: 8,
  },
  imgContext: {
    height: "100%",
    backgroundColor: colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    left: 16,
    top: 64,
  },
  imgIcon: {
    backgroundColor: colors.light,
    borderRadius: 50,
    padding: 4,
    position: "absolute",
    top: 0,
    right: 0,
  },
  img: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    resizeMode: "cover",
    elevation: 8,
  },
  fullImg: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  chatImg: {
    width: 300,
    height: 150,
    borderRadius: 16,
    resizeMode: "cover",
  },

  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 90,
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
    borderTopStartRadius: 16,
  },

  msgBox: {
    borderRadius: 16,
    padding: 8,
    marginTop: 4,
    alignItems: "flex-start",
    scaleY: -1,
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
    borderWidth: 0.2,
    borderColor: colors.secondary,
    //   elevation: 8
  },
  meText: {
    backgroundColor: colors.secondary,
    color: colors.light,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 50,
    //   elevation: 8
  },
  msgImg: {
    backgroundColor: colors.secondaryBack,
    padding: 4,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderWidth: 0.2,
    borderColor: colors.secondary,
    //   elevation: 8
  },
  meImg: {
    backgroundColor: colors.secondary,
    color: colors.light,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 16,
    //   elevation: 8
  },
});

export default ChatScreen;
