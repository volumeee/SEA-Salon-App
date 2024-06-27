import { View, Text, ImageBackground, FlatList } from "react-native";
import React, { useState } from "react";
import CategoryList from "../components/home/CategoriesList";
import HairSpecialistList from "../components/home/HairSpecialistList";

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const sections = [
    {
      key: "header",
      content: (
        <View className="absolute">
          <ImageBackground
            source={require("../../assets/left_bg.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      ),
    },
    {
      key: "title",
      content: (
        <View className="flex justify-center items-center my-5">
          <Text className="text-4xl mb-2 text-[#ff6347] font-light">
            Sea Salon
          </Text>
        </View>
      ),
    },
    {
      key: "promotion",
      content: (
        <View className="justify-center items-center">
          <View className="w-[350px] h-[160px] bg-[#ff6347] rounded-lg flex flex-row">
            <View className="flex-1 flex-col justify-center items-center px-5">
              <Text className="text-xl font-medium text-white text-center">
                Look Awesome & Save Some
              </Text>
              <View className="w-[150] h-[30] rounded-full bg-[#ffebcd] justify-center mt-2">
                <Text className="text-sm font-normal text-center">
                  Get Upto 50% off
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}>
              <ImageBackground
                source={require("../../assets/woman.png")}
                style={{ width: 150, height: 160 }}
              />
            </View>
          </View>
        </View>
      ),
    },
    {
      key: "categories",
      content: (
        <View className=" justify-start items-start mt-5 px-5">
          <Text style={{ fontSize: 24, fontWeight: "500" }}>Categories</Text>
          <CategoryList onCategoryPress={handleCategoryPress} />
        </View>
      ),
    },
    {
      key: "specialists",
      content: (
        <View className="px-5 justify-start items-start">
          <Text style={{ fontSize: 24, fontWeight: "500" }}>
            Hair Specialist
          </Text>
          <HairSpecialistList categoryId={selectedCategory} />
        </View>
      ),
    },
  ];

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <>{item.content}</>}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default HomeScreen;
