import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FavoriteItem = {
  id: string;
  title: string;
  duration: string;
};

type FavoritesData = {
  resets: FavoriteItem[];
  scripts: FavoriteItem[];
};

const FAVORITES: FavoritesData = {
  resets: [
    { id: "1", title: "Quick Calm", duration: "30s" },
    { id: "2", title: "Work Worry Release", duration: "2m" },
    { id: "3", title: "Parking Lot Pause", duration: "1m" },
  ],
  scripts: [
    { id: "1", title: "Morning Motivation", duration: "5m" },
  ],
};

export default function FavoritesScreen() {
  const isDark = useColorScheme() === "dark";
  const tabBarHeight = useBottomTabBarHeight();
  const [activeTab, setActiveTab] = useState<keyof FavoritesData>("resets");

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    cardBorder: isDark ? "#2A2F38" : "#ECECEC",
    heading: isDark ? "#E9EDF3" : "#1E293B",
    body: isDark ? "#A8B2C2" : "#8D97A8",
    iconMuted: isDark ? "#A8B2C2" : "#6B7280",
    chevron: isDark ? "#5F6878" : "#D1D5DB",
    segmentBg: isDark ? "#1A1D22" : "#EEEEEE",
    segmentActive: isDark ? "#262B33" : "#FFFFFF",
    segmentText: isDark ? "#A8B2C2" : "#687386",
    segmentTextActive: isDark ? "#E9EDF3" : "#111827",
  };

  const fonts = {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    semibold: "PlusJakartaSans_600SemiBold",
    bold: "PlusJakartaSans_700Bold",
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <FlatList
        data={FAVORITES[activeTab]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: tabBarHeight + 16, paddingHorizontal: 16 }}
        ListHeaderComponent={
          <>
            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 rounded-2xl bg-[#F7DDE2] items-center justify-center mr-3">
                <Ionicons name="heart-outline" size={24} color="#F05268" />
              </View>
              <View>
                <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>Favorites</Text>
                <Text className="text-[12px]" style={{ color: colors.body, fontFamily: fonts.regular }}>Your saved resets & scripts</Text>
              </View>
            </View>

            <View className="rounded-2xl p-1 mb-5" style={{ backgroundColor: colors.segmentBg }}>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => setActiveTab("resets")}
                  className="flex-1 rounded-xl py-3 items-center"
                  style={{ backgroundColor: activeTab === "resets" ? colors.segmentActive : "transparent" }}
                >
                  <Text
                    className="text-[13px]"
                    style={{ color: activeTab === "resets" ? colors.segmentTextActive : colors.segmentText, fontFamily: fonts.bold }}
                  >
                    Resets ({FAVORITES.resets.length})
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab("scripts")}
                  className="flex-1 rounded-xl py-3 items-center"
                  style={{ backgroundColor: activeTab === "scripts" ? colors.segmentActive : "transparent" }}
                >
                  <Text
                    className="text-[13px]"
                    style={{ color: activeTab === "scripts" ? colors.segmentTextActive : colors.segmentText, fontFamily: fonts.medium }}
                  >
                    Scripts ({FAVORITES.scripts.length})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        renderItem={({ item }: { item: FavoriteItem }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className="rounded-2xl px-4 py-5 mb-3"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder,
              borderWidth: 1,
            }}
          >
            <View className="flex-row items-center">
              <Text className="flex-1 text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.chevron} />
            </View>
            <View className="mt-2 flex-row items-center">
              <Ionicons name="time-outline" size={15} color={colors.iconMuted} />
              <Text className="ml-2 text-[12px]" style={{ color: colors.body, fontFamily: fonts.regular }}>{item.duration}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}


