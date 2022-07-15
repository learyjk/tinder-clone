import { View, Text, Image } from "react-native";
import React from "react";

const Card = ({ card }) => {
  return (
    <View
      key={card.id}
      className="relative bg-white h-3/5 border-gray-200 border-2 rounded-2xl overflow-hidden">
      <Image
        className="h-full w-full object-cover"
        source={{ uri: card.photoURL }}
      />
      <View className="absolute flex-row items-center justify-between bottom-0 z-10 p-4 bg-white w-full">
        <View className="flex-col">
          <Text className="font-bold text-lg text-gray-900">
            {card.displayName}
          </Text>
          <Text className="font-semibold text-gray-800">{card.occupation}</Text>
        </View>
        <Text className="font-bold text-2xl text-gray-800">{card.age}</Text>
      </View>
    </View>
  );
};

export default Card;
