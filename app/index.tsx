import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, useColorScheme } from "react-native";

import { isLoggedIn } from "../lib/auth";

export default function AppEntry() {
  const isDark = useColorScheme() === "dark";
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const value = await isLoggedIn();
      if (!mounted) {
        return;
      }
      setLoggedIn(value);
      setReady(true);
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDark ? "#121315" : "#F5F4EF",
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

  return <Redirect href={loggedIn ? "/(tabs)" : "./login"} />;
}

