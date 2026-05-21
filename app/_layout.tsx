import "../global.css";

import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, useColorScheme } from "react-native";

let typographyDefaultsApplied = false;

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  if (fontsLoaded && !typographyDefaultsApplied) {
    Text.defaultProps = Text.defaultProps ?? {};
    Text.defaultProps.style = [
      { fontFamily: "PlusJakartaSans_400Regular" },
      Text.defaultProps.style,
    ];

    TextInput.defaultProps = TextInput.defaultProps ?? {};
    TextInput.defaultProps.style = [
      { fontFamily: "PlusJakartaSans_400Regular" },
      TextInput.defaultProps.style,
    ];

    typographyDefaultsApplied = true;
  }

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? "#121315" : "#F5F4EF",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDark ? "#1F3A31" : "#C7F0DD",
            marginBottom: 14,
          }}
        >
          <Ionicons name="book-outline" size={30} color={isDark ? "#7EE2B8" : "#0F7A5E"} />
        </View>
        <Text style={{ color: isDark ? "#E9EDF3" : "#1E293B", fontSize: 24, fontFamily: "PlusJakartaSans_700Bold" }}>Lessyns</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={isDark ? "#121315" : "#F5F4EF"}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}


