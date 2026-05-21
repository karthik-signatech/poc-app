import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { isLoggedIn } from "../lib/auth";

export default function AppEntry() {
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F5F4EF" }}>
        <ActivityIndicator color="#0F7A5E" />
      </View>
    );
  }

  return <Redirect href={loggedIn ? "/(tabs)" : "./login"} />;
}