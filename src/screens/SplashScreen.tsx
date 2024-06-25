import React from "react";
import { View, Text, ImageBackground } from "react-native";

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/xsplash.png")}
      className="flex-1 justify-center items-center bg-white opacity-60"
      resizeMode="cover"
    >
      <View className="flex-1 justify-center items-center">
        <Text className="text-4xl font-bold mb-2 text-orange">SEA Salon</Text>
        <Text className="text-lg text-gray-800">
          “Beauty and Elegance Redefined”
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
