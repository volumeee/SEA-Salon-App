import { View, Text, ImageBackground, ScrollView } from "react-native";
import React from "react";
import CategoriesList from "../components/CategoriesList";

const HomeScreen = () => {
  return (
    <>
      <ScrollView>
        <View style={{ position: "absolute" }}>
          <ImageBackground
            source={require("../../assets/left_bg.png")}
            className="w-[200px] h-[200px]"
          />
        </View>
        <View className="justify-center items-center my-5">
          <Text className="text-4xl mb-2 text-orange font-extralight">
            Sea Salon
          </Text>
        </View>
        <View className="justify-center items-center">
          <View className="w-[350px] h-[160px] bg-[#ff6347] rounded-xl flex-row">
            <View className="flex-1 flex-col items-center justify-center px-5">
              <Text className="text-xl font-normal text-center">
                Look Awesome & Save Some
              </Text>
              <View className="w-[150px] h-[30px] rounded-full bg-orange-100 justify-center mt-2">
                <Text className=" text-[15px] font-normal text-center">
                  Get Upto 50% off
                </Text>
              </View>
            </View>
            <View className="flex-1 items-end mr-5">
              <ImageBackground
                source={require("../../assets/woman.png")}
                className="w-[150px] h-[160px]"
              />
            </View>
          </View>
        </View>
        {/* categories */}
        <View className="justify-start items-start mt-5 px-5">
          <Text className="text-xl font-medium">Categories</Text>
          <CategoriesList />
        </View>
        {/* hair specialists */}
        <View className="justify-start items-start px-5">
          <Text className="text-xl font-medium">Hair Specialist</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
