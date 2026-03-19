import { useState, useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, Animated, StatusBar, SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from './LocationContext';

const COLORS = {
  navyBg: "#0a0f1e", charcoalBg: "#141929", electricBlue: "#3b82f6",
  deepBlue: "#1d4ed8", amber: "#f59e0b", green: "#22c55e",
  border: "#1e2a45", textPrimary: "#ffffff", textSecondary: "#94a3b8", red: "#ef4444",
};

const MEETING_SPOTS = [
  { id: "library", label: "Library", icon: "book-outline" },
  { id: "student_center", label: "Student Center", icon: "people-outline" },
  { id: "science_bldg", label: "Science Building", icon: "flask-outline" },
  { id: "business_hall", label: "Business Hall", icon: "briefcase-outline" },
  { id: "cafeteria", label: "Cafeteria", icon: "cafe-outline" },
  { id: "dorm_lounge", label: "Dorm Lounge", icon: "home-outline" },
];

const TIME_WINDOWS = [
  { id: 30, label: "30 min", xpBonus: "+20% XP", urgency: "high" },
  { id: 60, label: "60 min", xpBonus: "Base XP", urgency: "normal" },
  { id: 90, label: "90 min", xpBonus: "-10% XP", urgency: "low" },
  { id: 0, label: "Flexible", xpBonus: "-20% XP", urgency: "low" },
];

const MOCK_COURSE_TAGS = ["CALC 2401", "CHEM 1211", "ECON 2105", "CS 1301", "BIO 2311", "MATH 1502"];
const MOCK_SKILL_TAGS = ["Excel", "Python", "Figma", "Resume Review", "LinkedIn", "Data Cleaning", "Public Speaking", "LaTeX", "SQL", "JavaScript"];

// ── Sending Animation Screen ──────────────────────────────────────────────────
function SendingScreen({ tagType, topic, spot, navigation }) {
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0)).current;
  const successFade = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState("sending");

  const pulseRing = (anim, delay) =>
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([Animated.timing(anim, { toValue: 1, duration: 1500, useNativeDriver: true })]),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    pulseRing(ring1, 0).start();
    pulseRing(ring2, 500).start();
    pulseRing(ring3, 1000).start();
    const matchTimer = setTimeout(() => {
      setPhase("matched");
      Animated.parallel([
        Animated.spring(successScale, { toValue: 1, useNativeDriver: true }),
        Animated.timing(successFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    }, 2500);
    return () => clearTimeout(matchTimer);
  }, []);

  const isCourse = tagType === "course";
  const accentColor = isCourse ? COLORS.electricBlue : COLORS.green;
  const spotLabel = MEETING_SPOTS.find(s => s.id === spot)?.label ?? spot;

  return (
    <Animated.View style={[styles.sendingContainer, { opacity: fadeIn }]}>
      {phase === "sending" ? (
        <>
          <View style={styles.sonarWrapper}>
            {[ring1, ring2, ring3].map((anim, i) => (
              <Animated.View
                key={i}
                style={[styles.sonarRing, {
                  borderColor: accentColor,
                  transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.8] }) }],
                  opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 0.5, 0] }),
                }]}
              />
            ))}
            <View style={[styles.sonarCenter, { backgroundColor: `${accentColor}20`, borderColor: accentColor }]}>
              <Ionicons name="pricetag" size={28} color={accentColor} />
            </View>
          </View>
          <Text style={styles.sendingTitle}>Sending your tag...</Text>
          <Text style={styles.sendingDesc}>
            Pinging qualified helpers nearby for{"\n"}
            <Text style={{ color: accentColor, fontWeight: "700" }}>{topic}</Text>
          </Text>
          <View style={styles.sendingMeta}>
            <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.sendingMetaText}>Meeting at {spotLabel}</Text>
          </View>
          <View style={styles.sendingMeta}>
            <Ionicons name="radio-outline" size={14} color={COLORS.electricBlue} />
            <Text style={styles.sendingMetaText}>First 30 min: private pings to nearby helpers</Text>
          </View>
          <View style={styles.sendingMeta}>
            <Ionicons name="map-outline" size={14} color={COLORS.amber} />
            <Text style={styles.sendingMetaText}>After 30 min: goes live on campus map</Text>
          </View>
        </>
      ) : (
        <Animated.View style={[styles.matchedContainer, { opacity: successFade, transform: [{ scale: successScale }] }]}>
          <View style={styles.matchedIconCircle}>
            <Ionicons name="checkmark-circle" size={72} color={COLORS.green} />
          </View>
          <Text style={styles.matchedTitle}>Tag is live! 🎉</Text>
          <Text style={styles.matchedDesc}>
            Nearby helpers are being pinged.{"\n"}You'll get notified when someone catches it.
          </Text>
          <View style={styles.matchedCard}>
            <View style={styles.matchedCardRow}>
              <Ionicons name={isCourse ? "school-outline" : "flash-outline"} size={15} color={accentColor} />
              <Text style={[styles.matchedCardLabel, { color: accentColor }]}>{topic}</Text>
            </View>
            <View style={styles.matchedDivider} />
            <View style={styles.matchedCardRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.matchedCardMeta}>{spotLabel}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.doneBtn, { backgroundColor: accentColor }]} onPress={() => navigation?.goBack()}>
            <Text style={styles.doneBtnText}>Back to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewMapBtn} onPress={() => navigation?.navigate("Map")}>
            <Ionicons name="map-outline" size={15} color={COLORS.electricBlue} />
            <Text style={styles.viewMapText}>Watch it on the map</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
}

// ── Main CreateTag Screen ─────────────────────────────────────────────────────
export default function CreateTag({ navigation }) {
  const [tagType, setTagType] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTime, setSelectedTime] = useState(60);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ── One-shot location — no stream needed here, just coords at post time ──
  const { location, permission } = useLocation({ watchPosition: false });

  const xpCost = tagType === "course" ? 30 : 10;
  const baseXP = tagType === "course" ? 120 : 35;
  const xpMultiplier = selectedTime === 30 ? 1.2 : selectedTime === 90 ? 0.9 : selectedTime === 0 ? 0.8 : 1;
  const estimatedXP = Math.round(baseXP * xpMultiplier);

  const handleTagTypeSelect = (type) => {
    setTagType(type);
    setSelectedTopic(null);
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  };

  const canPost = tagType && selectedTopic && selectedSpot;

  const handlePost = () => {
    if (!canPost) return;

    // TODO: uncomment and wire when Supabase is ready
    // const tagPayload = {
    //   type: tagType,
    //   topic: selectedTopic,
    //   spot: selectedSpot,
    //   time_window: selectedTime,
    //   note: note,
    //   latitude: location?.latitude ?? null,
    //   longitude: location?.longitude ?? null,
    //   xp_reward: estimatedXP,
    //   created_at: new Date().toISOString(),
    // };
    // await supabase.from('tags').insert(tagPayload);

    setSending(true);
  };

  if (sending) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.navyBg} />
        <SendingScreen tagType={tagType} topic={selectedTopic} spot={selectedSpot} navigation={navigation} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navyBg} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create a Tag</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <Text style={styles.sectionLabel}>What kind of help do you need?</Text>
          <View style={styles.tagTypeRow}>
            <TouchableOpacity style={[styles.tagTypeCard, tagType === "course" && styles.tagTypeCardActiveBlue]} onPress={() => handleTagTypeSelect("course")}>
              <View style={[styles.tagTypeIcon, { backgroundColor: "#1d4ed820" }]}>
                <Ionicons name="school-outline" size={22} color={COLORS.electricBlue} />
              </View>
              <Text style={[styles.tagTypeTitle, tagType === "course" && { color: COLORS.electricBlue }]}>Course Tag</Text>
              <Text style={styles.tagTypeXP}>50–150 XP</Text>
              <Text style={styles.tagTypeDesc}>Verified tutors only</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tagTypeCard, tagType === "skill" && styles.tagTypeCardActiveGreen]} onPress={() => handleTagTypeSelect("skill")}>
              <View style={[styles.tagTypeIcon, { backgroundColor: "#22c55e20" }]}>
                <Ionicons name="flash-outline" size={22} color={COLORS.green} />
              </View>
              <Text style={[styles.tagTypeTitle, tagType === "skill" && { color: COLORS.green }]}>Skill Tag</Text>
              <Text style={styles.tagTypeXP}>15–40 XP</Text>
              <Text style={styles.tagTypeDesc}>Any skilled peer</Text>
            </TouchableOpacity>
          </View>

          {tagType && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.sectionLabel}>{tagType === "course" ? "Select your course" : "Select a skill"}</Text>
              <View style={styles.tagGrid}>
                {(tagType === "course" ? MOCK_COURSE_TAGS : MOCK_SKILL_TAGS).map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.topicPill, selectedTopic === tag && tagType === "course" && styles.topicPillActiveBlue, selectedTopic === tag && tagType === "skill" && styles.topicPillActiveGreen]}
                    onPress={() => setSelectedTopic(tag)}
                  >
                    <Text style={[styles.topicPillText, selectedTopic === tag && { color: tagType === "course" ? COLORS.electricBlue : COLORS.green }]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}

          <Text style={styles.sectionLabel}>How soon do you need help?</Text>
          <View style={styles.timeGrid}>
            {TIME_WINDOWS.map((t) => (
              <TouchableOpacity key={t.id} style={[styles.timeCard, selectedTime === t.id && styles.timeCardActive]} onPress={() => setSelectedTime(t.id)}>
                <Text style={[styles.timeLabel, selectedTime === t.id && { color: COLORS.electricBlue }]}>{t.label}</Text>
                <Text style={[styles.timeXP, { color: t.urgency === "high" ? COLORS.green : t.urgency === "low" ? COLORS.textSecondary : COLORS.amber }]}>{t.xpBonus}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.explainerBox}>
            <View style={styles.explainerRow}>
              <Ionicons name="radio-outline" size={16} color={COLORS.electricBlue} />
              <Text style={styles.explainerText}><Text style={{ color: COLORS.electricBlue }}>First 30 min:</Text> we ping nearby qualified helpers privately</Text>
            </View>
            <View style={styles.explainerRow}>
              <Ionicons name="map-outline" size={16} color={COLORS.amber} />
              <Text style={styles.explainerText}><Text style={{ color: COLORS.amber }}>After 30 min:</Text> your tag goes public on the map for anyone qualified</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Where do you want to meet?</Text>
          <View style={styles.spotGrid}>
            {MEETING_SPOTS.map((spot) => (
              <TouchableOpacity key={spot.id} style={[styles.spotCard, selectedSpot === spot.id && styles.spotCardActive]} onPress={() => setSelectedSpot(spot.id)}>
                <Ionicons name={spot.icon} size={20} color={selectedSpot === spot.id ? COLORS.electricBlue : COLORS.textSecondary} />
                <Text style={[styles.spotLabel, selectedSpot === spot.id && { color: COLORS.electricBlue }]}>{spot.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Add a note (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="e.g. Need help with integration by parts, have my notes ready"
            placeholderTextColor={COLORS.textSecondary}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
          />

          {/* Location warning — only shows if permission was denied */}
          {permission === 'denied' && (
            <View style={styles.locationWarning}>
              <Ionicons name="location-outline" size={14} color={COLORS.amber} />
              <Text style={styles.locationWarningText}>
                Location unavailable — helpers may not be matched by proximity
              </Text>
            </View>
          )}

          <TouchableOpacity style={[styles.postBtn, !canPost && styles.postBtnDisabled]} disabled={!canPost} onPress={handlePost}>
            <Ionicons name="pricetag-outline" size={20} color={canPost ? "#000" : COLORS.textSecondary} />
            <Text style={[styles.postBtnText, !canPost && { color: COLORS.textSecondary }]}>Post Tag</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navyBg },
  container: { flex: 1, backgroundColor: COLORS.navyBg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.textPrimary },
  scroll: { padding: 20 },
  sectionLabel: { fontSize: 13, fontWeight: "600", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, marginTop: 24 },
  tagTypeRow: { flexDirection: "row", gap: 12 },
  tagTypeCard: { flex: 1, backgroundColor: COLORS.charcoalBg, borderRadius: 16, padding: 16, borderWidth: 1.5, borderColor: COLORS.border, alignItems: "center" },
  tagTypeCardActiveBlue: { borderColor: COLORS.electricBlue, backgroundColor: "#1d4ed810" },
  tagTypeCardActiveGreen: { borderColor: COLORS.green, backgroundColor: "#22c55e10" },
  tagTypeIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  tagTypeTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 4 },
  tagTypeXP: { fontSize: 13, fontWeight: "600", color: COLORS.amber, marginBottom: 2 },
  tagTypeDesc: { fontSize: 11, color: COLORS.textSecondary, textAlign: "center" },
  tagGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  topicPill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.charcoalBg, borderWidth: 1, borderColor: COLORS.border },
  topicPillActiveBlue: { borderColor: COLORS.electricBlue, backgroundColor: "#1d4ed815" },
  topicPillActiveGreen: { borderColor: COLORS.green, backgroundColor: "#22c55e15" },
  topicPillText: { fontSize: 13, fontWeight: "600", color: COLORS.textSecondary },
  timeGrid: { flexDirection: "row", gap: 8 },
  timeCard: { flex: 1, backgroundColor: COLORS.charcoalBg, borderRadius: 12, padding: 12, alignItems: "center", borderWidth: 1.5, borderColor: COLORS.border },
  timeCardActive: { borderColor: COLORS.electricBlue, backgroundColor: "#1d4ed810" },
  timeLabel: { fontSize: 13, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 4 },
  timeXP: { fontSize: 10, fontWeight: "600" },
  explainerBox: { backgroundColor: COLORS.charcoalBg, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.border, marginTop: 12, gap: 8 },
  explainerRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  explainerText: { flex: 1, fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  spotGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  spotCard: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, backgroundColor: COLORS.charcoalBg, borderWidth: 1.5, borderColor: COLORS.border },
  spotCardActive: { borderColor: COLORS.electricBlue, backgroundColor: "#1d4ed810" },
  spotLabel: { fontSize: 13, fontWeight: "600", color: COLORS.textSecondary },
  noteInput: { backgroundColor: COLORS.charcoalBg, borderRadius: 12, padding: 14, color: COLORS.textPrimary, fontSize: 14, borderWidth: 1, borderColor: COLORS.border, textAlignVertical: "top", minHeight: 80 },
  locationWarning: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#f59e0b15", borderWidth: 1, borderColor: "#f59e0b40", borderRadius: 10, padding: 12, marginTop: 16 },
  locationWarningText: { flex: 1, fontSize: 12, color: COLORS.amber, lineHeight: 18 },
  postBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: COLORS.electricBlue, borderRadius: 14, paddingVertical: 16, marginTop: 24 },
  postBtnDisabled: { backgroundColor: COLORS.charcoalBg, borderWidth: 1, borderColor: COLORS.border },
  postBtnText: { fontSize: 16, fontWeight: "700", color: "#000" },
  sendingContainer: { flex: 1, backgroundColor: COLORS.navyBg, justifyContent: "center", alignItems: "center", padding: 32 },
  sonarWrapper: { width: 160, height: 160, justifyContent: "center", alignItems: "center", marginBottom: 36 },
  sonarRing: { position: "absolute", width: 120, height: 120, borderRadius: 60, borderWidth: 1.5 },
  sonarCenter: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  sendingTitle: { fontSize: 22, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 8 },
  sendingDesc: { fontSize: 15, color: COLORS.textSecondary, textAlign: "center", lineHeight: 22, marginBottom: 28 },
  sendingMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  sendingMetaText: { fontSize: 13, color: COLORS.textSecondary },
  matchedContainer: { alignItems: "center", width: "100%" },
  matchedIconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#22c55e15", justifyContent: "center", alignItems: "center", marginBottom: 20 },
  matchedTitle: { fontSize: 26, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 8 },
  matchedDesc: { fontSize: 14, color: COLORS.textSecondary, textAlign: "center", lineHeight: 22, marginBottom: 24 },
  matchedCard: { width: "100%", backgroundColor: COLORS.charcoalBg, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: COLORS.border, gap: 10, marginBottom: 24 },
  matchedCardRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  matchedCardLabel: { fontSize: 15, fontWeight: "700" },
  matchedCardMeta: { fontSize: 13, color: COLORS.textSecondary },
  matchedDivider: { height: 1, backgroundColor: COLORS.border },
  doneBtn: { width: "100%", borderRadius: 14, paddingVertical: 16, alignItems: "center", marginBottom: 12 },
  doneBtnText: { fontSize: 16, fontWeight: "700", color: "#000" },
  viewMapBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 10 },
  viewMapText: { fontSize: 14, color: COLORS.electricBlue, fontWeight: "600" },
});