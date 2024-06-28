import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomStackNavigation";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReservationScreen from "../screens/ReservationScreen";
import Transaction from "../components/reservation/Transaction";
import TransactionPayment from "../components/reservation/TransactionPayment";
import { RootStackParamList } from "../types/NavigationTypes";

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen name="Order" component={Transaction} />
      <Stack.Screen name="Payment" component={TransactionPayment} />
    </Stack.Navigator>
  );
}
