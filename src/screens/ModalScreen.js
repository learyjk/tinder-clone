import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !age || !job;

  const getData = async () => {
    const docRef = doc(db, "users", "Uo42SJ9K5568QSvSBlG2");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const updateUserProfile = async () => {
    const userInfoToAdd = {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      occupation: job,
      age: age,
      timestamp: serverTimestamp(),
    };
    await setDoc(doc(db, "users", user.uid), userInfoToAdd)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View className="relative flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text className="text-xl text-gray-600 p-2 font-bold">
        Welcome {user.displayName}
      </Text>
      <Text className="text-center p-4 font-semibold text-rose-500">
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        className="text-center text-xl pb-2"
        placeholder="Enter Your Profile Pic URL"
      />
      <Text className="text-center p-4 font-semibold text-rose-500">
        Step 2: Your Job
      </Text>
      <TextInput
        value={job}
        onChangeText={(text) => setJob(text)}
        className="text-center text-xl pb-2"
        placeholder="Enter Your Job"
      />
      <Text className="text-center p-4 font-semibold text-rose-500">
        Step 3: Your Age
      </Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        className="text-center text-xl pb-2"
        placeholder="Enter Your Age"
        keyboardType="numeric"
      />
      <TouchableOpacity
        disabled={incompleteForm}
        onPress={() => updateUserProfile()}
        className={`absolute w-64 p-3 rounded-xl bottom-12 ${
          incompleteForm ? "bg-gray-400" : "bg-rose-500"
        }`}>
        <Text className="text-center text-xl font-semibold text-rose-50">
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
