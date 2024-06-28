import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/NavigationTypes";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/id";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

type TransactionRouteProp = RouteProp<RootStackParamList, "Order">;
type TransactionNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Order"
>;

const Transaction = () => {
  const route = useRoute<TransactionRouteProp>();
  const navigation = useNavigation<TransactionNavigationProp>();
  const { specialist } = route.params;
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleTimeChange = (selectedDate: Date) => {
    const selectedHour = dayjs(selectedDate).hour();
    if (selectedHour >= 8 && selectedHour < 16) {
      const newDate = dayjs(selectedDate);
      setDate(newDate);
      console.log("Date set to:", newDate.format());
      console.log(
        "Formatted Date:",
        newDate.format("DD MMMM YYYY, HH:mm [WIB]")
      );
    } else {
      alert("Please select a time between 08:00 and 16:00.");
    }
  };

  const isDateDisabled = (date: Date) => {
    const day = dayjs(date).day();
    return day === 1 || day === 6 || day === 0;
  };

  const handleBookAppointment = () => {
    navigation.navigate("Payment", {
      specialist,
      date: date.toISOString(),
    });
  };

  return (
    <View className="p-4">
      <View className="mb-2">
        <Text className="text-base font-normal">Hair Specialist</Text>
      </View>
      <View className="flex-row items-center justify-between bg-white shadow-md rounded-md p-2">
        <View className="mx-4">
          <View className="flex-row items-center">
            <Text className="text-lg font-medium">
              {specialist.specialist_name}
            </Text>
            <Text className="ml-2 text-[10px] font-normal px-1 bg-slate-300 rounded-md">
              {specialist.categories[0].categories_name}
            </Text>
          </View>
          <Text className="text-gray-500">{specialist.specialist_phone}</Text>
          <Text className="font-bold text-lg">
            ${specialist.specialist_price}
          </Text>
        </View>
        <View className="flex-row items-center flex-1 justify-center">
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text className="text-sm font-bold ml-1">
            {specialist.vote_average.toFixed(1)}
          </Text>
        </View>
        <View className="w-24 h-24 rounded-md overflow-hidden">
          <ImageBackground
            source={{ uri: specialist.profile_picture }}
            className="w-full h-full"
          />
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-base font-normal">Date Times</Text>
        <View className="bg-white shadow-md rounded-md p-2 mt-2">
          <DateTimePicker
            mode="single"
            selectedItemColor="#ff6347"
            date={date.toDate()}
            minDate={new Date()}
            timePicker={true}
            onChange={(params) => {
              if (params.date) {
                const newDate = new Date(dayjs(params.date).toDate());
                if (!isDateDisabled(newDate)) {
                  console.log("onChange params.date:", params.date);
                  handleTimeChange(newDate);
                } else {
                  alert(
                    "Please select a date that is not Monday, Saturday, or Sunday."
                  );
                }
              }
            }}
          />
        </View>
      </View>
      <View className="justify-self-end mt-4">
        <TouchableOpacity
          className="bg-[#ff6347] rounded-md p-4"
          onPress={handleBookAppointment}
        >
          <Text className="text-white font-bold text-center">
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Transaction;
