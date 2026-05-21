import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HardMomentItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const HARD_MOMENTS: HardMomentItem[] = [
  { id: "1", title: "Student Conflict", subtitle: "Challenging student interaction", icon: "account-group-outline" },
  { id: "2", title: "Parent Email Trigger", subtitle: "Difficult parent communication", icon: "email-outline" },
  { id: "3", title: "Admin Stress", subtitle: "Pressure from administration", icon: "file-document-multiple-outline" },
  { id: "4", title: "Overstimulated", subtitle: "Sensory overload from noise/chaos", icon: "lightning-bolt-outline" },
  { id: "5", title: "Behind on Work", subtitle: "Feeling overwhelmed by tasks", icon: "clock-outline" },
  { id: "6", title: "Tough Colleague Moment", subtitle: "Difficult peer interaction", icon: "account-alert-outline" },
  { id: "7", title: "Parent Conflict", subtitle: "Confrontation with an upset parent", icon: "account-multiple-outline" },
  { id: "8", title: "Family Stress", subtitle: "Personal family challenges affecting work", icon: "account-group-outline" },
  { id: "9", title: "Classroom Chaos", subtitle: "Loss of classroom control", icon: "account-group-outline" },
  { id: "10", title: "Testing Pressure", subtitle: "Stress from standardized testing", icon: "account-group-outline" },
  { id: "11", title: "Meeting Fatigue", subtitle: "Exhaustion from back-to-back meetings", icon: "account-clock-outline" },
  { id: "12", title: "Lesson Failed", subtitle: "When a lesson completely bombs", icon: "account-group-outline" },
  { id: "13", title: "Technology Fail", subtitle: "Tech breakdown during instruction", icon: "account-group-outline" },
  { id: "14", title: "Student Crisis", subtitle: "Student emotional or behavioral emergency", icon: "account-group-outline" },
  { id: "15", title: "Lack of Resources", subtitle: "Not enough supplies or support", icon: "account-group-outline" },
  { id: "16", title: "Interrupted Prep", subtitle: "Planning time constantly interrupted", icon: "account-group-outline" },
];

export default function HardMomentScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    cardBorder: isDark ? "#2A2F38" : "#E4E1DB",
    text: isDark ? "#E9EDF3" : "#111827",
    subtext: isDark ? "#A3ADBD" : "#6B7280",
    iconBg: isDark ? "#252932" : "#F3F3F3",
    iconColor: isDark ? "#A3ADBD" : "#7B776F",
    progressBg: isDark ? "#2A2F38" : "#E4E1DB",
    progressActive: "#E8486A",
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="mr-2 p-1">
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <Text className="text-[20px] font-semibold" style={{ color: colors.text }}>
            Hard Moment
          </Text>
        </View>

        <View className="flex-row items-center gap-2 mb-7">
          <View className="h-1 flex-1 rounded-full" style={{ backgroundColor: colors.progressActive }} />
          <View className="h-1 flex-1 rounded-full" style={{ backgroundColor: colors.progressBg }} />
        </View>

        <Text className="text-[20px] font-medium" style={{ color: colors.text }}>
          What happened?
        </Text>
        <Text className="text-[14px] mt-1 mb-5" style={{ color: colors.subtext }}>
          We'll find the right reset for you
        </Text>

        <View className="gap-3 pb-2">
          {HARD_MOMENTS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              className="rounded-2xl p-4 flex-row items-center"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
                borderWidth: 1,
              }}
            >
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                style={{ backgroundColor: colors.iconBg }}
              >
                <MaterialCommunityIcons name={item.icon} size={26} color={colors.iconColor} />
              </View>
              <View className="flex-1 pr-2">
                <Text className="text-[16px] font-semibold" style={{ color: colors.text }}>
                  {item.title}
                </Text>
                <Text className="text-[14px] mt-0.5" style={{ color: colors.subtext }}>
                  {item.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
