import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { getAuth, PhoneAuthProvider } from "firebase/auth";
// import { app } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
// import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input } from "@rneui/themed";

// const auth = getAuth();

const SignInScreen = ({ navigation }) => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  //   const sendVerificationCode = async () => {
  //     setLoading(true);
  //     try {
  //       if (phoneNumber === "") {
  //         return Toast.show({
  //           type: "error",
  //           text1: `Error`,
  //           text2: "Phone number should not be empty!",
  //           position: "top",
  //           topOffset: 32,
  //         });
  //       }
  //       if (phoneNumber.length < 10) {
  //         return Toast.show({
  //           type: "error",
  //           text1: `Error`,
  //           text2: "Phone must be of 10 characters long.",
  //           position: "top",
  //           topOffset: 32,
  //         });
  //       }
  //       const phoneProvider = new PhoneAuthProvider(auth);
  //       const verificationId = await phoneProvider.verifyPhoneNumber(
  //         `+91${phoneNumber}`,
  //         recaptchaVerifier.current
  //       );
  //       Toast.show({
  //         type: "success",
  //         text1: `Verification code sent`,
  //         text2: "Verification code has been sent to your phone.",
  //         position: "top",
  //         topOffset: 32,
  //       });
  //       navigation.push("OTP", {
  //         data: {
  //           verificationId,
  //           phoneNumber,
  //         },
  //       });
  //     } catch (err) {
  //       console.log(err.message);
  //       Toast.show({
  //         type: "error",
  //         text1: `Error`,
  //         text2: `${err.message}`,
  //         position: "top",
  //         topOffset: 32,
  //       });
  //     }
  //     setLoading(false);
  //   };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <Text style={styles.headerFirst}>
              Reward <Text style={styles.headerRest}>Pro</Text>
            </Text>
          </View>
        </View>
        {/* <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
          // attemptInvisibleVerification={true}
        /> */}
        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          inputContainerStyle={styles.inputBox}
          inputStyle={styles.input}
          containerStyle={{ paddingHorizontal: 0, marginTop: 64 }}
          style={{ padding: 0 }}
          // errorMessage={mobile.error}
          autoCompleteType="tel"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          leftIcon={
            <Ionicons name="phone-portrait" size={18} color={colors.text} />
          }
        />
      </View>
      <View>
        <Button
          title="Request OTP"
          color={colors.primary}
          radius={8}
          disabled={phoneNumber.length < 10}
          style={{ marginTop: 24, borderRadius: 8 }}
          loading={false}
        />
        <View style={styles.row}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Register")}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.light,
    justifyContent: "space-between",
    padding: 24,
    paddingBottom: 48,
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerFirst: {
    alignItems: "center",
    fontSize: 50,
    marginLeft: 8,
    color: colors.primary,
    fontWeight: "bold",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
  or: {
    textAlign: "center",
    marginTop: 32,
    fontWeight: "700",
  },
  btn: {
    borderRadius: 4,
    backgroundColor: colors.primary,
    height: 40,
    marginTop: 32,
  },
  headerRest: {
    color: colors.secondary,
  },
  slogan: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "700",
  },
  inputBox: {
    color: colors.text,
    paddingHorizontal: 16,
    fontSize: 18,
    marginHorizontal: 0,
    textDecorationLine: "none",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  input: {
    paddingLeft: 16,
  },
  form: {
    height: "100%",
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  row: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
  },
  link: {
    fontWeight: "bold",
    color: colors.primary,
    marginLeft: 8,
  },
});

export default SignInScreen;
