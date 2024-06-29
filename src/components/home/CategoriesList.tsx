import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../services/supabase";

// Define a type for the category data
interface Category {
  id: number;
  categories_name: string;
}

interface CategoryListProps {
  onCategoryPress: (categoryId: number) => void;
}

const CategoryList = ({ onCategoryPress }: CategoryListProps) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        backgroundColor: "#ff6347",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => onCategoryPress(item.id)}
    >
      <Text style={{ color: "white", fontSize: 14, fontWeight: 400 }}>
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
      contentContainerStyle={{ flexDirection: "row", paddingVertical: 10 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CategoryList;
