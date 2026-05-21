import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOODS = [
  { label: "Calm",      emoji: "😌" },
  { label: "Good",      emoji: "😊" },
  { label: "Neutral",   emoji: "😐" },
  { label: "Stressed",  emoji: "😟" },
  { label: "Frustrated",emoji: "😤" },
  { label: "Exhausted", emoji: "😴" },
];

export default function MorningCheckinScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const [mood, setMood]           = useState<string | null>(null);
  const [energy, setEnergy]       = useState<number | null>(null);
  const [stress, setStress]       = useState<number | null>(null);
  const [todayINeed, setTodayINeed] = useState("");

  const colors = {
    screenBg:     isDark ? "#121315" : "#F5F4EF",
    cardBg:       isDark ? "#1B1D20" : "#FFFFFF",
    cardBorder:   isDark ? "#2A2F38" : "#ECECEC",
    heading:      isDark ? "#E9EDF3" : "#1E293B",
    body:         isDark ? "#A8B2C2" : "#8D97A8",
    inputBg:      isDark ? "#1B1D20" : "#FFFFFF",
    inputBorder:  isDark ? "#2A2F38" : "#DEDEDE",
    inputText:    isDark ? "#E9EDF3" : "#1E293B",
    placeholder:  isDark ? "#5F6878" : "#B0B8C5",
    tilesBg:      isDark ? "#1E2226" : "#F3EDE3",
    tilesBorder:  isDark ? "#2A2F38" : "#E8E0D0",
    tilesActive:  isDark ? "#2D4A3E" : "#D1FAE5",
    tilesActiveBorder: "#2D7A5E",
    numBg:        isDark ? "#1E2226" : "#F3EDE3",
    numBorder:    isDark ? "#2A2F38" : "#E8E0D0",
    numActiveBg:  "#2D7A5E",
    numActiveText:"#FFFFFF",
    numText:      isDark ? "#E9EDF3" : "#1E293B",
    accent:       "#2D9B6F",
  };

  const fonts = {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    bold: "PlusJakartaSans_700Bold",
  };

  const handleSave = () => {
    // TODO: persist entry
    router.back();
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 pt-2 pb-4">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="mr-3 p-1">
            <Ionicons name="chevron-back" size={24} color={colors.heading} />
          </TouchableOpacity>
          <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            Morning Check-In
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* How are you feeling? */}
          <Text className="text-[14px] mb-3" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            How are you feeling?
          </Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            {MOODS.map((m) => {
              const active = mood === m.label;
              return (
                <TouchableOpacity
                  key={m.label}
                  activeOpacity={0.75}
                  onPress={() => setMood(m.label)}
                  className="rounded-2xl items-center justify-center py-4"
                  style={{
                    width: "30%",
                    backgroundColor: active ? colors.tilesActive : colors.cardBg,
                    borderWidth: 1.5,
                    borderColor: active ? colors.tilesActiveBorder : colors.cardBorder,
                  }}
                >
                  <Text style={{ fontSize: 34 }}>{m.emoji}</Text>
                  <Text
                    className="text-[14px] mt-1.5"
                    style={{ color: active ? "#2D7A5E" : colors.body, fontFamily: fonts.medium }}
                  >
                    {m.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Energy Level */}
          <Text className="text-[14px] mb-1" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            Energy Level
          </Text>
          <Text className="text-[14px] mb-3" style={{ color: colors.accent, fontFamily: fonts.regular }}>
            1 = Low, 5 = High
          </Text>
          <View className="flex-row justify-between mb-6">
            {[1, 2, 3, 4, 5].map((n) => {
              const active = energy === n;
              return (
                <TouchableOpacity
                  key={n}
                  activeOpacity={0.75}
                  onPress={() => setEnergy(n)}
                  className="rounded-2xl items-center justify-center"
                  style={{
                    width: "18%",
                    aspectRatio: 1,
                    backgroundColor: active ? colors.numActiveBg : colors.numBg,
                    borderWidth: 1.5,
                    borderColor: active ? colors.tilesActiveBorder : colors.numBorder,
                  }}
                >
                  <Text
                    className="text-[14px]"
                    style={{ color: active ? colors.numActiveText : colors.numText, fontFamily: fonts.bold }}
                  >
                    {n}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Stress Level */}
          <Text className="text-[14px] mb-1" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            Stress Level
          </Text>
          <Text className="text-[14px] mb-3" style={{ color: colors.accent, fontFamily: fonts.regular }}>
            1 = Low, 5 = High
          </Text>
          <View className="flex-row justify-between mb-6">
            {[1, 2, 3, 4, 5].map((n) => {
              const active = stress === n;
              return (
                <TouchableOpacity
                  key={n}
                  activeOpacity={0.75}
                  onPress={() => setStress(n)}
                  className="rounded-2xl items-center justify-center"
                  style={{
                    width: "18%",
                    aspectRatio: 1,
                    backgroundColor: active ? colors.numActiveBg : colors.numBg,
                    borderWidth: 1.5,
                    borderColor: active ? colors.tilesActiveBorder : colors.numBorder,
                  }}
                >
                  <Text
                    className="text-[14px]"
                    style={{ color: active ? colors.numActiveText : colors.numText, fontFamily: fonts.bold }}
                  >
                    {n}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Today I need */}
          <Text className="text-[14px] mb-3" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            Today I need...
          </Text>
          <TextInput
            value={todayINeed}
            onChangeText={setTodayINeed}
            placeholder="patience, energy, focus..."
            placeholderTextColor={colors.placeholder}
            className="rounded-2xl px-4 py-4 text-[14px] mb-8"
            style={{
              backgroundColor: colors.inputBg,
              borderWidth: 1,
              borderColor: colors.inputBorder,
              color: colors.inputText,
              fontFamily: fonts.regular,
            }}
          />

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.back()}
              className="flex-1 rounded-2xl py-4 items-center border"
              style={{ borderColor: colors.cardBorder, backgroundColor: colors.cardBg }}
            >
                <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              className="flex-[2] rounded-2xl py-4 flex-row items-center justify-center gap-2"
              style={{ backgroundColor: "#2D7A5E" }}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              <Text className="text-[14px]" style={{ color: "#FFFFFF", fontFamily: fonts.bold }}>
                Save Check-In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


