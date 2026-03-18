import { useState, useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Animated, StatusBar, SafeAreaView, Modal, Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  navyBg: "#0a0f1e", charcoalBg: "#141929", electricBlue: "#3b82f6",
  amber: "#f59e0b", green: "#22c55e", border: "#1e2a45",
  textPrimary: "#ffffff", textSecondary: "#94a3b8", red: "#ef4444",
};

// ─── SESSION ACTIVE ──────────────────────────────────────────────────────────

const MOCK_MESSAGES = [
  { id: "1", from: "them", text: "Hey! I'm heading to the Library now, should be there in 5 min" },
  { id: "2", from: "me", text: "Perfect, I'll grab a table near the back. See you soon!" },
];

function NoShowModal({ visible, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={nsStyles.overlay}>
        <View style={nsStyles.box}>
          <Ionicons name="alert-circle" size={40} color={COLORS.red} style={{ marginBottom: 12 }} />
          <Text style={nsStyles.title}>Mark as No-Show?</Text>
          <Text style={nsStyles.desc}>
            This will cancel the session, re-throw the tag for others, and award you 20 XP for waiting.
            A no-show will be recorded on their profile.
          </Text>
          <TouchableOpacity style={nsStyles.confirmBtn} onPress={onConfirm}>
            <Text style={nsStyles.confirmText}>Yes, mark no-show</Text>
          </TouchableOpacity>
          <TouchableOpacity style={nsStyles.cancelBtn} onPress={onCancel}>
            <Text style={nsStyles.cancelText}>They're on their way</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function SessionActiveScreen({ navigation, route }) {
  const tag = route?.params?.tag ?? {
    type: "course", topic: "CALC 2401", spot: "Library", xp: 140,
    requester: "Jordan M.", rating: 4.8,
  };

  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [sessionSeconds, setSessionSeconds] = useState(600); // 10 min countdown for no-show
  const [noShowVisible, setNoShowVisible] = useState(false);
  const [noShowAvailable, setNoShowAvailable] = useState(false);
  const scrollRef = useRef(null);

  const isCourse = tag.type === "course";
  const accentColor = isCourse ? COLORS.electricBlue : COLORS.green;

  useEffect(() => {
    if (sessionSeconds <= 0) { setNoShowAvailable(true); return; }
    const t = setTimeout(() => setSessionSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [sessionSeconds]);

  const noShowMins = Math.ceil(sessionSeconds / 60);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now().toString(), from: "me", text: input.trim() }]);
    setInput("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleNoShow = () => {
    setNoShowVisible(false);
    Alert.alert("Session Cancelled", "Tag re-thrown. +20 XP awarded for your time.", [
      { text: "OK", onPress: () => navigation?.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navyBg} />
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: accentColor }]}>
          <View style={[styles.accentDot, { backgroundColor: accentColor }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTopic}>{tag.topic}</Text>
            <Text style={styles.headerSub}>Session with {tag.requester} · {tag.spot}</Text>
          </View>
          <View style={styles.xpChip}>
            <Ionicons name="zap" size={13} color={COLORS.amber} />
            <Text style={styles.xpChipText}>{tag.xp} XP</Text>
          </View>
        </View>

        {/* No-show countdown */}
        {!noShowAvailable ? (
          <View style={styles.noShowBanner}>
            <Ionicons name="time-outline" size={15} color={COLORS.textSecondary} />
            <Text style={styles.noShowBannerText}>
              If they don't show in <Text style={{ color: COLORS.textPrimary, fontWeight: "700" }}>{noShowMins} min</Text>, you can mark a no-show
            </Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.noShowReadyBanner} onPress={() => setNoShowVisible(true)}>
            <Ionicons name="alert-circle-outline" size={15} color={COLORS.red} />
            <Text style={styles.noShowReadyText}>Mark no-show — 10 minutes passed</Text>
            <Ionicons name="chevron-forward" size={15} color={COLORS.red} />
          </TouchableOpacity>
        )}

        {/* Chat */}
        <ScrollView
          ref={scrollRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sessionStarted}>
            <Text style={styles.sessionStartedText}>Session started · Meet at {tag.spot}</Text>
          </View>
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.bubble, msg.from === "me" ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={[styles.bubbleText, msg.from === "me" ? styles.bubbleTextMe : styles.bubbleTextThem]}>
                {msg.text}
              </Text>
            </View>
          ))}
          <View style={{ height: 16 }} />
        </ScrollView>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.chatInput}
            value={input}
            onChangeText={setInput}
            placeholder="Message..."
            placeholderTextColor={COLORS.textSecondary}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: input.trim() ? accentColor : COLORS.charcoalBg }]}
            onPress={sendMessage}
          >
            <Ionicons name="send" size={16} color={input.trim() ? "#000" : COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Complete button */}
        <TouchableOpacity
          style={[styles.completeBtn, { borderColor: accentColor }]}
          onPress={() => navigation?.navigate("SessionComplete", { tag })}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color={accentColor} />
          <Text style={[styles.completeBtnText, { color: accentColor }]}>Mark Session Complete</Text>
        </TouchableOpacity>
      </View>

      <NoShowModal
        visible={noShowVisible}
        onConfirm={handleNoShow}
        onCancel={() => setNoShowVisible(false)}
      />
    </SafeAreaView>
  );
}

const nsStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "#00000080", justifyContent: "center", alignItems: "center", padding: 24 },
  box: { backgroundColor: COLORS.charcoalBg, borderRadius: 20, padding: 24, width: "100%", alignItems: "center", borderWidth: 1, borderColor: COLORS.border },
  title: { fontSize: 18, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 10 },
  desc: { fontSize: 13, color: COLORS.textSecondary, textAlign: "center", lineHeight: 20, marginBottom: 20 },
  confirmBtn: { width: "100%", backgroundColor: COLORS.red, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginBottom: 10 },
  confirmText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  cancelBtn: { paddingVertical: 10 },
  cancelText: { fontSize: 14, color: COLORS.textSecondary },
});

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navyBg },
  container: { flex: 1, backgroundColor: COLORS.navyBg },
  header: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 2,
  },
  accentDot: { width: 10, height: 10, borderRadius: 5 },
  headerTopic: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary },
  headerSub: { fontSize: 12, color: COLORS.textSecondary },
  xpChip: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#f59e0b15", borderWidth: 1, borderColor: COLORS.amber,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
  },
  xpChipText: { fontSize: 13, fontWeight: "700", color: COLORS.amber },
  noShowBanner: {
    flexDirection: "row", alignItems: "center", gap: 8,
    paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS.charcoalBg,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  noShowBannerText: { fontSize: 12, color: COLORS.textSecondary, flex: 1 },
  noShowReadyBanner: {
    flexDirection: "row", alignItems: "center", gap: 8,
    paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#ef444415",
    borderBottomWidth: 1, borderBottomColor: COLORS.red,
  },
  noShowReadyText: { flex: 1, fontSize: 12, fontWeight: "600", color: COLORS.red },
  chatArea: { flex: 1 },
  chatContent: { padding: 16 },
  sessionStarted: { alignItems: "center", marginBottom: 16 },
  sessionStartedText: { fontSize: 12, color: COLORS.textSecondary, backgroundColor: COLORS.charcoalBg, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  bubble: { maxWidth: "78%", borderRadius: 16, padding: 12, marginBottom: 8 },
  bubbleMe: { alignSelf: "flex-end", backgroundColor: COLORS.electricBlue, borderBottomRightRadius: 4 },
  bubbleThem: { alignSelf: "flex-start", backgroundColor: COLORS.charcoalBg, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: COLORS.border },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextMe: { color: "#fff" },
  bubbleTextThem: { color: COLORS.textPrimary },
  inputRow: {
    flexDirection: "row", gap: 8, paddingHorizontal: 16, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  chatInput: {
    flex: 1, backgroundColor: COLORS.charcoalBg, borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, color: COLORS.textPrimary,
    fontSize: 14, borderWidth: 1, borderColor: COLORS.border,
  },
  sendBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  completeBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    marginHorizontal: 16, marginBottom: 16, paddingVertical: 14, borderRadius: 14, borderWidth: 1.5,
  },
  completeBtnText: { fontSize: 15, fontWeight: "700" },
});


// ─── SESSION COMPLETE ─────────────────────────────────────────────────────────

export function SessionCompleteScreen({ navigation, route }) {
  const tag = route?.params?.tag ?? {
    type: "course", topic: "CALC 2401", xp: 140, requester: "Jordan M.",
  };

  const [myRating, setMyRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const isCourse = tag.type === "course";
  const accentColor = isCourse ? COLORS.electricBlue : COLORS.green;

  useEffect(() => {
    if (submitted) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
    }
  }, [submitted]);

  if (submitted) {
    return (
      <SafeAreaView style={completeStyles.safeArea}>
        <View style={completeStyles.successContainer}>
          <Animated.View style={[completeStyles.successIcon, { transform: [{ scale: scaleAnim }] }]}>
            <Ionicons name="checkmark-circle" size={64} color={COLORS.green} />
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
            <Text style={completeStyles.successTitle}>Session Complete!</Text>
            <View style={completeStyles.xpAward}>
              <Ionicons name="zap" size={20} color={COLORS.amber} />
              <Text style={completeStyles.xpAwardText}>+{tag.xp} XP Earned</Text>
            </View>
            <Text style={completeStyles.successSub}>
              Thanks for helping {tag.requester} with {tag.topic}
            </Text>

            {/* Share sticker */}
            <TouchableOpacity style={completeStyles.shareBtn}>
              <Ionicons name="share-social-outline" size={18} color={COLORS.electricBlue} />
              <Text style={completeStyles.shareBtnText}>Share "Thanks for the Tag!" sticker</Text>
            </TouchableOpacity>

            {/* Tag again */}
            <TouchableOpacity style={completeStyles.tagAgainBtn}>
              <Ionicons name="pricetag-outline" size={16} color={COLORS.textSecondary} />
              <Text style={completeStyles.tagAgainText}>Tag {tag.requester} again</Text>
            </TouchableOpacity>

            {/* Invite to Squad */}
            <TouchableOpacity style={completeStyles.squadBtn}>
              <Ionicons name="people-outline" size={16} color={accentColor} />
              <Text style={[completeStyles.squadBtnText, { color: accentColor }]}>
                Invite to Study Squad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[completeStyles.doneBtn, { backgroundColor: accentColor }]}
              onPress={() => navigation?.navigate("MainApp")}
            >
              <Text style={completeStyles.doneBtnText}>Back to Home</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={completeStyles.safeArea}>
      <View style={completeStyles.container}>
        <View style={completeStyles.topSection}>
          <View style={[completeStyles.topIcon, { backgroundColor: `${accentColor}20` }]}>
            <Ionicons name="school-outline" size={32} color={accentColor} />
          </View>
          <Text style={completeStyles.title}>How'd it go?</Text>
          <Text style={completeStyles.sub}>Rate your session with {tag.requester}</Text>
        </View>

        {/* Stars */}
        <View style={completeStyles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setMyRating(star)}>
              <Ionicons
                name={star <= myRating ? "star" : "star-outline"}
                size={40}
                color={star <= myRating ? COLORS.amber : COLORS.border}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={completeStyles.ratingLabel}>
          {myRating === 0 ? "Tap to rate" : ["", "Not great", "It was okay", "Pretty good", "Really helpful", "Outstanding! ⚡"][myRating]}
        </Text>

        {/* XP preview */}
        <View style={completeStyles.xpPreview}>
          <View style={completeStyles.xpRow}>
            <Text style={completeStyles.xpRowLabel}>Session XP</Text>
            <Text style={completeStyles.xpRowValue}>+{tag.xp} XP</Text>
          </View>
          {myRating === 5 && (
            <View style={completeStyles.xpRow}>
              <Text style={completeStyles.xpRowLabel}>5-star bonus</Text>
              <Text style={[completeStyles.xpRowValue, { color: COLORS.green }]}>+50 XP</Text>
            </View>
          )}
          <View style={[completeStyles.xpRow, completeStyles.xpTotal]}>
            <Text style={completeStyles.xpTotalLabel}>Total</Text>
            <Text style={completeStyles.xpTotalValue}>
              +{tag.xp + (myRating === 5 ? 50 : 0)} XP
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[completeStyles.submitBtn, { backgroundColor: myRating > 0 ? accentColor : COLORS.charcoalBg }]}
          disabled={myRating === 0}
          onPress={() => setSubmitted(true)}
        >
          <Text style={[completeStyles.submitBtnText, { color: myRating > 0 ? "#000" : COLORS.textSecondary }]}>
            Submit Rating
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const completeStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navyBg },
  container: { flex: 1, backgroundColor: COLORS.navyBg, padding: 24, justifyContent: "center" },
  topSection: { alignItems: "center", marginBottom: 32 },
  topIcon: { width: 72, height: 72, borderRadius: 36, justifyContent: "center", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 26, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 6 },
  sub: { fontSize: 14, color: COLORS.textSecondary },
  starsRow: { flexDirection: "row", justifyContent: "center", gap: 12, marginBottom: 12 },
  ratingLabel: { textAlign: "center", fontSize: 14, color: COLORS.textSecondary, marginBottom: 28 },
  xpPreview: { backgroundColor: COLORS.charcoalBg, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 24 },
  xpRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  xpRowLabel: { fontSize: 14, color: COLORS.textSecondary },
  xpRowValue: { fontSize: 14, fontWeight: "700", color: COLORS.amber },
  xpTotal: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 8, marginTop: 4, marginBottom: 0 },
  xpTotalLabel: { fontSize: 15, fontWeight: "700", color: COLORS.textPrimary },
  xpTotalValue: { fontSize: 18, fontWeight: "700", color: COLORS.amber },
  submitBtn: { borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  submitBtnText: { fontSize: 16, fontWeight: "700" },
  // Success state
  successContainer: { flex: 1, backgroundColor: COLORS.navyBg, justifyContent: "center", alignItems: "center", padding: 32 },
  successIcon: { marginBottom: 20 },
  successTitle: { fontSize: 28, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 12 },
  xpAward: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#f59e0b15", borderWidth: 1, borderColor: COLORS.amber, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginBottom: 12 },
  xpAwardText: { fontSize: 18, fontWeight: "700", color: COLORS.amber },
  successSub: { fontSize: 14, color: COLORS.textSecondary, textAlign: "center", marginBottom: 32 },
  shareBtn: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#3b82f615", borderWidth: 1, borderColor: COLORS.electricBlue, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 10, width: "100%" },
  shareBtnText: { fontSize: 14, fontWeight: "600", color: COLORS.electricBlue },
  tagAgainBtn: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 10, width: "100%" },
  tagAgainText: { fontSize: 14, color: COLORS.textSecondary },
  squadBtn: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 28, width: "100%" },
  squadBtnText: { fontSize: 14, fontWeight: "600" },
  doneBtn: { width: "100%", borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  doneBtnText: { fontSize: 16, fontWeight: "700", color: "#000" },
});