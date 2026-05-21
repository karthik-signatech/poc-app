import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Category = "All" | "Parent" | "Student" | "Admin" | "Colleague" | "Boundaries" | "Culture" | "Change" | "Safety";
type Tone = "All" | "Warm" | "Firm" | "Neutral";

type ScriptItem = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  tone: Exclude<Tone, "All">;
};

const CATEGORIES: Category[] = ["All", "Parent", "Student", "Admin", "Colleague", "Boundaries", "Culture", "Change", "Safety"];
const TONES: Tone[] = ["All", "Warm", "Firm", "Neutral"];

const SCRIPT_ITEMS: ScriptItem[] = [
  { id: "1", title: "Inviting Input on Culture", category: "Culture", tone: "Neutral" },
  { id: "2", title: "De-escalating a Safety Situation", category: "Safety", tone: "Warm" },
  { id: "3", title: "Addressing Resistance to Change", category: "Change", tone: "Firm" },
  { id: "4", title: "Addressing Culture Concerns", category: "Culture", tone: "Neutral" },
  { id: "5", title: "Reframing Change as Growth", category: "Change", tone: "Firm" },
  { id: "6", title: "Acknowledging Safety Concerns from Staff", category: "Safety", tone: "Firm" },
  { id: "7", title: "Reinforcing Shared Values", category: "Culture", tone: "Firm" },
  { id: "8", title: "Reinforcing Shared Values", category: "Culture", tone: "Warm" },
  { id: "9", title: "Reframing Change as Growth", category: "Change", tone: "Neutral" },
  { id: "10", title: "Redirecting Off-Track Culture Conversations", category: "Culture", tone: "Warm" },
  { id: "11", title: "Celebrating Culture Wins", category: "Culture", tone: "Firm" },
  { id: "12", title: "Addressing Safety Policy Pushback", category: "Safety", tone: "Warm" },
  { id: "13", title: "Celebrating Culture Wins", category: "Culture", tone: "Neutral" },
  { id: "14", title: "Setting Tone for Culture Building", category: "Culture", tone: "Firm" },
];

export default function ScriptsScreen() {
  const isDark = useColorScheme() === "dark";
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeTone, setActiveTone] = useState<Tone>("All");

  const colors = {
    screenBg: isDark ? "#121315" : "#F5F4EF",
    cardBg: isDark ? "#1B1D20" : "#FFFFFF",
    border: isDark ? "#2A2F38" : "#E6E3DC",
    heading: isDark ? "#E9EDF3" : "#1E293B",
    body: isDark ? "#A8B2C2" : "#8D97A8",
    muted: isDark ? "#8E97A8" : "#9CA3AF",
    chipBg: isDark ? "#1F2329" : "#FFFFFF",
    chipText: isDark ? "#C8D0DE" : "#374151",
    chipActiveBg: "#0F7A5E",
    chipActiveText: "#FFFFFF",
    searchBg: isDark ? "#1B1D20" : "#FFFFFF",
  };

  const fonts = {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    semibold: "PlusJakartaSans_600SemiBold",
    bold: "PlusJakartaSans_700Bold",
  };

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return SCRIPT_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesTone = activeTone === "All" || item.tone === activeTone;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.tone.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesTone && matchesQuery;
    });
  }, [activeCategory, activeTone, query]);

  const toneTagColors = (tone: ScriptItem["tone"]) => {
    if (tone === "Warm") {
      return { bg: "#FEE7B7", text: "#B45309" };
    }
    if (tone === "Firm") {
      return { bg: "#FEE2E2", text: "#B91C1C" };
    }
    return { bg: "#ECECEC", text: "#374151" };
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.screenBg }} edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
      >
        <View className="flex-row items-center mb-5">
          <View className="w-12 h-12 rounded-2xl items-center justify-center mr-3" style={{ backgroundColor: "#C7F0DD" }}>
            <Ionicons name="book-outline" size={24} color="#0F7A5E" />
          </View>
          <View>
            <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.bold }}>Script Vault</Text>
            <Text className="text-[13px] mt-1" style={{ color: colors.body, fontFamily: fonts.regular }}>Words for tough moments</Text>
          </View>
        </View>

        <View
          className="rounded-2xl px-4 py-3.5 mb-5 flex-row items-center"
          style={{ backgroundColor: colors.searchBg, borderColor: colors.border, borderWidth: 1 }}
        >
          <Ionicons name="search-outline" size={20} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search scripts..."
            placeholderTextColor={colors.muted}
            className="ml-3 flex-1 text-[14px]"
            style={{ color: colors.heading, fontFamily: fonts.regular }}
          />
        </View>

        <Text className="text-[13px] mb-3" style={{ color: colors.heading, fontFamily: fonts.medium }}>Category</Text>
        <View className="flex-row flex-wrap gap-2 mb-5">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.8}
                onPress={() => setActiveCategory(category)}
                className="rounded-full px-4 py-2"
                style={{
                  backgroundColor: active ? colors.chipActiveBg : colors.chipBg,
                  borderColor: active ? colors.chipActiveBg : colors.border,
                  borderWidth: 1,
                }}
              >
                <Text className="text-[14px]" style={{ color: active ? colors.chipActiveText : colors.chipText, fontFamily: fonts.regular }}>{category}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-[13px] mb-3" style={{ color: colors.heading, fontFamily: fonts.medium }}>Tone</Text>
        <View className="flex-row flex-wrap gap-2 mb-5">
          {TONES.map((tone) => {
            const active = activeTone === tone;
            return (
              <TouchableOpacity
                key={tone}
                activeOpacity={0.8}
                onPress={() => setActiveTone(tone)}
                className="rounded-full px-4 py-2"
                style={{
                  backgroundColor: active ? colors.chipActiveBg : colors.chipBg,
                  borderColor: active ? colors.chipActiveBg : colors.border,
                  borderWidth: 1,
                }}
              >
                <Text className="text-[14px]" style={{ color: active ? colors.chipActiveText : colors.chipText, fontFamily: fonts.regular }}>{tone}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="gap-3 pb-2">
          {filteredItems.map((item) => {
            const toneColors = toneTagColors(item.tone);
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                className="rounded-2xl px-4 py-5"
                style={{ backgroundColor: colors.cardBg, borderColor: colors.border, borderWidth: 1 }}
              >
                <View className="flex-row items-start">
                  <Text className="text-[14px] flex-1 pr-3" style={{ color: colors.heading, fontFamily: fonts.bold }}>{item.title}</Text>
                  <Ionicons name="chevron-forward" size={18} color={colors.muted} />
                </View>
                <View className="flex-row items-center gap-3 mt-3">
                  <Text className="text-[14px]" style={{ color: colors.heading, fontFamily: fonts.regular }}>{item.category}</Text>
                  <View className="rounded-full px-3 py-1" style={{ backgroundColor: toneColors.bg }}>
                    <Text className="text-[13px]" style={{ color: toneColors.text, fontFamily: fonts.medium }}>{item.tone}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


