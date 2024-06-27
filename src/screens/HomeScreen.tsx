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
        <View style={{ position: "absolute" }}>
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              marginBottom: 8,
              color: "#FFA500",
              fontWeight: "200",
            }}
          >
            Sea Salon
          </Text>
        </View>
      ),
    },
    {
      key: "promotion",
      content: (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: 350,
              height: 160,
              backgroundColor: "#ff6347",
              borderRadius: 12,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "400", textAlign: "center" }}
              >
                Look Awesome & Save Some
              </Text>
              <View
                style={{
                  width: 150,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: "#ffebcd",
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
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
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "500" }}>Categories</Text>
          <CategoryList onCategoryPress={handleCategoryPress} />
        </View>
      ),
    },
    {
      key: "specialists",
      content: (
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingHorizontal: 20,
          }}
        >
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
