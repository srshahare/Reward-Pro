import { StatusBar, StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native"
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import colors from "../styles/colors";
import HomeTabNavigator from "./HomeTabNavigator";

const Stack = createStackNavigator();

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MyStatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          presentation: {
            modal: true,
          },
          cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
          headerShown: false,
          headerStyle: { backgroundColor: colors.secondary },
        }}
      >
         <Stack.Screen
          name="Main"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );s
};

const styles = StyleSheet.create({
  
})

export default MainNavigator;
