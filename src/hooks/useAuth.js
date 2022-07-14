import { View, Text } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const [request, response, logIn] = Google.useAuthRequest({
    expoClientId:
      "824542813966-1as7l3ibikdjtorun5pl1b2riq4v9mvh.apps.googleusercontent.com",
  });

  const logOut = () => {
    setLoading(true);
    try {
      signOut(auth);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setAccessToken(response.authentication.accessToken);
    const { idToken, accessToken } = response.authentication;
    const credential = GoogleAuthProvider.credential(idToken, accessToken);
    await signInWithCredential(auth, credential);
  };

  const memoedValue = useMemo(() => {
    return {
      user,
      loading,
      error,
      request,
      logIn,
      logOut,
    };
  }, [user, loading, error, request]);

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
      setLoading(true);
      const innerFunc = async () => {
        try {
          await signInWithGoogle();
        } catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      innerFunc();
    }
  }, [response]);

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
