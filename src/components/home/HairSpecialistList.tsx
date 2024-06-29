import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../services/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  RootStackParamList,
  HairSpecialist,
} from "../../types/NavigationTypes";

const HairSpecialistList = ({ categoryId }: { categoryId: number | null }) => {
  const [hairSpecialists, setHairSpecialists] = useState<HairSpecialist[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchHairSpecialists();
  }, [categoryId]);

  const fetchHairSpecialists = async () => {
    try {
      setLoading(true);
      let query = supabase.from("hair_specialist").select(
        `
        id, 
        specialist_name, 
        specialist_phone, 
        specialist_price, 
        profile_picture, 
        vote_average,
        categories (
          id,
          categories_name
        )
      `
      );

      if (categoryId !== null) {
        query = query.eq("categories_id", categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
        return;
      }

      // Ensure that `categories` is an array
      const formattedData = data.map((item: any) => ({
        ...item,
        categories: Array.isArray(item.categories)
          ? item.categories
          : [item.categories],
      }));

      setHairSpecialists(formattedData);
    } catch (error) {
      console.error("Error fetching hair specialists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (item: HairSpecialist) => {
    navigation.navigate("Order", { specialist: item });
    console.log(item);
  };

  const renderHairSpecialistItem = useCallback(
    ({ item }: { item: HairSpecialist }) => (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        className="bg-[#ffffff] p-4 rounded-lg mb-6 mr-6 w-40 shadow-md"
      >
        <View className="flex items-center">
          <View className="w-24 h-24 rounded-full overflow-hidden">
            <ImageBackground
              source={{ uri: item.profile_picture }}
              className="w-full h-full"
            />
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-lg font-bold">{item.specialist_name}</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-sm font-bold ml-[0.5px]">
              {item.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-black p-1 bg-slate-300 rounded-md mt-[-2px] w-[60px] text-center">
          {item.categories && item.categories.length > 0
            ? item.categories
                .map((category) => category.categories_name)
                .join(", ")
            : "N/A"}
        </Text>
        <Text className="text-xs text-gray-600 mt-1">
          Phone: {item.specialist_phone}
        </Text>
        <Text className="text-xs text-gray-600 font-bold">
          Price: ${item.specialist_price}
        </Text>
      </TouchableOpacity>
    ),
    []
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ff6347" />;
  }

  return (
    <FlatList
      data={hairSpecialists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderHairSpecialistItem}
      style={{ padding: 7, marginTop: 5 }}
      numColumns={2}
    />
  );
};

export default React.memo(HairSpecialistList);
