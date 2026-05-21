import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BELL_TO_BELL = [
  {
    id: "1",
    title: "Before First Bell",
    time: "6:30-7:30 AM",
    icon: "weather-sunset-up",
    library: "mci",
    active: true,
  },
  { id: "2", title: "Between Classes", time: "Throughout the day", icon: "time-outline", library: "ion", active: false },
  { id: "3", title: "Midday Slump", time: "11:00 AM - 2:00 PM", icon: "cafe-outline", library: "ion", active: false },
  { id: "4", title: "After a Hard Moment", time: "Anytime", icon: "heart-outline", library: "ion", active: false },
  { id: "5", title: "Before a Parent Call", time: "Anytime", icon: "call-outline", library: "ion", active: false },
  { id: "6", title: "After Dismissal", time: "3:00-4:00 PM", icon: "door-sliding-open", library: "mci", active: false },
  { id: "7", title: "Before Home", time: "4:00-6:00 PM", icon: "home-outline", library: "ion", active: false },
  { id: "8", title: "Before Sleep", time: "9:00-11:00 PM", icon: "moon-outline", library: "ion", active: false },
];

export default function HomeScreen() {
  const isDark = useColorScheme() === "dark";
  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    heading: isDark ? "#E9EDF3" : "#1E293B",
    secondary: isDark ? "#A3ADBD" : "#9CA3AF",
    iconMuted: isDark ? "#8E97A8" : "#6B7280",
    chevronMuted: isDark ? "#5C6575" : "#D1D5DB",
    activeCardBg: isDark ? "#17352D" : "#E6F5EE",
    activeCardBorder: isDark ? "#245747" : "#A8DFC5",
    activeTitle: "#2D7A5E",
    activeSubtitle: "#4CAF87",
  };

  const fonts = {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    semibold: "PlusJakartaSans_600SemiBold",
    bold: "PlusJakartaSans_700Bold",
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 12 }}
      >
        <View className="flex-row items-center gap-3 mt-4 mb-5">
          <View className="w-12 h-12 rounded-xl bg-[#2D7A5E] items-center justify-center">
            <Ionicons name="leaf" size={22} color="white" />
          </View>
          <View>
            <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>
              Good morning, <Text className="text-[#2D9B6F]">Edward</Text>
            </Text>
            <Text className="text-[12px]" style={{ color: colors.secondary, fontFamily: fonts.regular }}>Take a reset when you need it</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("../hard-moment")}
          className="rounded-3xl bg-[#C17A50] px-5 py-6 mb-7 flex-row items-center overflow-hidden"
        >
          <View className="w-12 h-12 rounded-full border-2 border-white/40 items-center justify-center mr-4">
            <Ionicons name="alert-circle-outline" size={26} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-white text-[14px]" style={{ fontFamily: fonts.bold }}>Hard Moment?</Text>
            <Text className="text-white/80 text-[12px] mt-1" style={{ fontFamily: fonts.regular }}>Get an instant reset + script</Text>
          </View>
          <View className="absolute right-[-20px] top-[-20px] w-28 h-28 rounded-full bg-white/10" />
          <View className="absolute right-6 bottom-[-30px] w-20 h-20 rounded-full bg-white/10" />
        </TouchableOpacity>

        <Text className="text-[10px] tracking-widest uppercase mb-3 ml-1" style={{ color: colors.secondary, fontFamily: fonts.semibold }}>
          Bell to Bell
        </Text>

        <View className="gap-3">
          {BELL_TO_BELL.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                if (item.id === "4") {
                  router.push("../hard-moment");
                }
              }}
              activeOpacity={0.7}
              className="flex-row items-center rounded-2xl px-4 py-4"
              style={{
                backgroundColor: item.active ? colors.activeCardBg : colors.cardBg,
                borderColor: item.active ? colors.activeCardBorder : "transparent",
                borderWidth: 1,
                shadowColor: "#000",
                shadowOpacity: isDark ? 0 : 0.04,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: isDark ? 0 : 1,
              }}
            >
              <View className="w-11 h-11 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: item.active ? "#2D7A5E" : isDark ? "#252932" : "#F3F4F6" }}>
                {item.active ? (
                  <MaterialCommunityIcons name="weather-sunset-up" size={22} color="white" />
                ) : item.library === "mci" ? (
                  <MaterialCommunityIcons name={item.icon as any} size={22} color={colors.iconMuted} />
                ) : (
                  <Ionicons name={item.icon as any} size={22} color={colors.iconMuted} />
                )}
              </View>
              <View className="flex-1">
                <Text
                  className="text-[13px]"
                  style={{ color: item.active ? colors.activeTitle : colors.heading, fontFamily: fonts.bold }}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-[12px] mt-1"
                  style={{ color: item.active ? colors.activeSubtitle : colors.secondary, fontFamily: fonts.regular }}
                >
                  {item.time}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={item.active ? "#2D7A5E" : colors.chevronMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


