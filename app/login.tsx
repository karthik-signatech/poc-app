import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { markLoggedIn } from "../lib/auth";

export default function LoginScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    border: isDark ? "#2A2F38" : "#E3DFD7",
    heading: isDark ? "#E9EDF3" : "#1E293B",
    body: isDark ? "#A8B2C2" : "#8D97A8",
    muted: isDark ? "#8E97A8" : "#9CA3AF",
    inputBg: isDark ? "#171A1F" : "#FFFFFF",
    accent: "#0F7A5E",
  };

  const handleLogin = async () => {
    await markLoggedIn();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <View className="flex-1 px-5 pt-6 pb-8">
        <View className="flex-row items-center mb-5">
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center mr-3"
            style={{ backgroundColor: isDark ? "#1F3A31" : "#C7F0DD" }}
          >
            <Ionicons name="book-outline" size={28} color={isDark ? "#7EE2B8" : "#0F7A5E"} />
          </View>
          <View>
            <Text className="text-[24px] font-semibold" style={{ color: colors.heading }}>Lessyns</Text>
            <Text className="text-[12px] mt-0.5" style={{ color: colors.body }}>For educators, by educators</Text>
          </View>
        </View>

        <Text className="text-[24px] font-semibold mt-4" style={{ color: colors.heading }}>Welcome back</Text>
        <Text className="text-[14px] mt-1 mb-8" style={{ color: colors.body }}>
          Log in to continue your daily reset flow
        </Text>

        <View className="rounded-3xl p-4" style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}>
          <Text className="text-[14px] mb-2" style={{ color: colors.heading }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            className="rounded-2xl px-4 py-3.5 text-[15px] mb-4"
            style={{ backgroundColor: colors.inputBg, borderColor: colors.border, borderWidth: 1, color: colors.heading }}
          />

          <Text className="text-[14px] mb-2" style={{ color: colors.heading }}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor={colors.muted}
            secureTextEntry
            className="rounded-2xl px-4 py-3.5 text-[15px]"
            style={{ backgroundColor: colors.inputBg, borderColor: colors.border, borderWidth: 1, color: colors.heading }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Alert.alert("Forgot Password", "Password reset flow will be added next.")}
            className="self-start mt-3"
          >
            <Text className="text-[14px] font-medium" style={{ color: colors.accent }}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleLogin}
            className="rounded-2xl py-4 items-center mt-6"
            style={{ backgroundColor: colors.accent }}
          >
            <Text className="text-[15px] font-semibold" style={{ color: "#FFFFFF" }}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center mt-5">
          <Text className="text-[14px]" style={{ color: colors.body }}>New here? </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity activeOpacity={0.8}>
              <Text className="text-[14px] font-semibold" style={{ color: colors.accent }}>Create account</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
