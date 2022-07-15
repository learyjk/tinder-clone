import { View, Text, Image } from "react-native";
import React from "react";

const NoMoreCardsCard = () => {
  return (
    <View className="relative bg-white h-3/5 border-gray-200 border-2 rounded-2xl overflow-hidden">
      <Image
        className="h-full w-full object-cover"
        source={{ uri: "https://links.papareact.com/6gb" }}
      />
      <View className="absolute flex-row items-center justify-between bottom-0 z-10 p-4 bg-white w-full">
        <Text className="font-bold text-lg">That's it!</Text>
      </View>
    </View>
  );
};

export default NoMoreCardsCard;
