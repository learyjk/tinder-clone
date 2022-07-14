import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logOut } = useAuth();

  return (
    <SafeAreaView>
      {/* Header */}
      <View className="relative flex-row items-center justify-between px-4">
        <TouchableOpacity className="" onPress={logOut}>
          <Image
            className="h-10 w-10 rounded-full"
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image className="w-14 h-14" source={require("../../logo.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons
            className=""
            color="#FF5864"
            size="30"
            name="chatbubbles-sharp"
          />
        </TouchableOpacity>
      </View>

      {/* Swiper */}
    </SafeAreaView>
  );
};

export default HomeScreen;
