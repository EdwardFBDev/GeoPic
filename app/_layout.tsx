import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogbookProvider } from "../src/context/LogbookContext";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LogbookProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{ headerShown: false }}
        />
      </LogbookProvider>
    </SafeAreaProvider>
  );
}