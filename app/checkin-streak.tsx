import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WEEK_ROWS = [
  ["8", "9", "10", "11", "12", "13", "14"],
  ["15", "16", "17", "18", "19", "20", "21"],
];

const DAY_LABELS = ["F", "S", "S", "M", "T", "W", "T"];
const CALENDAR_CELL_SIZE = 44;
const CALENDAR_CELL_GAP = 4;

export default function CheckinStreakScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    border: isDark ? "#2A2F38" : "#ECECEC",
    heading: isDark ? "#E9EDF3" : "#1E293B",
    body: isDark ? "#A8B2C2" : "#8D97A8",
    muted: isDark ? "#8E97A8" : "#A5A09A",
    tileBg: isDark ? "#21252B" : "#F6F6F6",
    tileText: isDark ? "#9BA4B4" : "#C7C3BD",
    accent: "#0F7A5E",
    flame: "#F97316",
  };

  const fonts = {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    bold: "PlusJakartaSans_700Bold",
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.75} className="p-1 mr-2">
            <Ionicons name="chevron-back" size={22} color={colors.heading} />
          </TouchableOpacity>
          <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            Check-in Streak
          </Text>
        </View>

        <View
          className="rounded-3xl items-center px-4 py-7 mb-5"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
        >
          <Ionicons name="flame-outline" size={54} color={colors.flame} />
          <Text className="text-[48px] leading-[52px] mt-2" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            1
          </Text>
          <Text className="text-[14px] mt-1" style={{ color: colors.heading, fontFamily: fonts.medium }}>
            day streak
          </Text>
          <Text className="text-[14px] mt-4" style={{ color: colors.body, fontFamily: fonts.regular }}>
            Longest: 2 days
          </Text>
        </View>

        <View
          className="rounded-3xl px-4 py-5 mb-5"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
        >
          <Text className="text-[14px] mb-4" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            Last 14 Days
          </Text>

          <View className="mt-2">
            {WEEK_ROWS.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} className="mb-4">
                <View className="flex-row mb-2">
                  {DAY_LABELS.map((day, idx) => (
                    <Text
                      key={`day-${rowIndex}-${day}-${idx}`}
                      className="text-[14px]"
                      style={{
                        color: colors.muted,
                        fontFamily: fonts.regular,
                        width: CALENDAR_CELL_SIZE,
                        marginRight: idx === DAY_LABELS.length - 1 ? 0 : CALENDAR_CELL_GAP,
                        textAlign: "center",
                      }}
                    >
                      {day}
                    </Text>
                  ))}
                </View>

                <View className="flex-row">
                  {row.map((date, idx) => {
                    const checked = rowIndex === 1 && idx === 0;
                    return (
                      <View
                        key={`${rowIndex}-${date}`}
                        className="rounded-xl items-center justify-center"
                        style={{
                          width: CALENDAR_CELL_SIZE,
                          height: CALENDAR_CELL_SIZE,
                          marginRight: idx === row.length - 1 ? 0 : CALENDAR_CELL_GAP,
                          backgroundColor: checked ? colors.accent : colors.tileBg,
                        }}
                      >
                        {checked ? (
                          <Ionicons name="checkmark" size={22} color="#FFFFFF" />
                        ) : (
                          <Text className="text-[14px]" style={{ color: colors.tileText, fontFamily: fonts.medium }}>
                            {date}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View
          className="rounded-3xl px-4 py-5 mb-5"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
        >
          <Text className="text-[14px] mb-2" style={{ color: colors.heading, fontFamily: fonts.bold }}>
            How streaks work
          </Text>
          <Text className="text-[14px] mb-2" style={{ color: colors.heading, fontFamily: fonts.regular }}>
            - One check-in per day keeps your streak
          </Text>
          <Text className="text-[14px] mb-2" style={{ color: colors.heading, fontFamily: fonts.regular }}>
            - Miss a day and it resets
          </Text>
          <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.regular }}>
            - Check in anytime before midnight
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/morning-checkin")}
          className="rounded-2xl py-4 items-center"
          style={{ backgroundColor: colors.accent }}
        >
          <Text className="text-[14px]" style={{ color: "#FFFFFF", fontFamily: fonts.bold }}>
            Start Check-In
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


