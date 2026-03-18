import { useState, useRef } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  StatusBar, SafeAreaView, ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  navyBg: "#0a0f1e", charcoalBg: "#141929", electricBlue: "#3b82f6",
  amber: "#f59e0b", green: "#22c55e", border: "#1e2a45",
  textPrimary: "#ffffff", textSecondary: "#94a3b8", red: "#ef4444",
};

const STEPS = [
  {
    title: "How Sessions Work",
    icon: "people-outline",
    color: COLORS.electricBlue,
    items: [
      "When you catch a tag, you commit to helping that student",
      "Meet at the agreed campus location within the time window",
      "Use the in-app chat to coordinate last-minute details",
      "Sessions typically last 15–45 minutes",
      "Both parties rate each other after completion",
    ],
  },
  {
    title: "Community Guidelines",
    icon: "shield-outline",
    color: COLORS.amber,
    items: [
      "Be respectful, patient, and genuinely supportive",
      "Only catch tags for subjects you're confident in",
      "Explain concepts — don't do the work for them",
      "Meet only at approved campus spots listed in the app",
      "Report any inappropriate behavior immediately",
    ],
  },
  {
    title: "No-Show & Cancellation",
    icon: "alert-circle-outline",
    color: COLORS.red,
    items: [
      "Cancelling loses you 50 XP and affects your rating",
      "No-shows result in a 100 XP penalty and temp suspension",
      "If the requester doesn't show, you earn half XP automatically",
      "Emergency? Use the SOS feature — it won't count against you",
      "3 no-shows = account review and possible ban",
    ],
    warning: "Take this seriously. If you catch a tag, show up.",
  },
];

export function HelperOrientationScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const animateStep = (next) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      next();
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  const handleNext = () => {
    if (isLast) {
      setCompleted(true);
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
    } else {
      animateStep(() => setStep((s) => s + 1));
    }
  };

  const handleBack = () => animateStep(() => setStep((s) => s - 1));

  const handleFinish = () => {
    navigation?.navigate("MainApp");
  };

  if (completed) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.successContainer}>
          <Animated.View style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name="checkmark-circle" size={64} color={COLORS.green} />
          </Animated.View>
          <Text style={styles.successTitle}>You're All Set!</Text>
          <Text style={styles.successSub}>
            You're ready to start helping students and earning XP. Remember the community guidelines and have fun.
          </Text>

          <View style={styles.bonusCard}>
            <View style={styles.bonusRow}>
              <Ionicons name="zap" size={20} color={COLORS.amber} />
              <Text style={styles.bonusLabel}>Welcome Bonus</Text>
            </View>
            <Text style={styles.bonusXP}>+25 XP</Text>
            <Text style={styles.bonusDesc}>For completing helper orientation</Text>
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={handleFinish}>
            <Text style={styles.startBtnText}>Start Helping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navyBg} />
      <View style={styles.container}>
        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressBarRow}>
            {STEPS.map((_, i) => (
              <View
                key={i}
                style={[styles.progressSegment, i <= step && { backgroundColor: COLORS.electricBlue }]}
              />
            ))}
          </View>
          <Text style={styles.progressLabel}>Step {step + 1} of {STEPS.length}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Icon */}
            <View style={[styles.iconCircle, { backgroundColor: `${current.color}20` }]}>
              <Ionicons name={current.icon} size={36} color={current.color} />
            </View>

            {/* Title */}
            <Text style={styles.stepTitle}>{current.title}</Text>

            {/* Items */}
            <View style={styles.itemsList}>
              {current.items.map((item, i) => (
                <Animated.View
                  key={i}
                  style={[styles.itemRow, { borderColor: COLORS.border }]}
                >
                  <View style={[styles.itemDotOuter, { backgroundColor: `${current.color}25` }]}>
                    <View style={[styles.itemDotInner, { backgroundColor: current.color }]} />
                  </View>
                  <Text style={styles.itemText}>{item}</Text>
                </Animated.View>
              ))}
            </View>

            {/* Warning for last step */}
            {current.warning && (
              <View style={styles.warningBox}>
                <Ionicons name="alert-triangle-outline" size={18} color={COLORS.red} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.warningTitle}>Take this seriously</Text>
                  <Text style={styles.warningText}>{current.warning}</Text>
                </View>
              </View>
            )}
          </Animated.View>
        </ScrollView>

        {/* Navigation */}
        <View style={styles.navRow}>
          {step > 0 ? (
            <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
          ) : <View style={{ flex: 1 }} />}

          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: current.color }]}
            onPress={handleNext}
          >
            <Text style={styles.nextBtnText}>{isLast ? "I Understand" : "Next"}</Text>
            {!isLast && <Ionicons name="arrow-forward" size={16} color="#000" />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navyBg },
  container: { flex: 1, backgroundColor: COLORS.navyBg },
  progressSection: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  progressBarRow: { flexDirection: "row", gap: 6, marginBottom: 6 },
  progressSegment: {
    flex: 1, height: 3, borderRadius: 2, backgroundColor: COLORS.border,
  },
  progressLabel: { fontSize: 12, color: COLORS.textSecondary },
  scroll: { padding: 24, paddingTop: 16 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: "center", alignItems: "center",
    alignSelf: "center", marginBottom: 20,
  },
  stepTitle: { fontSize: 26, fontWeight: "700", color: COLORS.textPrimary, textAlign: "center", marginBottom: 24 },
  itemsList: { gap: 10 },
  itemRow: {
    flexDirection: "row", alignItems: "flex-start", gap: 12,
    backgroundColor: COLORS.charcoalBg, borderRadius: 12, padding: 14,
    borderWidth: 1,
  },
  itemDotOuter: {
    width: 24, height: 24, borderRadius: 12,
    justifyContent: "center", alignItems: "center", marginTop: 1, flexShrink: 0,
  },
  itemDotInner: { width: 8, height: 8, borderRadius: 4 },
  itemText: { flex: 1, fontSize: 14, color: COLORS.textSecondary, lineHeight: 20 },
  warningBox: {
    flexDirection: "row", alignItems: "flex-start", gap: 10,
    backgroundColor: "#ef444415", borderWidth: 1, borderColor: COLORS.red,
    borderRadius: 12, padding: 14, marginTop: 16,
  },
  warningTitle: { fontSize: 13, fontWeight: "700", color: COLORS.red, marginBottom: 2 },
  warningText: { fontSize: 13, color: "#fca5a5", lineHeight: 18 },
  navRow: { flexDirection: "row", gap: 12, padding: 20, borderTopWidth: 1, borderTopColor: COLORS.border },
  backBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.border, alignItems: "center",
  },
  backBtnText: { fontSize: 15, fontWeight: "600", color: COLORS.textSecondary },
  nextBtn: {
    flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 6, paddingVertical: 14, borderRadius: 12,
  },
  nextBtnText: { fontSize: 15, fontWeight: "700", color: "#000" },
  // Success
  successContainer: {
    flex: 1, backgroundColor: COLORS.navyBg, justifyContent: "center",
    alignItems: "center", padding: 32,
  },
  successCircle: { marginBottom: 20 },
  successTitle: { fontSize: 28, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 10 },
  successSub: { fontSize: 14, color: COLORS.textSecondary, textAlign: "center", lineHeight: 22, marginBottom: 28 },
  bonusCard: {
    width: "100%", backgroundColor: COLORS.charcoalBg, borderRadius: 16,
    padding: 20, borderWidth: 1, borderColor: COLORS.border, alignItems: "center", marginBottom: 28,
  },
  bonusRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  bonusLabel: { fontSize: 15, fontWeight: "600", color: COLORS.textPrimary },
  bonusXP: { fontSize: 38, fontWeight: "700", color: COLORS.amber, marginBottom: 4 },
  bonusDesc: { fontSize: 13, color: COLORS.textSecondary },
  startBtn: {
    width: "100%", backgroundColor: COLORS.electricBlue,
    borderRadius: 14, paddingVertical: 16, alignItems: "center",
  },
  startBtnText: { fontSize: 16, fontWeight: "700", color: "#000" },
});