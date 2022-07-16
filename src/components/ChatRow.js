import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { getMatchedUserInfo } from "../../lib/getMatcheduserInfo";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    []
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Message", { matchDetails })}
      className="w-full flex-row items-center p-4 bg-white">
      <Image
        className="rounded-full h-16 w-16 mr-4"
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text className="text-lg font-semibold">
          {matchedUserInfo?.displayName}
        </Text>
        <Text className="font">{lastMessage || "Say Hi"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
