import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type JournalEntry = {
  id: string;
  type: string;
  date: string;
  details: string;
};

const JOURNAL_ENTRIES: JournalEntry[] = [
  { id: "1",  type: "End-of-Day Closeout", date: "May 15, 3:46 PM",  details: "Went well: 1\nLeaving behind: 3" },
  { id: "2",  type: "Morning Check-In",    date: "May 15, 3:18 PM",  details: "😊 Good\nEnergy Level: 3\nStress Level: 4\nToday I need: focus" },
  { id: "3",  type: "Morning Check-In",    date: "Apr 17, 5:32 PM",  details: "😊 Good\nEnergy Level: 3\nStress Level: 2" },
  { id: "4",  type: "Morning Check-In",    date: "Mar 19, 3:40 PM",  details: "😤 Frustrated\nEnergy Level: 4\nStress Level: 4\nToday I need: a snow day" },
  { id: "5",  type: "Morning Check-In",    date: "Mar 11, 6:11 PM",  details: "😊 Good\nEnergy Level: 5\nStress Level: 2\nToday I need: energy" },
  { id: "6",  type: "Morning Check-In",    date: "Mar 10, 2:40 PM",  details: "😤 Frustrated\nEnergy Level: 4\nStress Level: 3" },
  { id: "7",  type: "Morning Check-In",    date: "Mar 5, 7:50 PM",   details: "😐 Neutral\nEnergy Level: 2\nStress Level: 3\nToday I need: energy" },
  { id: "8",  type: "End-of-Day Closeout", date: "Feb 23, 5:20 PM",  details: "Went well: My students lesson was perfect\nLeaving behind: stress from parents" },
  { id: "9",  type: "Morning Check-In",    date: "Feb 23, 5:15 PM",  details: "😊 Good\nEnergy Level: 1\nStress Level: 3\nToday I need: energy" },
  { id: "10", type: "Morning Check-In",    date: "Jan 23, 5:50 PM",  details: "😊 Good\nEnergy Level: 3\nStress Level: 1" },
  { id: "11", type: "Morning Check-In",    date: "Jan 12, 3:31 PM",  details: "😊 Good\nEnergy Level: Mid\nStress Level: Low\nToday I need: patience." },
  { id: "12", type: "Weekend Intention",   date: "Jan 10, 10:08 PM", details: "Intention: to get the house clean so my mind is relaxed.\nRecharge activity: I will get a workout in." },
  { id: "13", type: "End-of-Day Closeout", date: "Jan 10, 5:07 AM",  details: "Went well: WE had a great lesson in Math.\nLeaving behind: frustration" },
];

export default function JournalScreen() {
  const isDark = useColorScheme() === "dark";
  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();
  const [_, setShowPrivate] = useState(false);

  const fonts = {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    semibold: "PlusJakartaSans_600SemiBold",
    bold: "PlusJakartaSans_700Bold",
  };

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    cardBorder: isDark ? "#2A2F38" : "#ECECEC",
    heading: isDark ? "#E9EDF3" : "#1E293B",
    body: isDark ? "#A8B2C2" : "#8D97A8",
    iconMuted: isDark ? "#A8B2C2" : "#6B7280",
    chevron: isDark ? "#5F6878" : "#D1D5DB",
    buttonBg: "#2D7A5E",
    buttonText: "#FFFFFF",
    streakBg: isDark ? "#1E2226" : "#F9F9F7",
    morningBg: isDark ? "#2B2410" : "#FEF3C7",
    eodBg: isDark ? "#0F1E36" : "#DBEAFE",
    insightBg: isDark ? "#162518" : "#E8F9EF",
    miniCardBg: isDark ? "#21252B" : "#F7F7F7",
    miniCardLine: isDark ? "#A8B2C2" : "#4B5563",
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <FlatList
        data={JOURNAL_ENTRIES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: tabBarHeight + 16, paddingHorizontal: 16 }}
        ListHeaderComponent={
          <>
            {/* Page header */}
            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 rounded-2xl bg-[#D1FADF] items-center justify-center mr-3">
                <Ionicons name="book-outline" size={24} color="#047857" />
              </View>
              <View>
                <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>Journal</Text>
                <Text className="text-[14px]" style={{ color: colors.body, fontFamily: fonts.regular }}>Track your week & check in</Text>
              </View>
            </View>

            {/* My Week card */}
            <View className="rounded-2xl p-4 mb-4" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: 1 }}>
              <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>My Week</Text>
              <Text className="text-[14px] mt-0.5 mb-4" style={{ color: "#2D9B6F", fontFamily: fonts.regular }}>Tap to check in</Text>

              {/* Streak row */}
              <View className="flex-row items-center justify-between rounded-xl px-3 py-3 mb-4" style={{ backgroundColor: colors.streakBg }}>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="flame" size={18} color="#F97316" />
                  <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>1 day streak</Text>
                </View>
                <Text className="text-[14px]" style={{ color: colors.body, fontFamily: fonts.regular }}>Longest: 2</Text>
              </View>

              <Text className="text-[14px] mb-4" style={{ color: colors.body, fontFamily: fonts.regular }}>
                New streak starts today. You've got this.
              </Text>

              {/* Mood / Energy / Stress */}
              <View className="flex-row gap-3 mb-4">
                {[
                  { label: "Mood", value: "--" },
                  { label: "Energy", value: "--" },
                  { label: "Stress", value: "--" },
                ].map((item) => (
                  <View
                    key={item.label}
                    className="flex-1 rounded-2xl py-4 px-2 items-center"
                    style={{ backgroundColor: colors.miniCardBg }}
                  >
                    <Text className="text-[14px]" style={{ color: colors.body, fontFamily: fonts.regular }}>{item.label}</Text>
                    <Text className="text-[14px] leading-[28px] mt-1" style={{ color: colors.miniCardLine, fontFamily: fonts.medium }}>{item.value}</Text>
                    <Text className="text-[14px] mt-2" style={{ color: colors.body, fontFamily: fonts.regular }}>
                      - -
                    </Text>
                  </View>
                ))}
              </View>

              {/* Insight */}
              <View className="rounded-xl px-3 py-3 mb-4" style={{ backgroundColor: colors.insightBg }}>
                <Text className="text-[14px] mb-1" style={{ color: "#2D7A5E", fontFamily: fonts.bold }}>One insight</Text>
                <Text className="text-[14px]" style={{ color: colors.body, fontFamily: fonts.regular }}>Keep checking in to see patterns emerge.</Text>
              </View>

              {/* Start Check-In */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push("../checkin-streak")}
                className="rounded-2xl py-4 mb-4 items-center"
                style={{ backgroundColor: colors.buttonBg }}
              >
                <Text className="text-[14px]" style={{ color: colors.buttonText, fontFamily: fonts.bold }}>Start Check-In</Text>
              </TouchableOpacity>

              {/* Privacy notice */}
              <View className="rounded-xl px-3 py-3 mb-4" style={{ backgroundColor: isDark ? "#151B2A" : "#EBF4FF" }}>
                <Text className="text-[14px]" style={{ color: isDark ? "#8B9BB4" : "#3B6EA8", fontFamily: fonts.regular }}>
                  Keep this private to you. Avoid student names or identifying details.
                </Text>
              </View>

              {/* Morning Check-In */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/morning-checkin")}
                className="rounded-2xl p-4 mb-3 flex-row items-center"
                style={{ backgroundColor: colors.morningBg }}
              >
                <View className="w-11 h-11 rounded-xl bg-[#FDE68A] items-center justify-center mr-3">
                  <Ionicons name="sunny-outline" size={20} color="#D97706" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>Morning Check-In</Text>
                  <Text className="text-[14px] mt-0.5" style={{ color: colors.body, fontFamily: fonts.regular }}>Start your day with intention</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.chevron} />
              </TouchableOpacity>

              {/* End-of-Day Closeout */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="rounded-2xl p-4 flex-row items-center"
                style={{ backgroundColor: colors.eodBg }}
              >
                <View className="w-11 h-11 rounded-xl bg-[#BFDBFE] items-center justify-center mr-3">
                  <Ionicons name="moon-outline" size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>End-of-Day Closeout</Text>
                  <Text className="text-[14px] mt-0.5" style={{ color: colors.body, fontFamily: fonts.regular }}>Reflect and release the day</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.chevron} />
              </TouchableOpacity>
            </View>

            {/* My Check-Ins header */}
            <Text className="text-[12px] tracking-widest uppercase mt-4 mb-3" style={{ color: colors.body, fontFamily: fonts.semibold }}>
              My Check-Ins
            </Text>
          </>
        }
        renderItem={({ item }: { item: JournalEntry }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className="rounded-2xl px-4 py-4 mb-3"
            style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: 1 }}
          >
            <View className="flex-row items-center mb-2">
              <View className="rounded-full px-3 py-1" style={{ backgroundColor: item.type === "Morning Check-In" ? "#FEF3C7" : item.type === "End-of-Day Closeout" ? "#DBEAFE" : "#F3E8FF" }}>
                <Text className="text-[12px]" style={{ color: item.type === "Morning Check-In" ? "#D97706" : item.type === "End-of-Day Closeout" ? "#3B82F6" : "#7C3AED", fontFamily: fonts.medium }}>
                  {item.type}
                </Text>
              </View>
              <Text className="text-[12px] ml-2.5 flex-1" style={{ color: colors.body, fontFamily: fonts.regular }}>{item.date}</Text>
              <TouchableOpacity activeOpacity={0.7} className="p-1 -mr-1">
                <Ionicons name="trash-outline" size={16} color={colors.iconMuted} />
              </TouchableOpacity>
            </View>
            {item.details.split("\n").map((line, i) => (
              <Text key={i} className="text-[14px]" style={{ color: colors.body, fontFamily: fonts.regular }}>{line}</Text>
            ))}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}


