import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../services/supabase";
import { RootStackParamList, Transaction } from "../types/NavigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../components/profile/SessionContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";
import { NavigationProp, useNavigation } from "@react-navigation/native";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

const ReservationScreen = () => {
  const { session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!session || !session.user.id) {
        setLoading(false);
        return;
      }

      const { data: transactions, error } = await supabase
        .from("transaction")
        .select(
          `
          *,
          hair_specialist_id (profile_picture),
          t_state_id (status)
        `
        )
        .eq("customer_id", session.user.id); // Filter by customer_id

      if (error) {
        console.error(error);
      } else {
        setTransactions(transactions || []);
      }
      setLoading(false);
    };

    fetchTransactions();

    const intervalId = setInterval(fetchTransactions, 1000);

    return () => clearInterval(intervalId);
  }, [session]);

  if (loading) {
    return <ActivityIndicator size="large" color="#ff6347" />;
  }

  const RenderWidget = ({ item }: { item: Transaction }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const statusColor =
      item.t_state_id.status === "done" ? "#007bff" : "#ff6347";

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("HistoryDetail", { transaction: item })
        }
      >
        <View className="mb-4">
          <View className="bg-white p-4 rounded-lg shadow-lg overflow-hidden relative">
            <Text className="text-base font-bold">
              Specialist{" "}
              <Text className="font-normal text-sm">
                {item.t_specialist_name}
              </Text>
            </Text>
            <Text className="text-xs">
              {item.t_transaction_date
                ? dayjs(item.t_transaction_date).format(
                    "DD MMMM YYYY, HH:mm [WIB]"
                  )
                : ""}
            </Text>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="font-medium text-sm">
                {item.t_payment_method}
              </Text>
              <Text className="font-medium text-sm">
                ${item.t_amount_price}
              </Text>
            </View>
            <View
              className="absolute top-[15px] right-[-35px] px-10 py-1 rotate-45"
              style={{ backgroundColor: statusColor }}
            >
              <Text className="text-white text-xs font-extrabold">
                {item.t_state_id.status}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-5">
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderWidget item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ReservationScreen;
