import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import BottomTabNavigator from "./BottomStackNavigation";
import ProfileScreen from "../screens/ProfileScreen";
import SavedScreen from "../screens/SavedScreeen";
import ReservationScreen from "../screens/ReservationScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HomeDetail" component={HomeScreen} />
      <Stack.Screen name="ReservationDetail" component={ReservationScreen} />
      <Stack.Screen name="ProfileDetail" component={ProfileScreen} />
      <Stack.Screen name="SavedDetail" component={SavedScreen} />
    </Stack.Navigator>
  );
}
