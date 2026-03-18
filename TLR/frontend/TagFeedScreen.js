import { useState, useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, StatusBar, SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  navyBg: "#0a0f1e", charcoalBg: "#141929", electricBlue: "#3b82f6",
  amber: "#f59e0b", green: "#22c55e", border: "#1e2a45",
  textPrimary: "#ffffff", textSecondary: "#94a3b8", red: "#ef4444",
};

const MOCK_TAGS = [
  {
    id: "1", type: "course", topic: "CALC 2401", note: "Need help with integration by parts, have my notes",
    spot: "Library", distance: "0.2 mi", xp: 140, timeRemaining: 452, requester: "Jordan M.", rating: 4.8,
  },
  {
    id: "2", type: "skill", topic: "Python Data Cleaning", note: "Pandas DataFrame issues, beginner-ish",
    spot: "Student Center", distance: "0.4 mi", xp: 38, timeRemaining: 287, requester: "Aisha K.", rating: 4.5,
  },
  {
    id: "3", type: "course", topic: "ECON 2105", note: "Midterm review — supply/demand models",
    spot: "Business Hall", distance: "0.6 mi", xp: 120, timeRemaining: 601, requester: "Dev P.", rating: 4.9,
  },
];

function CountdownTimer({ seconds, onExpire }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) { onExpire?.(); return; }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const urgent = remaining < 120;

  return (
    <Text style={[styles.countdown, urgent && styles.countdownUrgent]}>
      {m}:{s.toString().padStart(2, "0")} remaining
    </Text>
  );
}

function TagCard({ tag, onCatch, onPass }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [passed, setPassed] = useState(false);

  const handleCatch = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start(() => onCatch(tag));
  };

  const handlePass = () => {
    Animated.timing(scaleAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
      setPassed(true);
      onPass(tag);
    });
  };

  if (passed) return null;

  const isCourse = tag.type === "course";
  const accentColor = isCourse ? COLORS.electricBlue : COLORS.green;

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }], borderLeftColor: accentColor }]}>
      {/* Top row */}
      <View style={styles.cardTopRow}>
        <View style={[styles.typeBadge, { backgroundColor: `${accentColor}20`, borderColor: accentColor }]}>
          <Ionicons
            name={isCourse ? "school-outline" : "flash-outline"}
            size={12} color={accentColor}
          />
          <Text style={[styles.typeBadgeText, { color: accentColor }]}>
            {isCourse ? "Course" : "Skill"}
          </Text>
        </View>
        <CountdownTimer seconds={tag.timeRemaining} />
      </View>

      {/* Topic */}
      <Text style={styles.cardTopic}>{tag.topic}</Text>
      {tag.note ? <Text style={styles.cardNote}>{tag.note}</Text> : null}

      {/* Meta row */}
      <View style={styles.cardMetaRow}>
        <View style={styles.cardMeta}>
          <Ionicons name="location-outline" size={13} color={COLORS.textSecondary} />
          <Text style={styles.cardMetaText}>{tag.spot} · {tag.distance}</Text>
        </View>
        <View style={styles.cardMeta}>
          <Ionicons name="person-outline" size={13} color={COLORS.textSecondary} />
          <Text style={styles.cardMetaText}>{tag.requester}</Text>
          <Ionicons name="star" size={11} color={COLORS.amber} />
          <Text style={styles.cardMetaText}>{tag.rating}</Text>
        </View>
      </View>

      {/* XP + Actions */}
      <View style={styles.cardActions}>
        <View style={styles.xpBadge}>
          <Ionicons name="zap" size={14} color={COLORS.amber} />
          <Text style={styles.xpBadgeText}>{tag.xp} XP</Text>
        </View>
        <View style={styles.actionBtns}>
          <TouchableOpacity style={styles.passBtn} onPress={handlePass}>
            <Text style={styles.passBtnText}>Pass</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.catchBtn, { backgroundColor: accentColor }]} onPress={handleCatch}>
            <Ionicons name="hand-right-outline" size={16} color="#000" />
            <Text style={styles.catchBtnText}>Catch Tag</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

export function TagFeedScreen({ navigation }) {
  const [tags, setTags] = useState(MOCK_TAGS);
  const [toasts, setToasts] = useState([]);
  const [available, setAvailable] = useState(true);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const handlePass = (tag) => {
    setTags((t) => t.filter((x) => x.id !== tag.id));
    showToast(`Tag passed to next nearest helper. Reward just increased! ⚡`);
  };

  const handleCatch = (tag) => {
    navigation?.navigate("SessionActive", { tag });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navyBg} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Incoming Tags</Text>
            <Text style={styles.headerSub}>{tags.length} tag{tags.length !== 1 ? "s" : ""} near you</Text>
          </View>
          {/* Availability Toggle */}
          <TouchableOpacity
            style={[styles.availToggle, available ? styles.availToggleOn : styles.availToggleOff]}
            onPress={() => setAvailable((v) => !v)}
          >
            <View style={[styles.availDot, { backgroundColor: available ? COLORS.green : COLORS.textSecondary }]} />
            <Text style={[styles.availText, { color: available ? COLORS.green : COLORS.textSecondary }]}>
              {available ? "Available" : "Busy"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Toast */}
        {toasts.map((t) => (
          <View key={t.id} style={styles.toast}>
            <Ionicons name="arrow-forward-circle" size={16} color={COLORS.amber} />
            <Text style={styles.toastText}>{t.msg}</Text>
          </View>
        ))}

        {tags.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="radio-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No tags nearby</Text>
            <Text style={styles.emptyDesc}>You'll get notified when a student near you needs help</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.electricBlue }]} />
                <Text style={styles.legendText}>Course tag</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.green }]} />
                <Text style={styles.legendText}>Skill tag</Text>
              </View>
            </View>
            {tags.map((tag) => (
              <TagCard key={tag.id} tag={tag} onCatch={handleCatch} onPass={handlePass} />
            ))}
            <View style={{ height: 32 }} />
          </ScrollView>
        )}
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
  headerTitle: { fontSize: 20, fontWeight: "700", color: COLORS.textPrimary },
  headerSub: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  availToggle: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
  },
  availToggleOn: { borderColor: COLORS.green, backgroundColor: "#22c55e10" },
  availToggleOff: { borderColor: COLORS.border, backgroundColor: COLORS.charcoalBg },
  availDot: { width: 8, height: 8, borderRadius: 4 },
  availText: { fontSize: 12, fontWeight: "600" },
  toast: {
    flexDirection: "row", alignItems: "center", gap: 8,
    marginHorizontal: 20, marginTop: 8, backgroundColor: "#f59e0b15",
    borderWidth: 1, borderColor: COLORS.amber, borderRadius: 10, padding: 12,
  },
  toastText: { fontSize: 13, color: COLORS.amber, flex: 1 },
  scroll: { padding: 16 },
  legend: { flexDirection: "row", gap: 16, marginBottom: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: COLORS.textSecondary },
  card: {
    backgroundColor: COLORS.charcoalBg, borderRadius: 16, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
    borderLeftWidth: 3,
  },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  typeBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1,
  },
  typeBadgeText: { fontSize: 11, fontWeight: "700" },
  countdown: { fontSize: 12, fontWeight: "600", color: COLORS.textSecondary },
  countdownUrgent: { color: COLORS.red },
  cardTopic: { fontSize: 18, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 4 },
  cardNote: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 10, lineHeight: 18 },
  cardMetaRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 14 },
  cardMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  cardMetaText: { fontSize: 12, color: COLORS.textSecondary },
  cardActions: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  xpBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#f59e0b15", borderWidth: 1, borderColor: COLORS.amber,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8,
  },
  xpBadgeText: { fontSize: 14, fontWeight: "700", color: COLORS.amber },
  actionBtns: { flexDirection: "row", gap: 8 },
  passBtn: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10,
    borderWidth: 1, borderColor: COLORS.border,
  },
  passBtnText: { fontSize: 13, fontWeight: "600", color: COLORS.textSecondary },
  catchBtn: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10,
  },
  catchBtnText: { fontSize: 13, fontWeight: "700", color: "#000" },
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: COLORS.textSecondary },
  emptyDesc: { fontSize: 14, color: COLORS.textSecondary, textAlign: "center", paddingHorizontal: 40 },
});