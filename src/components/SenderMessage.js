import { View, Text } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={{ alignSelf: "flex-start", marginLeft: "auto" }}
      className="bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2">
      <Text className="text-white font-semibold">{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
