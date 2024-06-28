import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { supabase } from "../services/supabase";
import { Transaction } from "../types/NavigationTypes";

const ReservationScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      let { data: transaction, error } = await supabase
        .from("transaction")
        .select("*");

      if (error) {
        console.error(error);
      } else if (transaction) {
        setTransactions(transaction);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>ReservationScreen</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Created At: {item.created_at}</Text>
            <Text>Hair Specialist ID: {item.hair_specialist_id}</Text>
            <Text>Amount Price: {item.t_amount_price}</Text>
            {/* Render data lainnya sesuai kebutuhan */}
          </View>
        )}
      />
    </View>
  );
};

export default ReservationScreen;
