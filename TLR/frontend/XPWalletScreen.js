import { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  navyBg: "#0a0f1e", charcoalBg: "#141929", electricBlue: "#3b82f6",
  amber: "#f59e0b", green: "#22c55e", border: "#1e2a45",
  textPrimary: "#ffffff", textSecondary: "#94a3b8", red: "#ef4444",
  purple: "#a855f7",
};

const MOCK_HISTORY = [
  { id: "1", type: "course", topic: "CALC 2401", xp: 140, bonus: 50, date: "Today", icon: "school-outline" },
  { id: "2", type: "skill", topic: "Resume Review", xp: 38, bonus: 0, date: "Today", icon: "flash-outline" },
  { id: "3", type: "course", topic: "CHEM 1211", xp: 120, bonus: 0, date: "Yesterday", icon: "school-outline" },
  { id: "4", type: "skill", topic: "Python Help", xp: 35, bonus: 15, date: "Yesterday", icon: "flash-outline" },
  { id: "5", type: "redemption", topic: "Dining Dollars", xp: -300, bonus: 0, date: "Mar 10", icon: "gift-outline" },
  { id: "6", type: "course", topic: "ECON 2105", xp: 115, bonus: 0, date: "Mar 9", icon: "school-outline" },
];

const SQUAD_LEADERBOARD = [
  { name: "North Hall", xp: 2400, rank: 1 },
  { name: "CS '28", xp: 1980, rank: 2 },
  { name: "South Tower", xp: 1640, rank: 3 },
  { name: "Pre-Med Club", xp: 1210, rank: 4 },
];

const REDEMPTIONS = [
  { id: "1", label: "Swipes (3 Meal Swipes)", cost: 200, icon: "fast-food-outline", color: COLORS.green },
  { id: "2", label: "Dining Dollars ($10)", cost: 300, icon: "card-outline", color: COLORS.amber },
  { id: "3", label: "Campus Merch", cost: 500, icon: "shirt-outline", color: COLORS.electricBlue },
  { id: "4", label: "$10 Gift Card", cost: 600, icon: "gift-outline", color: COLORS.purple },
];

export function XPWalletScreen({ navigation }) {
  const [tab, setTab] = useState("history"); // 'history' | 'redeem' | 'leaderboard'

  const totalXP = 1240;
  const courseXP = 980;
  const skillXP = 260;
  const coursePercent = courseXP / totalXP;

  const weekCourse = MOCK_HISTORY
    .filter((h) => h.type === "course" && ["Today", "Yesterday"].includes(h.date))
    .reduce((acc, h) => acc + h.xp + h.bonus, 0);
  const weekSkill = MOCK_HISTORY
    .filter((h) => h.type === "skill" && ["Today", "Yesterday"].includes(h.date))
    .reduce((acc, h) => acc + h.xp + h.bonus, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navyBg} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>XP Wallet</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Total XP Card */}
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total Campus XP</Text>
            <View style={styles.totalRow}>
              <Text style={styles.totalXP}>{totalXP.toLocaleString()}</Text>
            </View>

            {/* Split bar */}
            <View style={styles.splitBarBg}>
              <View style={[styles.splitBarFill, { flex: coursePercent, backgroundColor: COLORS.electricBlue }]} />
              <View style={[styles.splitBarFill, { flex: 1 - coursePercent, backgroundColor: COLORS.green }]} />
            </View>

            <View style={styles.splitLegend}>
              <View style={styles.splitLegendItem}>
                <View style={[styles.splitDot, { backgroundColor: COLORS.electricBlue }]} />
                <Text style={styles.splitLegendLabel}>Course Help</Text>
                <Text style={styles.splitLegendXP}>{courseXP} XP</Text>
              </View>
              <View style={styles.splitLegendItem}>
                <View style={[styles.splitDot, { backgroundColor: COLORS.green }]} />
                <Text style={styles.splitLegendLabel}>Skill Help</Text>
                <Text style={styles.splitLegendXP}>{skillXP} XP</Text>
              </View>
            </View>
          </View>

          {/* This week */}
          <View style={styles.weekCard}>
            <Text style={styles.weekTitle}>This Week</Text>
            <View style={styles.weekRow}>
              <View style={styles.weekItem}>
                <Text style={styles.weekItemXP}>+{weekCourse}</Text>
                <Text style={styles.weekItemLabel}>📘 Course XP</Text>
              </View>
              <View style={styles.weekDivider} />
              <View style={styles.weekItem}>
                <Text style={styles.weekItemXP}>+{weekSkill}</Text>
                <Text style={styles.weekItemLabel}>🌿 Skill XP</Text>
              </View>
              <View style={styles.weekDivider} />
              <View style={styles.weekItem}>
                <Text style={[styles.weekItemXP, { color: COLORS.green }]}>🔥 3</Text>
                <Text style={styles.weekItemLabel}>Day Streak</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {[
  { id: "history", label: "History", icon: "time-outline" },
  { id: "redeem", label: "Redeem", icon: "gift-outline" },
].map((t) => (
  <TouchableOpacity
    key={t.id}
    style={[styles.tab, tab === t.id && styles.tabActive]}
    onPress={() => setTab(t.id)}
  >
    <Ionicons name={t.icon} size={15} color={tab === t.id ? COLORS.electricBlue : COLORS.textSecondary} />
    <Text style={[styles.tabText, tab === t.id && { color: COLORS.electricBlue }]}>{t.label}</Text>
  </TouchableOpacity>
))}
          </View>

          {/* Tab Content */}
          {tab === "history" && (
            <View style={styles.tabContent}>
              {MOCK_HISTORY.map((item) => {
                const isRedemption = item.type === "redemption";
                const isCourse = item.type === "course";
                const accent = isRedemption ? COLORS.red : isCourse ? COLORS.electricBlue : COLORS.green;
                return (
                  <View key={item.id} style={styles.historyItem}>
                    <View style={[styles.historyIcon, { backgroundColor: `${accent}20` }]}>
                      <Ionicons name={item.icon} size={18} color={accent} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.historyTopic}>{item.topic}</Text>
                      <Text style={styles.historyDate}>{item.date}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={[styles.historyXP, { color: isRedemption ? COLORS.red : COLORS.amber }]}>
                        {isRedemption ? "" : "+"}{item.xp} XP
                      </Text>
                      {item.bonus > 0 && (
                        <Text style={styles.historyBonus}>+{item.bonus} bonus</Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {tab === "redeem" && (
            <View style={styles.tabContent}>
              <View style={styles.redeemBalance}>
                <Text style={styles.redeemBalanceLabel}>Available to redeem</Text>
                <Text style={styles.redeemBalanceXP}>{totalXP} XP</Text>
              </View>
              {REDEMPTIONS.map((r) => {
                const canAfford = totalXP >= r.cost;
                return (
                  <View key={r.id} style={styles.redeemCard}>
                    <View style={[styles.redeemIcon, { backgroundColor: `${r.color}20` }]}>
                      <Ionicons name={r.icon} size={22} color={r.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.redeemLabel}>{r.label}</Text>
                      <Text style={styles.redeemCost}>{r.cost} XP</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.redeemBtn, { backgroundColor: canAfford ? r.color : COLORS.charcoalBg, borderWidth: canAfford ? 0 : 1, borderColor: COLORS.border }]}
                      disabled={!canAfford}
                    >
                      <Text style={[styles.redeemBtnText, { color: canAfford ? "#000" : COLORS.textSecondary }]}>
                        {canAfford ? "Redeem" : "Need more"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

              {/* Mock redemption receipt */}
              <View style={styles.receiptBox}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.green} />
                <Text style={styles.receiptText}>
                  Last redemption: <Text style={{ color: COLORS.green, fontWeight: "700" }}>10 Dining Dollars</Text> on Mar 10 (−300 XP)
                </Text>
              </View>
            </View>
          )}

        
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navyBg },
  container: { flex: 1, backgroundColor: COLORS.navyBg },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.textPrimary },
  totalCard: {
    margin: 16, backgroundColor: COLORS.charcoalBg, borderRadius: 20,
    padding: 20, borderWidth: 1, borderColor: COLORS.border,
  },
  totalLabel: { fontSize: 12, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  totalRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
  totalXP: { fontSize: 42, fontWeight: "700", color: COLORS.amber },
  splitBarBg: { flexDirection: "row", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 12 },
  splitBarFill: { height: "100%" },
  splitLegend: { flexDirection: "row", justifyContent: "space-between" },
  splitLegendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  splitDot: { width: 8, height: 8, borderRadius: 4 },
  splitLegendLabel: { fontSize: 12, color: COLORS.textSecondary },
  splitLegendXP: { fontSize: 12, fontWeight: "700", color: COLORS.textPrimary },
  weekCard: {
    marginHorizontal: 16, marginBottom: 16, backgroundColor: COLORS.charcoalBg,
    borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border,
  },
  weekTitle: { fontSize: 12, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 },
  weekRow: { flexDirection: "row", alignItems: "center" },
  weekItem: { flex: 1, alignItems: "center" },
  weekItemXP: { fontSize: 20, fontWeight: "700", color: COLORS.amber, marginBottom: 2 },
  weekItemLabel: { fontSize: 11, color: COLORS.textSecondary },
  weekDivider: { width: 1, height: 36, backgroundColor: COLORS.border },
  tabs: {
    flexDirection: "row", marginHorizontal: 16, marginBottom: 4,
    backgroundColor: COLORS.charcoalBg, borderRadius: 12, padding: 4,
    borderWidth: 1, borderColor: COLORS.border,
  },
  tab: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, paddingVertical: 9, borderRadius: 9 },
  tabActive: { backgroundColor: "#1d4ed820" },
  tabText: { fontSize: 12, fontWeight: "600", color: COLORS.textSecondary },
  tabContent: { paddingHorizontal: 16, paddingTop: 12 },
  historyItem: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  historyIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  historyTopic: { fontSize: 14, fontWeight: "600", color: COLORS.textPrimary, marginBottom: 2 },
  historyDate: { fontSize: 12, color: COLORS.textSecondary },
  historyXP: { fontSize: 15, fontWeight: "700", color: COLORS.amber },
  historyBonus: { fontSize: 11, color: COLORS.green },
  redeemBalance: {
    backgroundColor: "#f59e0b10", borderWidth: 1, borderColor: COLORS.amber,
    borderRadius: 12, padding: 14, flexDirection: "row", justifyContent: "space-between", marginBottom: 16,
  },
  redeemBalanceLabel: { fontSize: 13, color: COLORS.textSecondary },
  redeemBalanceXP: { fontSize: 16, fontWeight: "700", color: COLORS.amber },
  redeemCard: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: COLORS.charcoalBg, borderRadius: 14, padding: 14,
    marginBottom: 8, borderWidth: 1, borderColor: COLORS.border,
  },
  redeemIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  redeemLabel: { fontSize: 14, fontWeight: "600", color: COLORS.textPrimary, marginBottom: 2 },
  redeemCost: { fontSize: 12, color: COLORS.textSecondary },
  redeemBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  redeemBtnText: { fontSize: 13, fontWeight: "700" },
  receiptBox: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "#22c55e10", borderWidth: 1, borderColor: COLORS.green,
    borderRadius: 10, padding: 12, marginTop: 8,
  },
  receiptText: { fontSize: 12, color: COLORS.textSecondary, flex: 1 },
  leaderboardTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 2 },
  leaderboardSub: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 16 },
  squadRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: COLORS.charcoalBg, borderRadius: 12, padding: 14,
    marginBottom: 8, borderWidth: 1, borderColor: COLORS.border,
  },
  squadRowFirst: { borderColor: COLORS.amber, backgroundColor: "#f59e0b08" },
  squadRank: { fontSize: 16, fontWeight: "700", color: COLORS.textSecondary, width: 28 },
  squadName: { flex: 1, fontSize: 14, fontWeight: "600", color: COLORS.textPrimary },
  squadXpChip: { flexDirection: "row", alignItems: "center", gap: 4 },
  squadXP: { fontSize: 13, fontWeight: "700", color: COLORS.amber },
  leaderboardNote: { fontSize: 12, color: COLORS.textSecondary, textAlign: "center", marginTop: 12, lineHeight: 18 },
});