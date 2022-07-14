import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
  const navigator = useNavigation();
  const { logOut } = useAuth();

  return (
    <View>
      <Text className="text-red-500">This is HomeScreen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigator.navigate("Chat")}
      />
      <Button title="Logout" onPress={logOut} />
    </View>
  );
};

export default HomeScreen;
