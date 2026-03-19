import { useState, useRef } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, SafeAreaView, ScrollView, Modal, Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from './LocationContext';

// react-native-maps does not support web — conditionally import
let MapView = View;
let Marker = View;
let Circle = View;
let PROVIDER_DEFAULT = undefined;
if (Platform.OS !== 'web') {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
  Circle = Maps.Circle;
  PROVIDER_DEFAULT = Maps.PROVIDER_DEFAULT;
}

const COLORS = {
  navyBg: "#0a0f1e", charcoalBg: "#141929", electricBlue: "#3b82f6",
  amber: "#f59e0b", green: "#22c55e", border: "#1e2a45",
  textPrimary: "#ffffff", textSecondary: "#94a3b8", red: "#ef4444",
};

const KSU_MARIETTA = {
  latitude: 33.9392175,
  longitude: -84.5200582,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
};

const KSU_BUILDINGS = {
  library:        { latitude: 33.9391799, longitude: -84.5201508, label: "Johnson Library" },
  student_center: { latitude: 33.9406313, longitude: -84.5205239, label: "Wilson Student Center" },
  academic_bldg: { latitude: 33.9382695, longitude: -84.52055162, label: "Academic Building" },
  engineering_bldg: { latitude: 33.9384731, longitude: -84.5212672, label: "Engineering Building" },
  atrium :  { latitude: 33.9378414, longitude: -84.5201247, label: "Atrium" },
};

const MOCK_TAGS = [
  { id: "m1", type: "course", topic: "CS 101", spot: "engineering_bldg", xp: 156, bonusXp: true, minsAgo: 5, requester: "Sam T.", rating: 4.7, note: "Need help before lab tomorrow", latitude: 33.9384731, longitude: -84.5212672 },
  { id: "m2", type: "skill", topic: "Resume Review", spot: "library", xp: 48, bonusXp: true, minsAgo: 12, requester: "Priya N.", rating: 4.9, note: "Internship application due soon", latitude: 33.9391799, longitude: -84.5201508 },
  { id: "m3", type: "course", topic: "MATH 1502", spot: "student_center", xp: 130, bonusXp: false, minsAgo: 35, requester: "Marcus L.", rating: 4.3, note: "Linear algebra — eigenvectors", latitude: 33.9406313, longitude: -84.5205239 },
  { id: "m4", type: "skill", topic: "Figma Basics", spot: "atrium", xp: 32, bonusXp: false, minsAgo: 20, requester: "Chloe R.", rating: 4.6, note: "", latitude: 33.9378414, longitude: -84.5201247 },
  { id: "m5", type: "course", topic: "BIO 2311", spot: "academic_bldg", xp: 180, bonusXp: true, minsAgo: 2, requester: "Eli W.", rating: 5.0, note: "Cell division — need diagrams explained", latitude: 33.9382695, longitude: -84.52055162 },
];

function xpToRadius(xp) {
  if (xp >= 150) return 80;
  if (xp >= 100) return 65;
  if (xp >= 50)  return 50;
  return 38;
}

function TagDetailSheet({ tag, visible, onClose, onCatch }) {
  if (!tag) return null;
  const isCourse = tag.type === "course";
  const accentColor = isCourse ? COLORS.electricBlue : COLORS.green;
  const building = KSU_BUILDINGS[tag.spot];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetTopRow}>
          <View style={[styles.typeBadge, { backgroundColor: `${accentColor}20`, borderColor: accentColor }]}>
            <Ionicons name={isCourse ? "school-outline" : "flash-outline"} size={12} color={accentColor} />
            <Text style={[styles.typeBadgeText, { color: accentColor }]}>{isCourse ? "Course Tag" : "Skill Tag"}</Text>
          </View>
          <Text style={styles.wentPublicText}>Went public {tag.minsAgo} min ago</Text>
        </View>
        <Text style={styles.sheetTopic}>{tag.topic}</Text>
        {tag.note ? <Text style={styles.sheetNote}>{tag.note}</Text> : null}
        <View style={styles.sheetMetaRow}>
          <View style={styles.sheetMeta}>
            <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.sheetMetaText}>{building?.label ?? tag.spot}</Text>
          </View>
          <View style={styles.sheetMeta}>
            <Ionicons name="person-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.sheetMetaText}>{tag.requester}</Text>
            <Ionicons name="star" size={12} color={COLORS.amber} />
            <Text style={styles.sheetMetaText}>{tag.rating}</Text>
          </View>
        </View>
        {tag.bonusXp && (
          <View style={styles.bonusBox}>
            <Ionicons name="flash" size={16} color={COLORS.amber} />
            <Text style={styles.bonusBoxText}>Unclaimed tag — catch now for <Text style={{ fontWeight: "700" }}>+50% XP bonus</Text></Text>
          </View>
        )}
        <View style={styles.sheetXpRow}>
          <Text style={styles.sheetXpLabel}>You earn</Text>
          <Text style={styles.sheetXpValue}>{tag.xp} XP{tag.bonusXp ? " 🔥" : ""}</Text>
        </View>
        <View style={styles.sheetBtns}>
          <TouchableOpacity style={styles.sheetCancelBtn} onPress={onClose}>
            <Text style={styles.sheetCancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sheetCatchBtn, { backgroundColor: accentColor }]} onPress={() => onCatch(tag)}>
            <Ionicons name="hand-right-outline" size={18} color="#000" />
            <Text style={styles.sheetCatchText}>Catch Tag</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function MapScreen({ navigation }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [filter, setFilter] = useState("all");
  const mapRef = useRef(null);

  // ✅ useLocation called INSIDE the component
  const { location, permission } = useLocation();

  const filteredTags = MOCK_TAGS.filter((t) => filter === "all" ? true : t.type === filter);

  const handleCatch = (tag) => {
    setSelectedTag(null);
    navigation?.navigate("SessionActive", { tag });
  };

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }, 600);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navyBg} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Campus Map</Text>
            <Text style={styles.headerSub}>{filteredTags.length} public tags live</Text>
          </View>
          <View style={styles.filterRow}>
            {["all", "course", "skill"].map((f) => (
              <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && styles.filterBtnActive]} onPress={() => setFilter(f)}>
                <Text style={[styles.filterText, filter === f && { color: COLORS.electricBlue }]}>{f.charAt(0).toUpperCase() + f.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {permission === "denied" && (
          <View style={styles.permissionBanner}>
            <Ionicons name="location-outline" size={14} color={COLORS.amber} />
            <Text style={styles.permissionText}>Location access denied — enable it in Settings</Text>
          </View>
        )}

        <View style={styles.mapContainer}>
          <MapView ref={mapRef} style={styles.map} provider={PROVIDER_DEFAULT} initialRegion={KSU_MARIETTA} showsUserLocation={true} showsMyLocationButton={false} showsCompass={false} customMapStyle={darkMapStyle}>

            {filteredTags.map((tag) => {
              const isCourse = tag.type === "course";
              const accentColor = isCourse ? COLORS.electricBlue : COLORS.green;
              const radius = xpToRadius(tag.xp);
              const coord = { latitude: tag.latitude, longitude: tag.longitude };
              return (
                <View key={tag.id}>
                  {tag.bonusXp && (
                    <Circle center={coord} radius={radius + 30} fillColor="rgba(245,158,11,0.06)" strokeColor="rgba(245,158,11,0.35)" strokeWidth={1.5} />
                  )}
                  <Circle center={coord} radius={radius} fillColor={isCourse ? "rgba(59,130,246,0.18)" : "rgba(34,197,94,0.18)"} strokeColor={accentColor} strokeWidth={2} onPress={() => setSelectedTag(tag)} />
                  <Marker coordinate={coord} onPress={() => setSelectedTag(tag)} tracksViewChanges={false}>
                    <View style={[styles.bubbleLabel, { borderColor: accentColor }]}>
                      <Ionicons name={isCourse ? "school" : "flash"} size={10} color={accentColor} />
                      <Text style={[styles.bubbleLabelText, { color: accentColor }]}>{tag.xp} XP</Text>
                      {tag.bonusXp && <Text style={styles.bubbleLabelBonus}>🔥</Text>}
                    </View>
                  </Marker>
                </View>
              );
            })}

            {location && (
              <Circle center={{ latitude: location.latitude, longitude: location.longitude }} radius={500} fillColor="rgba(59,130,246,0.05)" strokeColor="rgba(59,130,246,0.2)" strokeWidth={1} />
            )}
          </MapView>

          <TouchableOpacity style={[styles.centerBtn, !location && { opacity: 0.4 }]} onPress={centerOnUser} disabled={!location}>
            <Ionicons name="locate-outline" size={20} color={COLORS.electricBlue} />
          </TouchableOpacity>

          <View style={styles.mapLegend}>
            {[{ color: COLORS.electricBlue, label: "Course" }, { color: COLORS.green, label: "Skill" }, { color: COLORS.amber, label: "Bonus" }].map((l) => (
              <View key={l.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                <Text style={styles.legendText}>{l.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>Public Tags</Text>
        </View>
        <ScrollView style={styles.tagList} showsVerticalScrollIndicator={false}>
          {filteredTags.map((tag) => {
            const isCourse = tag.type === "course";
            const accent = isCourse ? COLORS.electricBlue : COLORS.green;
            const building = KSU_BUILDINGS[tag.spot];
            return (
              <TouchableOpacity key={tag.id} style={[styles.listCard, { borderLeftColor: accent }]} onPress={() => setSelectedTag(tag)}>
                <View style={styles.listCardLeft}>
                  <Text style={styles.listCardTopic}>{tag.topic}</Text>
                  <Text style={styles.listCardSpot}>{building?.label ?? tag.spot} · {tag.minsAgo}m ago</Text>
                </View>
                <View style={styles.listCardRight}>
                  {tag.bonusXp && <View style={styles.bonusMini}><Ionicons name="flash" size={10} color={COLORS.amber} /><Text style={styles.bonusMiniText}>+50%</Text></View>}
                  <Text style={styles.listCardXp}>{tag.xp} XP</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>

      <TagDetailSheet tag={selectedTag} visible={!!selectedTag} onClose={() => setSelectedTag(null)} onCatch={handleCatch} />
    </SafeAreaView>
  );
}

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0d1526" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0a0f1e" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e2a45" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#141929" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#243050" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a1628" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#141929" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#4a6080" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#0f1f35" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#141929" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1e2a45" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#0d1526" }] },
];

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navyBg },
  container: { flex: 1, backgroundColor: COLORS.navyBg },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.textPrimary },
  headerSub: { fontSize: 12, color: COLORS.textSecondary },
  filterRow: { flexDirection: "row", gap: 4 },
  filterBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  filterBtnActive: { borderColor: COLORS.electricBlue, backgroundColor: "#1d4ed815" },
  filterText: { fontSize: 12, fontWeight: "600", color: COLORS.textSecondary },
  permissionBanner: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#f59e0b10", borderBottomWidth: 1, borderBottomColor: "#f59e0b30" },
  permissionText: { flex: 1, fontSize: 12, color: COLORS.amber },
  mapContainer: { height: 320, position: "relative" },
  map: { flex: 1 },
  bubbleLabel: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "#0a0f1eee", borderWidth: 1, borderRadius: 10, paddingHorizontal: 7, paddingVertical: 3 },
  bubbleLabelText: { fontSize: 10, fontWeight: "700" },
  bubbleLabelBonus: { fontSize: 9 },
  centerBtn: { position: "absolute", bottom: 12, right: 12, width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.charcoalBg, borderWidth: 1, borderColor: COLORS.border, justifyContent: "center", alignItems: "center" },
  mapLegend: { position: "absolute", bottom: 12, left: 12, flexDirection: "row", gap: 10, backgroundColor: "#0a0f1ecc", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { fontSize: 10, color: COLORS.textSecondary },
  listHeader: { paddingHorizontal: 20, paddingVertical: 10, borderTopWidth: 1, borderTopColor: COLORS.border },
  listHeaderText: { fontSize: 13, fontWeight: "600", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: 1 },
  tagList: { flex: 1, paddingHorizontal: 12 },
  listCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.charcoalBg, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border, borderLeftWidth: 3 },
  listCardLeft: { flex: 1 },
  listCardTopic: { fontSize: 15, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 2 },
  listCardSpot: { fontSize: 12, color: COLORS.textSecondary },
  listCardRight: { alignItems: "flex-end", gap: 4 },
  bonusMini: { flexDirection: "row", alignItems: "center", gap: 2 },
  bonusMiniText: { fontSize: 10, color: COLORS.amber, fontWeight: "700" },
  listCardXp: { fontSize: 14, fontWeight: "700", color: COLORS.amber },
  sheetOverlay: { flex: 1, backgroundColor: "#00000060" },
  sheet: { backgroundColor: COLORS.charcoalBg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 36, borderTopWidth: 1, borderColor: COLORS.border },
  sheetHandle: { width: 36, height: 4, backgroundColor: COLORS.border, borderRadius: 2, alignSelf: "center", marginBottom: 20 },
  sheetTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  typeBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  typeBadgeText: { fontSize: 11, fontWeight: "700" },
  wentPublicText: { fontSize: 11, color: COLORS.textSecondary },
  sheetTopic: { fontSize: 22, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 6 },
  sheetNote: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 14, lineHeight: 18 },
  sheetMetaRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  sheetMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  sheetMetaText: { fontSize: 13, color: COLORS.textSecondary },
  bonusBox: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#f59e0b15", borderWidth: 1, borderColor: COLORS.amber, borderRadius: 10, padding: 12, marginBottom: 16 },
  bonusBoxText: { fontSize: 13, color: COLORS.amber, flex: 1 },
  sheetXpRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  sheetXpLabel: { fontSize: 14, color: COLORS.textSecondary },
  sheetXpValue: { fontSize: 22, fontWeight: "700", color: COLORS.amber },
  sheetBtns: { flexDirection: "row", gap: 12 },
  sheetCancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: "center" },
  sheetCancelText: { fontSize: 15, fontWeight: "600", color: COLORS.textSecondary },
  sheetCatchBtn: { flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: 12 },
  sheetCatchText: { fontSize: 15, fontWeight: "700", color: "#000" },
});