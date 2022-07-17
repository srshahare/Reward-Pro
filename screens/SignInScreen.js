import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import colors from "../styles/colors";
import { Button, Input } from "@rneui/themed";
import Auth from "../hooks/authentication";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const { loading, loginUser, sendResetLink } = Auth();

  const handleLogin = async () => {
    try {
      await loginUser(email.value, password.value);
      navigation.push("Main");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: `Error`,
        text2: err.message,
        position: "top",
        topOffset: 32,
      });
    }
  };

  const handleReset = async () => {
    if (email.value === "") {
      return Toast.show({
        type: "success",
        text1: `Reset Link Sent`,
        text2: `Password reset link is sent to your registered email address`,
        position: "top",
        topOffset: 32,
      });
    }
    sendResetLink(email.value, Toast);
  };

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.form}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <Text style={styles.headerFirst}>
              Reward <Text style={styles.headerRest}>Pro</Text>
            </Text>
          </View>
        </View>
        <View style={styles.inputBox}>
          <Input
            placeholder="Email Address"
            style={styles.input}
            errorMessage={email.error}
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            value={email.value}
            returnKeyType="next"
            leftIcon={
              <Ionicons name="ios-mail" size={18} color={colors.text} />
            }
          />
          <Input
            style={styles.input}
            placeholder="Password"
            errorMessage={password.error}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            value={password.value}
            returnKeyType="next"
            secureTextEntry
            leftIcon={
              <Ionicons name="ios-lock-closed" size={18} color={colors.text} />
            }
          />
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.link}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            title="Login"
            disabled={email.value === "" || password.value === ""}
            onPress={handleLogin}
            color={colors.primary}
            radius={8}
            loading={loading}
          />
          <View style={styles.row}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("Register")}>
              <Text style={styles.link}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    backgroundColor: colors.light,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
  or: {
    textAlign: "center",
    marginTop: 16,
    fontWeight: "700",
  },
  btn: {
    borderRadius: 4,
    backgroundColor: colors.primary,
    height: 40,
    marginTop: 16,
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
  headerRest: {
    color: colors.secondary,
  },
  slogan: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    color: colors.text,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  inputBox: {
    marginTop: 25,
  },
  form: {
    height: "100%",
    justifyContent: "space-between",
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
