import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import { AuthProvider } from "./src/hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}
