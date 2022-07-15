import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";
import React, { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

import formatDate from "../utils/formatDate";
import colors from "../styles/colors";

const TxItem = ({ item }) => {
  const refRBSheet = useRef();

  const handleCopyMsg = async (msg) => {
    await Clipboard.setStringAsync(msg);
    Toast.show({
      type: "info",
      text1: `Copied to Clipboard`,
      text2: `Order Id has been copied to clipboard`,
      position: "top",
      topOffset: 32,
    });
  };

  const generateTitle = (item) => {
    switch (item.type) {
      case "Reward":
        if (item.status === "Processing") {
          return {
            text: "Request submitted to convert reward amount",
            textColor: colors.secondText,
            amtColor: colors.error,
            sign: "-",
            icon: "cash-outline",
          };
        } else if (item.status === "Accepted") {
          return {
            text: "Request accepted by the administration",
            textColor: colors.warning,
            amtColor: colors.warning,
            sign: "",
            icon: "cash-outline",
          };
        } else {
          return {
            text: "Amount paid to the customer",
            textColor: colors.success,
            amtColor: colors.success,
            sign: "",
            icon: "cash-outline",
          };
        }
      case "Gift":
        if (item.status === "Processing") {
          return {
            text: "Request submitted to process the gift card",
            textColor: colors.secondText,
            amtColor: colors.dark,
            sign: "",
            icon: "card-outline",
          };
        } else if (item.status === "Accepted") {
          return {
            text: "Request accepted by the administration",
            textColor: colors.warning,
            amtColor: colors.warning,
            sign: "",
            icon: "card-outline",
          };
        } else {
          return {
            text: "Amount paid to the customer",
            textColor: colors.success,
            amtColor: colors.success,
            sign: "+",
            icon: "card-outline",
          };
        }
      case "PlayStore":
        return {
          text: "Amount paid to the customer",
          textColor: colors.success,
          amtColor: colors.dark,
          sign: "+",
          icon: "ios-logo-google-playstore",
        };
    }
  };

  return (
    <TouchableNativeFeedback onPress={() => refRBSheet.current.open()}>
      <View style={styles.container}>
        {item && (
          <View style={styles.context}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={generateTitle(item).icon}
                size={18}
                color={colors.secondText}
              />
            </View>
            <View style={styles.textContent}>
              {item && (
                <Text style={styles.text}>{generateTitle(item).text}</Text>
              )}
              {item && (
                <Text style={styles.secondText}>
                  {formatDate(item?.created_at.toDate(), false)}
                </Text>
              )}
              <Text
                style={[
                  styles.secondText,
                  { color: generateTitle(item).textColor, fontWeight: "bold" },
                ]}
              >
                {item?.status}
              </Text>
            </View>
          </View>
        )}
        {item && (
          <View style={styles.rightBox}>
            <Text
              style={[styles.title, { color: generateTitle(item).amtColor }]}
            >
              {generateTitle(item).sign}
              {item.type === "Gift" ? item?.value : item?.credits}
              {item.type === "Gift" ? ` ${item?.currency}` : " Cr"}
            </Text>
            <Text
              style={[
                styles.secondText,
                { color: colors.dark, fontWeight: "bold" },
              ]}
            >
              {item.type === "Gift"
                ? item?.paymentData.method
                : item?.payMethod.name}
            </Text>
          </View>
        )}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={400}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,.2)",
            },
            container: {
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
              backgroundColor: colors.light,
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
        {item &&
          <ScrollView style={styles.bottomContainer}>
            <View style={styles.flexStretch}>
              <Text style={styles.title}>Order Id:</Text>
              <Text
                onPress={() => handleCopyMsg(item?.id)}
                style={styles.right}
              >
                {item?.id}
              </Text>
            </View>
            <View style={styles.flexStretch}>
              <Text style={styles.title}>Payout Method</Text>
              <Text style={styles.right}>
                {item?.type === "Reward"
                  ? item?.payMethod.name
                  : item?.paymentData.method}
              </Text>
            </View>
            <View style={styles.flexStretch}>
              <Text style={styles.title}>Order Date</Text>
              <Text style={styles.right}>{formatDate(item.created_at.toDate(), true)}</Text>
            </View>
            <View style={styles.flexStretch}>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.right}>{item.profile.username}</Text>
            </View>
            <View style={styles.flexStretch}>
              <Text style={styles.title}>Mobile Number</Text>
              <Text style={styles.right}>{item?.type === "Reward"
                  ? item?.mobile
                  : item?.paymentData.mobile}</Text>
            </View>
            <View style={styles.flexStretch}>
              <Text style={styles.title}>Pay Address</Text>
              <Text style={styles.right}>{item?.type === "Reward"
                  ? item?.address
                  : item?.paymentData.address}</Text>
            </View>
            <View style={styles.flexStretch}>
              <Text style={styles.title}>Reward Amount</Text>
              <Text style={styles.right}>{item?.type === "Reward"
                  ? `${item?.credits} Cr`
                  : `${item?.value} ${item.currency}`}  </Text>
            </View>
          </ScrollView>
        }
        </RBSheet>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  context: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "75%",
  },
  rightBox: {
    width: "20%",
  },
  textContent: {
    width: "85%",
  },
  text: {
    color: colors.dark,
  },
  secondText: {
    color: colors.secondText,
    fontSize: 12,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: colors.darkGrey,
    padding: 8,
    borderRadius: 2,
    borderBottomRightRadius: 16,
    marginRight: 8,
    marginTop: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  bottomContainer: {
    padding: 16,
  },
  flexStretch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  right: {
    padding: 8,
    backgroundColor: colors.secondary,
    color: colors.light,
    borderRadius: 8,
  },

  flex: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 22,
  },
  para: {
    color: colors.secondText,
    flexWrap: "wrap",
    fontWeight: "700",
    flex: 1,
  },
});

export default TxItem;
