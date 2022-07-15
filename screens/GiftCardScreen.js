import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";

import React, { useEffect, useState, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input, Button, Image, CheckBox } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";

import colors from "../styles/colors";
import GiftController from "../hooks/gift";
import GalleryController from "../hooks/gallary";
import PaymentController from "../hooks/payment";
import Auth from "../hooks/authentication";
import ProfileController from "../hooks/profile";

const type = [
  {
    name: "Physical",
  },
  {
    name: "E-Code",
  },
];

const data = [
  {
    currency: "INR",
    name: "Indian Rupees",
  },
  {
    currency: "USD",
    name: "United State Dollar",
  },
  {
    currency: "AUD",
    name: "Australian Dollar",
  },
  {
    currency: "CNY",
    name: "Chinese Currency",
  },
  {
    currency: "CAD",
    name: "Canadian Dollar",
  },
];

const GiftCardScreen = () => {
  const [isCvv, setIsCvv] = useState(false);
  const [selectedType, setSelectedType] = useState("Physical");
  const [selectedCard, setSelectedCard] = useState();
  const [coupon, setCoupon] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [pin, setPin] = useState("");
  const [giftValue, setGiftValue] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [termsCheck, setCheck] = useState(false);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [selectedMethod, setSelectedMethod] = useState();

  const refRBSheet = useRef();

  const { fetchCards, cards, loading, submitCard } = GiftController();
  const { openCardGallery, frontImage, backImage, openGallery } =
    GalleryController();
  const { fetchPayMethods, methods } = PaymentController();
  const { currentUser } = Auth();
  const { getProfileById, profile } = ProfileController();

  useEffect(() => {
    if (currentUser) {
      getProfileById(currentUser);
    }
    fetchCards();
    fetchPayMethods();
  }, [currentUser]);

  const handleExpiryDate = (value) => {
    setExpiry(value);
    if (value.length === 2) value = value + "/";
    else if (value.length === 3 && value.charAt(2) === "/")
      value = value.replace("/", "");
    setExpiry(`${value}`);
  };

  const handleSubmitCard = () => {
    submitCard(
      selectedType,
      selectedCard,
      frontImage,
      backImage,
      giftValue,
      selectedCurrency,
      coupon,
      pin,
      isCvv,
      cvv,
      expiry,
      {
        mobile,
        address,
        method: selectedMethod?.name,
      },
      profile,
      refRBSheet,
      Toast
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedCard && (
        <View style={[styles.infoContainer, { marginTop: 16 }]}>
          <Ionicons
            name="ios-information-circle-outline"
            color={colors.secondary}
            size={24}
          />
          <Text style={styles.text}>
            You will receive {selectedCard?.percent}% of the total worth of the
            selected card
          </Text>
        </View>
      )}
      <Text style={styles.headline}>Type of Gift Card</Text>
      <View style={styles.flex}>
        {type.map((item, index) => (
          <TouchableOpacity
            onPress={() => setSelectedType(item.name)}
            key={item.name}
            style={[
              styles.method,
              selectedType === item.name ? styles.active : styles.method,
            ]}
          >
            <Text
              style={[
                styles.title,
                selectedType === item.name ? styles.aTitle : styles.title,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.headline}>Select Gift Card</Text>
      <View style={styles.flex}>
        {cards.length > 0 &&
          cards.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedCard(item)}
              key={item.name}
              style={[
                styles.method,
                selectedCard?.name === item.name
                  ? styles.active
                  : styles.method,
              ]}
            >
              <Text
                style={[
                  styles.title,
                  selectedCard?.name === item.name
                    ? styles.aTitle
                    : styles.title,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <Text style={styles.headline}>Gift Card Information </Text>
      {selectedType === "E-Code" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>Need Expiry date & cvv</Text>
          <Switch value={isCvv} onValueChange={(value) => setIsCvv(value)} />
        </View>
      )}
      <View>
        {selectedType === "E-Code" ? (
          <View style={styles.inputBox}>
            <Input
              placeholder="Enter Coupon Code"
              inputContainerStyle={styles.inputContainer}
              onChangeText={(value) => setCoupon(value)}
              value={coupon}
              errorStyle={{ color: "red" }}
            />
            {!isCvv && (
              <Input
                placeholder="Enter Gift Card Pin (If Required)"
                inputContainerStyle={styles.inputContainer}
                onChangeText={(value) => setPin(value)}
                value={pin}
                errorStyle={{ color: "red" }}
              />
            )}
            {isCvv && (
              <View>
                <Input
                  placeholder="Enter CVV (e.g. 454)"
                  inputContainerStyle={styles.inputContainer}
                  onChangeText={(value) => setCvv(value)}
                  value={cvv}
                  errorStyle={{ color: "red" }}
                  textContentType="oneTimeCode"
                  keyboardType="numeric"
                  returnKeyType="next"
                  maxLength={3}
                />
                <Input
                  placeholder="Enter Expiry Date (e.g. 07/26)"
                  inputContainerStyle={styles.inputContainer}
                  onChangeText={handleExpiryDate}
                  keyboardType="numeric"
                  maxLength={5}
                  value={expiry}
                  errorStyle={{ color: "red" }}
                />
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text>Front View</Text>
            <TouchableNativeFeedback onPress={() => openCardGallery("front")}>
              {frontImage ? (
                <Image
                  style={styles.img}
                  source={{ uri: frontImage?.uri }}
                  alt="front-view"
                />
              ) : (
                <View style={styles.innerBox}>
                  <Text>Tap to Open Gallery</Text>
                </View>
              )}
            </TouchableNativeFeedback>
            <Text>Back View</Text>
            <TouchableNativeFeedback onPress={() => openCardGallery("back")}>
              {backImage ? (
                <Image
                  style={styles.img}
                  source={{ uri: backImage?.uri }}
                  alt="back-view"
                />
              ) : (
                <View style={styles.innerBox}>
                  <Text>Tap to Open Gallery</Text>
                </View>
              )}
            </TouchableNativeFeedback>
          </View>
        )}
      </View>
      <Text style={styles.heading}>Select Value & Currency</Text>
      <View style={styles.inputBox}>
        <Input
          placeholder="Enter Gift Card Value"
          keyboardType="number-pad"
          inputContainerStyle={styles.inputContainer}
          onChangeText={(value) => setGiftValue(value)}
          value={giftValue}
          errorStyle={{ color: "red" }}
        />
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCurrency(itemValue)
          }
        >
          {data.map((item) => (
            <Picker.Item
              key={item.currency}
              label={`${item.currency} (${item.name})`}
              value={item.currency}
            />
          ))}
        </Picker>
      </View>
      <Button
        onPress={() => refRBSheet.current.open()}
        containerStyle={{ marginTop: 32 }}
        title="Next"
        disabled={
          !selectedCard ||
          giftValue === "" ||
          (selectedType === "Physical"
            ? !frontImage || !backImage
            : coupon === "" || isCvv
            ? cvv === "" || expiry === ""
            : pin === "")
        }
        radius={8}
        color={colors.primary}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={450}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.2)",
          },
          container: {
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            backgroundColor: colors.light,
            paddingBottom: 16,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <ScrollView style={styles.bottomContainer}>
          <View>
            <Text style={styles.heading}>Select Payment Method</Text>
            <View style={[styles.flex, { marginTop: 8 }]}>
              {methods.length > 0 &&
                methods.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => setSelectedMethod(item)}
                    key={item.name}
                    style={[
                      styles.method,
                      selectedMethod?.name === item.name
                        ? styles.active
                        : styles.method,
                    ]}
                  >
                    <Text
                      style={[
                        styles.title,
                        selectedMethod?.name === item.name
                          ? styles.aTitle
                          : styles.title,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={{ marginTop: 16 }}>
              <Input
                placeholder="Mobile Number"
                label="Mobile Number"
                inputContainerStyle={styles.inputContainer}
                leftIcon={
                  <Ionicons
                    name="ios-call"
                    size={18}
                    color={colors.secondText}
                  />
                }
                onChangeText={(value) => setMobile(value)}
                errorStyle={{ color: "red" }}
                value={mobile}
                // errorMessage="ENTER A VALID ERROR HERE"
              />
              <Input
                placeholder={selectedMethod?.hint}
                label="Payment Address"
                inputContainerStyle={styles.inputContainer}
                leftIcon={
                  <Ionicons
                    name="ios-card"
                    size={18}
                    color={colors.secondText}
                  />
                }
                onChangeText={(value) => setAddress(value)}
                errorStyle={{ color: "red" }}
                value={address}
                // errorMessage="ENTER A VALID ERROR HERE"
              />
            </View>
          </View>
          <View style={[styles.flex, { marginTop: 32 }]}>
            <CheckBox
              checked={termsCheck}
              onPress={() => setCheck(!termsCheck)}
            />
            <Text style={styles.para}>
              By clicking on Confirm button you accept our{" "}
              <Text>Privacy Policy</Text> and <Text>Terms</Text>
            </Text>
          </View>
          <Button
            title="Confirm"
            onPress={handleSubmitCard}
            loading={loading}
            disabled={
              !termsCheck || !selectedMethod || mobile === "" || address === ""
            }
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
    paddingHorizontal: 16,
  },
  para: {
    color: colors.secondText,
    flexWrap: "wrap",
    fontWeight: "700",
    flex: 1,
  },
  container: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: colors.light,
    paddingBottom: 64,
  },
  innerBox: {
    width: "100%",
    height: 200,
    backgroundColor: colors.grey,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    resizeMode: "cover",
    marginBottom: 16,
  },
  flex: {
    flexDirection: "row",
    flexWrap: "wrap",
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
    marginBottom: 8,
    fontSize: 16,
    color: colors.secondText,
    fontWeight: "bold",
  },
  heading: {
    fontWeight: "700",
    fontSize: 16,
  },
  form: {
    paddingVertical: 16,
  },
  method: {
    backgroundColor: colors.darkGrey,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 50,
  },
  active: {
    backgroundColor: colors.secondary,
  },
  title: {
    fontWeight: "400",
    fontSize: 14,
  },
  aTitle: {
    color: colors.light,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondaryBack,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  inputBox: {
    backgroundColor: colors.secondaryBack,
    borderRadius: 16,
    padding: 8,
    marginVertical: 8,
  },
});

export default GiftCardScreen;
