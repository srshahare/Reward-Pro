import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import formatDate from "../utils/formatDate";
import colors from "../styles/colors";

const TxItem = ({ item }) => {
  const generateTitle = (item) => {
    switch (item.type) {
      case "Reward":
        if (item.status === "Processing") {
          return {
            text: "Request submitted to convert reward",
            textColor: colors.secondText,
            amtColor: colors.error,
            sign: "-",
            icon: "cash-outline",
          };
        } else if (item.status === "Accepted") {
          return {
            text: "Request accepted by the admin",
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
            text: "Request accepted by the admin",
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
          <View>
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
        <View>
          <Text style={[styles.title, { color: generateTitle(item).amtColor }]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 0,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  context: {
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: "80%",
  },
  text: {
    color: colors.dark,
    flexWrap: "wrap",
    flex: 1,
    maxWidth: "90%",
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
});

export default TxItem;
