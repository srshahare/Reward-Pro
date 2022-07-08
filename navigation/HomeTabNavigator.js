import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
//* Utils imports
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import TxScreen from "../screens/TxScreen";
import ProfileScreen from "../screens/ProfileScreen";


const Tab = createBottomTabNavigator();

const tabHeight = Platform.OS === 'ios' ? 90: 55;

const HomeTabNavigator = () => {
  return (
    <View style={styles.view}>
      {/* <StatusBar barStyle='dark-content' backgroundColor={theme.colors.secondary} /> */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { marginBottom: 4, fontSize: 12 },
          tabBarStyle: { height: tabHeight},
          tabBarActiveTintColor: colors.primary,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Transfers"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Send Query"
          component={TxScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-mail-outline" color={color} size={size} />
            ),
          }}
        />
        {/* <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-heart" color={color} size={size - 4} />
          ),
          // tabBarBadge: 3,
        }}
      /> */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-person-outline" color={color} size={size} />
            ),
            // tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default HomeTabNavigator;
