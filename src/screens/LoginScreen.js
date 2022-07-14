import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { request, logIn, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1 object-cover items-center"
        source={{
          uri: "https://tinder.com/static/tinder.png",
        }}>
        <TouchableOpacity
          className="absolute bottom-40 bg-white rounded-2xl p-4"
          onPress={() => logIn()}>
          <Text className="font-semibold">Sign in & get swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
      {/* <Text>{loading ? "loading..." : "Login to the app"}</Text>
      <Button disabled={!request} title="Login" onPress={() => logIn()} /> */}
    </View>
  );
};

export default LoginScreen;
