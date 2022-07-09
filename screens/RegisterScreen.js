import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
import { Button, Input } from "@rneui/themed";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled' >
      <View style={styles.form}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            {/* <Image
              source={require("../../assets/logo/qfree_logo1.png")}
              style={styles.logo}
            /> */}
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
              <Ionicons
                name="ios-lock-closed"
                size={18}
                color={colors.text}
              />
            }
          />
          <TouchableOpacity >
            <Text style={styles.link}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.replace("SignIn")}
            activeOpacity={0.7}
            style={styles.btn}
          >
            <View style={styles.flex}>
              <Ionicons
                name="phone-portrait"
                size={18}
                color={colors.light}
                style={{ marginRight: 16 }}
              />
              <Text style={{ color: colors.light }}>
                Login with Phone
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    height: "100%",
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
    height: 650,
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

export default RegisterScreen;
