import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditScheduleScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();
  const [periods, setPeriods] = useState(5);
  const [nudgeTimes, setNudgeTimes] = useState<string[]>([]);

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    border: isDark ? "#2A2F38" : "#E3DFD7",
    heading: isDark ? "#E9EDF3" : "#1E293B",
    body: isDark ? "#A8B2C2" : "#8D97A8",
    muted: isDark ? "#8E97A8" : "#9CA3AF",
    iconBg: isDark ? "#1A3A31" : "#C7F0DD",
    iconColor: "#0F7A5E",
    action: "#0F7A5E",
    actionBg: "#0F7A5E",
    actionText: "#FFFFFF",
  };

  const fonts = {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    bold: "PlusJakartaSans_700Bold",
  };

  const addNudge = () => {
    const defaults = ["10:15 AM", "01:30 PM", "03:45 PM"];
    const next = defaults[nudgeTimes.length] ?? "04:30 PM";
    setNudgeTimes((prev) => [...prev, next]);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 24 }}
      >
        <View className="w-16 h-16 rounded-3xl items-center justify-center mb-6" style={{ backgroundColor: colors.iconBg }}>
          <Ionicons name="time-outline" size={31} color={colors.iconColor} />
        </View>

        <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.medium }}>Set up your schedule</Text>
        <Text className="text-[14px] mt-1 mb-8" style={{ color: colors.body, fontFamily: fonts.regular }}>We'll tailor resets to your school day</Text>

        <View className="flex-row gap-4 mb-6">
          <View className="flex-1">
            <Text className="text-[14px] mb-2" style={{ color: colors.heading, fontFamily: fonts.bold }}>First Bell</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              className="rounded-2xl px-4 py-4 flex-row items-center"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
            >
              <Text className="text-[14px] flex-1" style={{ color: colors.heading, fontFamily: fonts.bold }}>08:00 AM</Text>
              <Ionicons name="time-outline" size={19} color={colors.heading} />
            </TouchableOpacity>
          </View>

          <View className="flex-1">
            <Text className="text-[14px] mb-2" style={{ color: colors.heading, fontFamily: fonts.bold }}>Dismissal</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              className="rounded-2xl px-4 py-4 flex-row items-center"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
            >
              <Text className="text-[14px] flex-1" style={{ color: colors.heading, fontFamily: fonts.bold }}>03:00 PM</Text>
              <Ionicons name="time-outline" size={19} color={colors.heading} />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-[14px] mb-3" style={{ color: colors.heading, fontFamily: fonts.bold }}>Number of Periods</Text>
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPeriods((p) => Math.max(1, p - 1))}
            className="w-14 h-14 rounded-2xl items-center justify-center"
            style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
          >
            <Text className="text-[14px]" style={{ color: colors.heading }}>-</Text>
          </TouchableOpacity>

          <Text className="text-[34px] leading-[38px] mx-8" style={{ color: colors.heading, fontFamily: fonts.bold }}>{periods}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPeriods((p) => Math.min(10, p + 1))}
            className="w-14 h-14 rounded-2xl items-center justify-center"
            style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
          >
            <Text className="text-[14px]" style={{ color: colors.heading }}>+</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-[14px] mb-2" style={{ color: colors.heading, fontFamily: fonts.bold }}>Lunch Time</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          className="rounded-2xl px-4 py-4 flex-row items-center mb-8"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
        >
          <Text className="text-[14px] flex-1" style={{ color: colors.heading, fontFamily: fonts.bold }}>11:30 AM</Text>
          <Ionicons name="time-outline" size={19} color={colors.heading} />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>Nudge Times (optional)</Text>
          <TouchableOpacity onPress={addNudge} activeOpacity={0.8} className="flex-row items-center gap-2">
            <Ionicons name="add" size={18} color={colors.action} />
            <Text className="text-[14px]" style={{ color: colors.action, fontFamily: fonts.bold }}>Add</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-[12px] mb-4" style={{ color: colors.muted, fontFamily: fonts.regular }}>Get gentle reminders to take a reset</Text>

        <View className="gap-2 mb-8">
          {nudgeTimes.map((time, idx) => (
            <View
              key={`${time}-${idx}`}
              className="rounded-xl px-3 py-3 flex-row items-center"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
            >
              <Text className="text-[14px] flex-1" style={{ color: colors.heading, fontFamily: fonts.regular }}>{time}</Text>
              <TouchableOpacity onPress={() => setNudgeTimes((prev) => prev.filter((_, i) => i !== idx))}>
                <Ionicons name="close-circle" size={18} color={colors.muted} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          className="rounded-2xl py-4 flex-row items-center justify-center gap-2"
          style={{ backgroundColor: colors.actionBg }}
        >
          <Ionicons name="checkmark" size={18} color={colors.actionText} />
          <Text className="text-[14px]" style={{ color: colors.actionText, fontFamily: fonts.bold }}>Save & Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


