import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { DUMMY_DATA } from "../../dummyData";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logOut } = useAuth();
  const swipeRef = useRef(null);

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="relative flex-row items-center justify-between px-4">
        <TouchableOpacity className="" onPress={logOut}>
          <Image
            className="h-10 w-10 rounded-full"
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image className="w-14 h-14" source={require("../../logo.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons
            className=""
            color="#FF5864"
            size={30}
            name="chatbubbles-sharp"
          />
        </TouchableOpacity>
      </View>

      {/* Swiper */}
      <View className="flex-1">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          onSwipedLeft={() => {
            console.log("Swipe PASS");
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH");
          }}
          verticalSwipe={false}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "YUP",
              style: {
                label: {
                  textAlign: "left",
                  color: "green",
                },
              },
            },
          }}
          cards={DUMMY_DATA}
          renderCard={(card) => (
            <View
              key={card.id}
              className="relative bg-white h-3/5 border-gray-200 border-2 rounded-2xl overflow-hidden">
              <Image
                className="h-full w-full object-cover"
                source={{ uri: card.photoURL }}
              />
              <View className="absolute flex-row items-center justify-between bottom-0 z-10 p-4 bg-white w-full">
                <View className="flex-col">
                  <Text className="font-bold text-lg">
                    {card.first_name} {card.last_name}
                  </Text>
                  <Text className="font-semibold">{card.occupation}</Text>
                </View>
                <Text className="font-semibold text-2xl">{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View className="flex-row justify-evenly">
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-red-300"
          onPress={() => swipeRef.current.swipeLeft()}>
          <Entypo size={24} name="cross" color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-green-300"
          onPress={() => swipeRef.current.swipeRight()}>
          <AntDesign size={24} name="heart" color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
