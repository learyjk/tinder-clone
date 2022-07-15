import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { DUMMY_DATA } from "../../dummyData";
import Card from "../components/Card";
import NoMoreCardsCard from "../components/NoMoreCardsCard";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logOut } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs
            .filter((doc) => doc.id !== user.uid)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        );
      });
    };
    fetchCards();
    return unsub;
  }, []);

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
          cards={profiles}
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
          renderCard={(card) =>
            card ? <Card key={card.id} card={card} /> : <NoMoreCardsCard />
          }
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
