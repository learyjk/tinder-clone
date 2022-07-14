import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../firebase";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "824542813966-1as7l3ibikdjtorun5pl1b2riq4v9mvh.apps.googleusercontent.com",
  });

  const signInWithGoogle = async () => {
    setAccessToken(response.authentication.accessToken);
    const { idToken, accessToken } = response.authentication;
    const credential = GoogleAuthProvider.credential(idToken, accessToken);
    await signInWithCredential(auth, credential);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const innerFunc = async () => {
        try {
          await signInWithGoogle();
        } catch (error) {
          console.log(error);
          setError(error);
        }
      };
      innerFunc();
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, promptAsync, request }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
