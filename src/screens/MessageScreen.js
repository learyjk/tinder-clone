import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Header from "../components/Header";
import { getMatchedUserInfo } from "../../lib/getMatcheduserInfo";
import { useAuth } from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();

  const { matchDetails } = params;

  return (
    <SafeAreaView>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;
