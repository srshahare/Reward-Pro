import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import colors from "../styles/colors";
import Auth from "../hooks/authentication";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const LoadingScreen = ({navigation}) => {

  const { authState } = Auth();

  if(authState === true) {
    setTimeout(() => {
      navigation.replace("Main")
    }, 1500)
  }else if (authState === false) {
    setTimeout(() => {
      navigation.replace("Login")
    }, 2000)
  }

  return (
    <View style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" />
      <LottieView
        source={require("../assets/json/73658-ripple-loading.json")}
        autoPlay
        style={{ height: 200 }}
        loop
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
});
