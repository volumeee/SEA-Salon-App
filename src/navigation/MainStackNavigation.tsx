import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomStackNavigation";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReservationScreen from "../screens/ReservationScreen";
import Transaction from "../components/reservation/Transaction";
import { RootStackParamList } from "../types/navigationTypes"; // import the type

const Stack = createStackNavigator<RootStackParamList>(); // use the type here

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
      <Stack.Screen name="Transaction" component={Transaction} />
    </Stack.Navigator>
  );
}
