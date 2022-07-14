import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
  const auth = useAuth();

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button
        disabled={!auth.request}
        title="Login"
        onPress={() => {
          auth.promptAsync();
        }}
      />
    </View>
  );
};

export default LoginScreen;
