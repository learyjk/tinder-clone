import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const HomeScreen = () => {
  const navigator = useNavigation();

  return (
    <View>
      <Text className="text-red-500">This is HomeScreen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigator.navigate("Chat")}
      />
    </View>
  );
};

export default HomeScreen;
