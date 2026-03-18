import { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  navyBg: "#0a0f1e", charcoalBg: "#141929", electricBlue: "#3b82f6",
  amber: "#f59e0b", green: "#22c55e", border: "#1e2a45",
  textPrimary: "#ffffff", textSecondary: "#94a3b8", red: "#ef4444",
  slate: "#1e293b",
};

// TODO: Replace with real Supabase data
const TALENT_DATA = {
  name: "Khadim D.",
  university: "Kennesaw State University",
  campus: "Marietta Campus",
  major: "Computer Science",
  graduationYear: "2026",
  overallRating: 4.8,
  totalSessions: 147,
  activeYears: 3,
  consistency: "Helped across 6 consecutive semesters",
  peakActivity: "Finals weeks and midterms",
  avgSessionRating: 4.8,
  verifiedCompetencies: [
    { subject: "CALC 2401", sessions: 42, rating: 4.9, level: "Advanced" },
    { subject: "CS 1301", sessions: 31, rating: 4.8, level: "Advanced" },
    { subject: "ECON 2105", sessions: 28, rating: 4.7, level: "Intermediate" },
    { subject: "CHEM 1211", sessions: 22, rating: 4.6, level: "Intermediate" },
    { subject: "MATH 1502", sessions: 18, rating: 4.9, level: "Intermediate" },
    { subject: "BIO 2311", sessions: 6, rating: 4.5, level: "Foundational" },
  ],
  professionalSkills: [
    { skill: "Excel", sessions: 38, rating: 4.8 },
    { skill: "Python", sessions: 24, rating: 4.7 },
    { skill: "Resume Review", sessions: 18, rating: 5.0 },
    { skill: "SQL", sessions: 12, rating: 4.6 },
    { skill: "Data Cleaning", sessions: 9, rating: 4.7 },
    { skill: "Public Speaking", sessions: 6, rating: 4.5 },
  ],
};

function RatingBar({ rating, max = 5 }) {
  const pct = (rating / max) * 100;
  return (
    <View style={barStyles.track}>
      <View style={[barStyles.fill, { width: `${pct}%` }]} />
    </View>
  );
}

function SessionBar({ sessions, maxSessions }) {
  const pct = Math.min((sessions / maxSessions) * 100, 100);
  return (
    <View style={barStyles.sessionTrack}>
      <View style={[barStyles.sessionFill, { width: `${pct}%` }]} />
    </View>
  );
}

const barStyles = StyleSheet.create({
  track: { flex: 1, height: 4, backgroundColor: "#1e2a45", borderRadius: 2, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: COLORS.electricBlue, borderRadius: 2 },
  sessionTrack: { flex: 1, height: 4, backgroundColor: "#1e2a45", borderRadius: 2, overflow: "hidden" },
  sessionFill: { height: "100%", backgroundColor: COLORS.green, borderRadius: 2 },
});

const LEVEL_COLORS = {
  Advanced: { bg: "#1d4ed815", border: COLORS.electricBlue, text: COLORS.electricBlue },
  Intermediate: { bg: "#22c55e15", border: COLORS.green, text: COLORS.green },
  Foundational: { bg: "#94a3b815", border: "#94a3b8", text: "#94a3b8" },
};

export function TalentProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("academic");
  const d = TALENT_DATA;
  const maxComp = Math.max(...d.verifiedCompetencies.map(c => c.sessions));
  const maxSkill = Math.max(...d.professionalSkills.map(s => s.sessions));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navyBg} />
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Talent Profile</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={13} color={COLORS.electricBlue} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Identity block */}
          <View style={styles.identityBlock}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{d.name.charAt(0)}</Text>
            </View>
            <View style={styles.identityInfo}>
              <Text style={styles.identityName}>{d.name}</Text>
              <Text style={styles.identityUniversity}>{d.university}</Text>
              <Text style={styles.identitySub}>{d.major} · Class of {d.graduationYear}</Text>
            </View>
          </View>

          {/* Key metrics row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{d.totalSessions}</Text>
              <Text style={styles.metricLabel}>Total Sessions</Text>
            </View>
            <View style={[styles.metricCard, styles.metricCardCenter]}>
              <Text style={[styles.metricValue, { color: COLORS.amber }]}>{d.overallRating}</Text>
              <Text style={styles.metricLabel}>Avg Rating</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricValue, { color: COLORS.green }]}>{d.activeYears} yrs</Text>
              <Text style={styles.metricLabel}>Active</Text>
            </View>
          </View>

          {/* Consistency block */}
          <View style={styles.consistencyCard}>
            <Text style={styles.consistencyTitle}>Consistency Record</Text>
            <View style={styles.consistencyRow}>
              <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.consistencyText}>{d.consistency}</Text>
            </View>
            <View style={styles.consistencyRow}>
              <Ionicons name="trending-up-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.consistencyText}>{d.peakActivity}</Text>
            </View>
            <View style={styles.consistencyRow}>
              <Ionicons name="star-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.consistencyText}>Average session rating: {d.avgSessionRating} / 5.0</Text>
            </View>
          </View>

          {/* Tab switcher */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "academic" && styles.tabActive]}
              onPress={() => setActiveTab("academic")}
            >
              <Text style={[styles.tabText, activeTab === "academic" && { color: COLORS.electricBlue }]}>
                Academic Competencies
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "skills" && styles.tabActive]}
              onPress={() => setActiveTab("skills")}
            >
              <Text style={[styles.tabText, activeTab === "skills" && { color: COLORS.electricBlue }]}>
                Professional Skills
              </Text>
            </TouchableOpacity>
          </View>

          {/* Academic competencies */}
          {activeTab === "academic" && (
            <View style={styles.tableSection}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Subject</Text>
                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "center" }]}>Sessions</Text>
                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "center" }]}>Rating</Text>
                <Text style={[styles.tableHeaderText, { flex: 1.2, textAlign: "right" }]}>Level</Text>
              </View>
              {d.verifiedCompetencies.map((c, i) => {
                const levelStyle = LEVEL_COLORS[c.level];
                return (
                  <View key={c.subject} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
                    <View style={{ flex: 2 }}>
                      <Text style={styles.tableSubject}>{c.subject}</Text>
                      <SessionBar sessions={c.sessions} maxSessions={maxComp} />
                    </View>
                    <Text style={[styles.tableCell, { flex: 1, textAlign: "center" }]}>{c.sessions}</Text>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Text style={[styles.tableCell, { color: COLORS.amber }]}>{c.rating}</Text>
                    </View>
                    <View style={{ flex: 1.2, alignItems: "flex-end" }}>
                      <View style={[styles.levelBadge, { backgroundColor: levelStyle.bg, borderColor: levelStyle.border }]}>
                        <Text style={[styles.levelText, { color: levelStyle.text }]}>{c.level}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Professional skills */}
          {activeTab === "skills" && (
            <View style={styles.tableSection}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Skill</Text>
                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "center" }]}>Sessions</Text>
                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>Rating</Text>
              </View>
              {d.professionalSkills.map((s, i) => (
                <View key={s.skill} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.tableSubject}>{s.skill}</Text>
                    <SessionBar sessions={s.sessions} maxSessions={maxSkill} />
                  </View>
                  <Text style={[styles.tableCell, { flex: 1, textAlign: "center" }]}>{s.sessions}</Text>
                  <Text style={[styles.tableCell, { flex: 1, textAlign: "right", color: COLORS.amber }]}>{s.rating}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Footer note */}
          <View style={styles.footerNote}>
            <Ionicons name="information-circle-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.footerNoteText}>
              All sessions are peer-verified and recorded on the Tag You're It network.
              Data reflects real interactions, not self-reported skills.
            </Text>
          </View>

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
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  backBtn: { width: 36, height: 36, justifyContent: "center" },
  headerTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary },
  verifiedBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#1d4ed815", borderWidth: 1, borderColor: COLORS.electricBlue,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
  },
  verifiedText: { fontSize: 11, fontWeight: "700", color: COLORS.electricBlue },

  identityBlock: {
    flexDirection: "row", alignItems: "center", gap: 16,
    padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  avatarCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.electricBlue, alignItems: "center", justifyContent: "center",
  },
  avatarText: { fontSize: 22, fontWeight: "700", color: "#fff" },
  identityInfo: { flex: 1, gap: 3 },
  identityName: { fontSize: 20, fontWeight: "700", color: COLORS.textPrimary },
  identityUniversity: { fontSize: 13, color: COLORS.textSecondary },
  identitySub: { fontSize: 12, color: COLORS.textSecondary },

  metricsRow: {
    flexDirection: "row", paddingHorizontal: 16, paddingVertical: 16, gap: 10,
  },
  metricCard: {
    flex: 1, backgroundColor: COLORS.charcoalBg, borderRadius: 12,
    padding: 14, alignItems: "center", borderWidth: 1, borderColor: COLORS.border,
  },
  metricCardCenter: {
    borderColor: COLORS.amber, backgroundColor: "#f59e0b08",
  },
  metricValue: { fontSize: 24, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 4 },
  metricLabel: { fontSize: 11, color: COLORS.textSecondary, textAlign: "center" },

  consistencyCard: {
    marginHorizontal: 16, marginBottom: 16, backgroundColor: COLORS.charcoalBg,
    borderRadius: 12, padding: 16, borderWidth: 1, borderColor: COLORS.border, gap: 10,
  },
  consistencyTitle: {
    fontSize: 12, fontWeight: "600", color: COLORS.textSecondary,
    textTransform: "uppercase", letterSpacing: 1, marginBottom: 4,
  },
  consistencyRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  consistencyText: { fontSize: 13, color: COLORS.textPrimary, flex: 1 },

  tabs: {
    flexDirection: "row", marginHorizontal: 16, marginBottom: 4,
    backgroundColor: COLORS.charcoalBg, borderRadius: 10, padding: 4,
    borderWidth: 1, borderColor: COLORS.border,
  },
  tab: { flex: 1, paddingVertical: 9, alignItems: "center", borderRadius: 7 },
  tabActive: { backgroundColor: "#1d4ed820" },
  tabText: { fontSize: 12, fontWeight: "600", color: COLORS.textSecondary },

  tableSection: { marginHorizontal: 16, marginTop: 8 },
  tableHeader: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 10, paddingHorizontal: 4,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  tableHeaderText: {
    fontSize: 11, fontWeight: "600", color: COLORS.textSecondary,
    textTransform: "uppercase", letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 12, paddingHorizontal: 4, gap: 8,
    borderBottomWidth: 1, borderBottomColor: "#1e2a4560",
  },
  tableRowAlt: { backgroundColor: "#141929" },
  tableSubject: { fontSize: 13, fontWeight: "600", color: COLORS.textPrimary, marginBottom: 5 },
  tableCell: { fontSize: 13, color: COLORS.textPrimary },
  levelBadge: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 6, borderWidth: 1,
  },
  levelText: { fontSize: 10, fontWeight: "700" },

  footerNote: {
    flexDirection: "row", alignItems: "flex-start", gap: 8,
    marginHorizontal: 16, marginTop: 20,
    backgroundColor: COLORS.charcoalBg, borderRadius: 10,
    padding: 14, borderWidth: 1, borderColor: COLORS.border,
  },
  footerNoteText: { flex: 1, fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
});