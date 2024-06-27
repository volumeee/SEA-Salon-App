import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes"; // import the type

type TransactionRouteProp = RouteProp<RootStackParamList, "Transaction">;

const Transaction = () => {
  const route = useRoute<TransactionRouteProp>(); // use the type here
  const { specialist } = route.params;

  return (
    <View>
      <Text>Transaction</Text>
      <Text>Name: {specialist.specialist_name}</Text>
      <Text>Phone: {specialist.specialist_phone}</Text>
      <Text>Price: ${specialist.specialist_price}</Text>
      <Text>Rating: {specialist.vote_average.toFixed(1)}</Text>
    </View>
  );
};

export default Transaction;
