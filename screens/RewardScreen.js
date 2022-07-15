import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input, Button, CheckBox } from "@rneui/themed";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";

import colors from "../styles/colors";
import CreditItem from "../components/CreditItem";
import PaymentController from "../hooks/payment";
import Auth from "../hooks/authentication";
import ProfileController from "../hooks/profile";
import RewardController from "../hooks/reward";
import formatDate from "../utils/formatDate";

const RewardScreen = () => {
  const [selectedPay, setSelectedPay] = useState();
  const [selectedCredits, setSelectedCredits] = useState();
  const [credits, setCredits] = useState([100]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [termsCheck, setCheck] = useState(false)
  const refRBSheet = useRef();

  const _renderItem = ({ item, index }) => (
    <CreditItem
      selectedCredits={selectedCredits}
      setSelectedCredits={setSelectedCredits}
      item={item}
    />
  );

  const _renderPayout = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleSelectPay(item)}
      style={[
        styles.method,
        selectedPay?.id === item.id ? styles.active : styles.method,
      ]}
    >
      <Text
        style={[
          styles.title,
          selectedPay?.id === item.id ? styles.aTitle : styles.title,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const { fetchPayMethods, methods } = PaymentController();
  const { currentUser } = Auth();
  const { getProfileById, profile } = ProfileController();
  const { loading, submitReward } = RewardController();

  useEffect(() => {
    if (currentUser) {
      fetchPayMethods();
      getProfileById(currentUser);
    }
  }, [currentUser]);

  const handleSelectPay = (item) => {
    setSelectedPay(item);
    let data = [];
    for (let i = 100; i <= item.credits; i += 100) {
      data.push(i);
    }
    const filteredData = data.filter((cr) => cr <= profile.credits);
    setCredits(filteredData);
  };

  const handleSubmitReward = () => {
    submitReward(selectedPay, selectedCredits, profile, mobile, address, refRBSheet, Toast);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Ionicons
          name="ios-information-circle-outline"
          color={colors.secondary}
          size={24}
        />
        <Text style={styles.text}>
          You don't need to pay any extra charges for this conversion. (100
          Credits == 100 INR)
        </Text>
      </View>
      <Text style={styles.headline}>Select Payout Method</Text>
      <FlatList
        horizontal
        data={methods}
        renderItem={_renderPayout}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        style={styles.listP}
      />
      <Text style={styles.headline}>Select Credits to convert</Text>
      <FlatList
        horizontal
        data={credits}
        renderItem={_renderItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
      <Text style={styles.headline}>Payout Information</Text>
      <View style={styles.form}>
        <Input
          placeholder="Name"
          label="Name"
          editable={false}
          inputContainerStyle={styles.inputContainer}
          leftIcon={
            <Ionicons name="person" size={18} color={colors.secondText} />
          }
          onChangeText={(value) => setName(value)}
          errorStyle={{ color: "red" }}
          value={profile?.username}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
        <Input
          placeholder="Mobile Number"
          label="Mobile Number"
          inputContainerStyle={styles.inputContainer}
          leftIcon={
            <Ionicons name="ios-call" size={18} color={colors.secondText} />
          }
          onChangeText={(value) => setMobile(value)}
          errorStyle={{ color: "red" }}
          value={mobile}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
        <Input
          placeholder={selectedPay?.hint}
          label="Payment Address"
          inputContainerStyle={styles.inputContainer}
          leftIcon={
            <Ionicons name="ios-card" size={18} color={colors.secondText} />
          }
          onChangeText={(value) => setAddress(value)}
          errorStyle={{ color: "red" }}
          value={address}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
      </View>
      <Button
        onPress={() => refRBSheet.current.open()}
        disabled={
          !selectedCredits || !selectedPay || mobile === "" || address === ""
        }
        title="Submit"
        radius={8}
        color={colors.primary}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={550}
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
        <ScrollView style={styles.bottomContainer}>
          <View style={styles.flexStretch}>
            <Text style={styles.title}>Conversion Credits</Text>
            <Text style={styles.right}>{selectedCredits} Cr</Text>
          </View>
          <View style={styles.flexStretch}>
            <Text style={styles.title}>Payout Method</Text>
            <Text style={styles.right}>{selectedPay?.name}</Text>
          </View>
          <View style={styles.flexStretch}>
            <Text style={styles.title}>Order Date</Text>
            <Text style={styles.right}>{formatDate(Date.now(), true)}</Text>
          </View>
          <View style={styles.flexStretch}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.right}>{profile?.username}</Text>
          </View>
          <View style={styles.flexStretch}>
            <Text style={styles.title}>Mobile Number</Text>
            <Text style={styles.right}>{profile?.phone_number}</Text>
          </View>
          <View style={styles.flexStretch}>
            <Text style={styles.title}>Pay Address</Text>
            <Text style={styles.right}>{address}</Text>
          </View>
          <View style={styles.flexStretch}>
            <Text style={styles.title}>Reward Amount</Text>
            <Text style={styles.right}>{selectedCredits} INR</Text>
          </View>

          <View style={styles.flex}>
            <CheckBox checked={termsCheck} onPress={() => setCheck(!termsCheck)} />
            <Text style={styles.para}>
              By clicking on Confirm button you accept our <Text>Privacy Policy</Text>{" "}
              and <Text>Terms</Text>
            </Text>
          </View>
          <Button
            title="Confirm"
            onPress={handleSubmitReward}
            loading={loading}
            disabled={!termsCheck}
            radius={8}
            color={colors.primary}
          />
        </ScrollView>
      </RBSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '700',
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: colors.light,
    height: "100%",
  },
  list: {
    maxHeight: 120,
    marginTop: 8,
  },
  listP: {
    maxHeight: 40,
    marginTop: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBack,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  text: {
    color: colors.secondary,
    paddingLeft: 8,
    flexWrap: "wrap",
    flex: 1,
  },
  headline: {
    marginTop: 16,
    fontSize: 16,
    color: colors.secondText,
    fontWeight: "bold",
  },
  form: {
    paddingVertical: 16,
  },
  method: {
    backgroundColor: colors.darkGrey,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginRight: 16,
    borderRadius: 16,
  },
  active: {
    backgroundColor: colors.secondary,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  aTitle: {
    color: colors.light,
  },
});

export default RewardScreen;
