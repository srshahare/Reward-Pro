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
import StoreScreen from "../screens/StoreScreen";
import RewardScreen from "../screens/RewardScreen";
import GiftCardScreen from "../screens/GiftCardScreen";
import ChatScreen from "../screens/ChatScreen";
import TransferInfo from "../screens/TransferInfo";
import ConfirmScreen from "../screens/ConfirmScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SignInScreen from "../screens/SignInScreen";
import LoadingScreen from "../Extras/LoadingScreen";

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
        initialRouteName="Loading"
        screenOptions={{
          presentation: {
            modal: true,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'normal',
          },
        }}
      >
         <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Main"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Store"
          component={StoreScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="Reward"
          component={RewardScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="GiftCard"
          component={GiftCardScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="Info"
          component={TransferInfo}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="Login"
          component={SignInScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );s
};

const styles = StyleSheet.create({
  
})

export default MainNavigator;
