import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
  const { request, logIn, loading } = useAuth();

  return (
    <View>
      <Text>{loading ? "loading..." : "Login to the app"}</Text>
      <Button disabled={!request} title="Login" onPress={() => logIn()} />
    </View>
  );
};

export default LoginScreen;