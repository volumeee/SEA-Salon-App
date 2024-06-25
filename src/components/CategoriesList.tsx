import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { supabase } from "../services/supabase";

// Define a type for the category data
interface Category {
  id: number;
  categories_name: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("categories")
        .select("id, categories_name");

      if (error) {
        console.error(error);
        return;
      }

      // Ensure the data conforms to the Category type
      const fetchedCategories: Category[] = data.map((category: any) => ({
        id: category.id,
        categories_name: category.categories_name,
      }));

      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (categoryId: number) => {
    console.log("Category ID:", categoryId);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      className="p-[15px] mx-[5px] bg-[#ff6347] rounded-[12px] justify-center items-center"
      onPress={() => handleCategoryPress(item.id)}
    >
      <Text className="text-white font-normal items-center text-base">
        {item.categories_name}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ff6347" />;
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCategoryItem}
      className="flex-row py-3"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CategoryList;
