import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { markLoggedOut } from "../../lib/auth";

const CHIPS = {
  grades: ["Middle (6-8)", "Elementary (K-5)"],
  stressors: ["Student behavior", "Colleague dynamics", "Workload overload"],
};

export default function ProfileScreen() {
  const isDark = useColorScheme() === "dark";
  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();

  const handleSignOut = async () => {
    await markLoggedOut();
    router.replace("../login");
  };

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    border: isDark ? "#2A2F38" : "#ECECEC",
    text: isDark ? "#E9EDF3" : "#1E293B",
    subtext: isDark ? "#A3ADBD" : "#7C879A",
    muted: isDark ? "#8E97A8" : "#9CA3AF",
    chipBg: isDark ? "#252932" : "#F3F4F6",
    actionBg: isDark ? "#1B1D20" : "#FFFFFF",
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: tabBarHeight + 18 }}
      >
        <View className="items-center mb-6">
          <View className="w-22 h-22 rounded-3xl bg-[#C7F0DD] items-center justify-center mb-4">
            <Ionicons name="person-outline" size={38} color="#0F7A5E" />
          </View>
          <Text className="text-[18px] font-semibold" style={{ color: colors.text }}>Edward DeShazer</Text>
          <Text className="text-[14px] mt-0.5" style={{ color: colors.subtext }}>ed@edwarddeshazer.org</Text>
        </View>

        <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}>
          <ProfileRow
            label="Role"
            value="Admin"
            icon={<MaterialCommunityIcons name="office-building-outline" size={22} color={colors.muted} />}
            colors={colors}
          />

          <Divider color={colors.border} />

          <View className="px-4 py-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-[14px]" style={{ color: colors.subtext }}>School Grades</Text>
              <Ionicons name="pencil-outline" size={18} color={colors.muted} />
            </View>
            <View className="flex-row flex-wrap gap-2">
              {CHIPS.grades.map((chip) => (
                <View key={chip} className="rounded-full px-3 py-1.5" style={{ backgroundColor: colors.chipBg }}>
                  <Text className="text-[14px]" style={{ color: colors.text }}>{chip}</Text>
                </View>
              ))}
            </View>
          </View>

          <Divider color={colors.border} />

          <ProfileRow
            label="Preferred Mode"
            value="Audio"
            icon={<Ionicons name="volume-medium-outline" size={22} color={colors.muted} />}
            colors={colors}
          />

          <Divider color={colors.border} />

          <ProfileRow
            label="Audio Voice"
            value="Female"
            icon={<Ionicons name="volume-medium-outline" size={22} color={colors.muted} />}
            colors={colors}
          />

          <Divider color={colors.border} />

          <View className="px-4 py-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-[14px]" style={{ color: colors.subtext }}>Top Stressors</Text>
              <Ionicons name="pencil-outline" size={18} color={colors.muted} />
            </View>
            <View className="flex-row flex-wrap gap-2">
              {CHIPS.stressors.map((chip) => (
                <View key={chip} className="rounded-full px-3 py-1.5" style={{ backgroundColor: colors.chipBg }}>
                  <Text className="text-[14px]" style={{ color: colors.text }}>{chip}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="mt-6 gap-3">
          <ActionRow
            label="Edit Schedule"
            leftIcon={<Ionicons name="time-outline" size={21} color="#0F7A5E" />}
            colors={colors}
            onPress={() => router.push("../edit-schedule")}
          />
          <ActionRow
            label="Edit Calendar"
            leftIcon={<Ionicons name="leaf-outline" size={21} color="#0F7A5E" />}
            colors={colors}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignOut}
            className="rounded-2xl px-4 py-4 flex-row items-center justify-center gap-2"
            style={{ backgroundColor: colors.actionBg, borderColor: colors.border, borderWidth: 1 }}
          >
            <Ionicons name="log-out-outline" size={18} color={colors.subtext} />
            <Text className="text-[16px] font-medium" style={{ color: colors.text }}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center mt-8 mb-3">
          <Text className="text-[16px]" style={{ color: colors.subtext }}>Lessyns</Text>
          <Text className="text-[12px] mt-1" style={{ color: colors.muted }}>For educators, by educators who care.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type ThemeColors = {
  cardBg: string;
  border: string;
  text: string;
  subtext: string;
  muted: string;
  actionBg: string;
};

function Divider({ color }: { color: string }) {
  return <View style={{ height: 1, backgroundColor: color }} />;
}

function ProfileRow({
  label,
  value,
  icon,
  colors,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  colors: ThemeColors;
}) {
  return (
    <View className="px-4 py-4 flex-row items-center">
      <View className="w-11 h-11 rounded-2xl items-center justify-center mr-3" style={{ backgroundColor: colors.actionBg }}>
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-[14px]" style={{ color: colors.subtext }}>{label}</Text>
        <Text className="text-[16px] font-semibold mt-0.5" style={{ color: colors.text }}>{value}</Text>
      </View>
      <Ionicons name="pencil-outline" size={18} color={colors.muted} />
    </View>
  );
}

function ActionRow({
  label,
  leftIcon,
  colors,
  onPress,
}: {
  label: string;
  leftIcon: React.ReactNode;
  colors: ThemeColors;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="rounded-2xl px-4 py-4 flex-row items-center"
      style={{ backgroundColor: colors.actionBg, borderColor: colors.border, borderWidth: 1 }}
    >
      <View className="w-11 h-11 rounded-2xl bg-[#C7F0DD] items-center justify-center mr-3">
        {leftIcon}
      </View>
      <Text className="flex-1 text-[16px] font-semibold" style={{ color: colors.text }}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </TouchableOpacity>
  );
}
