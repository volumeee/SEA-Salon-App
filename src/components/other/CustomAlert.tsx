import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomAlert = ({
  visible,
  message,
  onClose,
}: {
  visible: boolean;
  message: string;
  onClose: () => void;
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-80 p-5 bg-white rounded-lg items-center shadow-2xl shadow-black">
          <Text className="text-lg font-bold mb-2">Alert</Text>
          <Text className="text-black font-normal text-base mb-5 text-center">
            {message}
          </Text>
          <TouchableOpacity
            className="w-full p-2 bg-[#ff6347] rounded-none flex items-center"
            onPress={onClose}
          >
            <Text className="text-white text-base font-bold">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
