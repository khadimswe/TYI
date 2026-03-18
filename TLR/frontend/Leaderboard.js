import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const leaderboard = [
  { id: 1, name: 'Sarah Chen', points: 4850, streak: 12, onFire: true, tagsCaught: 156 },
  { id: 2, name: 'Marcus Johnson', points: 4200, streak: 8, onFire: true, tagsCaught: 132 },
  { id: 3, name: 'Emma Davis', points: 3900, streak: 5, onFire: false, tagsCaught: 121 },
  { id: 4, name: 'Alex Kim', points: 3500, streak: 15, onFire: true, tagsCaught: 108 },
  { id: 5, name: 'Jordan Lee', points: 3200, streak: 6, onFire: true, tagsCaught: 98 },
  { id: 6, name: 'Taylor Brown', points: 2850, streak: 4, onFire: false, tagsCaught: 87 },
  { id: 7, name: 'Casey White', points: 2600, streak: 9, onFire: true, tagsCaught: 79 },
  { id: 8, name: 'Morgan Gray', points: 2400, streak: 3, onFire: false, tagsCaught: 72 },
  { id: 9, name: 'Riley Green', points: 2100, streak: 11, onFire: true, tagsCaught: 65 },
  { id: 10, name: 'Avery Black', points: 1950, streak: 2, onFire: false, tagsCaught: 58 },
  { id: 11, name: 'Quinn Blue', points: 1750, streak: 7, onFire: true, tagsCaught: 52 },
  { id: 12, name: 'Dakota Red', points: 1500, streak: 1, onFire: false, tagsCaught: 45 },
  { id: 13, name: 'Sage Yellow', points: 980, streak: 4, onFire: false, tagsCaught: 38 },
  { id: 14, name: 'Student (You)', points: 420, streak: 3, onFire: false, tagsCaught: 15 },
  { id: 15, name: 'Phoenix Purple', points: 350, streak: 2, onFire: false, tagsCaught: 12 },
];

const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();
const podiumColors = ['#EAB308', '#9CA3AF', '#F97316'];
const podiumHeights = [120, 90, 72];

export default function Leaderboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Campus Leaderboard</Text>
            <Text style={styles.subtitle}>Top helpers at your school</Text>
          </View>
        </View>

        <View style={styles.podium}>
          {[1, 0, 2].map((rankIndex, position) => {
            const user = leaderboard[rankIndex];
            const isFirst = rankIndex === 0;
            return (
              <View key={user.id} style={styles.podiumSlot}>
                <View style={[styles.podiumAvatar, {
                  borderColor: podiumColors[rankIndex],
                  width: isFirst ? 64 : 52,
                  height: isFirst ? 64 : 52,
                  borderRadius: isFirst ? 32 : 26,
                }]}>
                  <Text style={[styles.podiumAvatarText, { fontSize: isFirst ? 20 : 16 }]}>
                    {getInitials(user.name)}
                  </Text>
                </View>
                {isFirst && <Text style={styles.crownIcon}>👑</Text>}
                <Text style={styles.podiumName}>{user.name.split(' ')[0]}</Text>
                <View style={[styles.podiumBar, {
                  height: podiumHeights[position],
                  backgroundColor: podiumColors[rankIndex] + '40',
                  borderTopWidth: 3,
                  borderTopColor: podiumColors[rankIndex],
                }]}>
                  <Text style={[styles.podiumPoints, { color: podiumColors[rankIndex] }]}>
                    {user.points}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {leaderboard.map((user, index) => {
          const isYou = user.name.includes('You');
          const rankEmoji = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : null;
          return (
            <View key={user.id} style={[styles.row, isYou && styles.youRow]}>
              <View style={[styles.rankBadge, { backgroundColor: index < 3 ? podiumColors[index] : '#374151' }]}>
                {rankEmoji
                  ? <Text style={styles.rankEmoji}>{rankEmoji}</Text>
                  : <Text style={styles.rankNumber}>{index + 1}</Text>
                }
              </View>
              <View style={styles.rowAvatar}>
                <Text style={styles.rowAvatarText}>{getInitials(user.name)}</Text>
              </View>
              <View style={styles.rowInfo}>
                <View style={styles.rowNameRow}>
                  <Text style={styles.rowName}>{user.name}</Text>
                  {user.onFire && (
                    <View style={styles.fireBadge}>
                      <Text style={styles.fireText}>🔥 On Fire</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.rowMeta}>{user.tagsCaught} tags · {user.streak} day streak</Text>
              </View>
              <View>
                <Text style={styles.rowPoints}>{user.points}</Text>
                <Text style={styles.rowPointsLabel}>points</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: '#3B82F6' }]}>#14</Text>
              <Text style={styles.statSub}>Rank</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: '#F59E0B' }]}>420</Text>
              <Text style={styles.statSub}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: '#22C55E' }]}>3</Text>
              <Text style={styles.statSub}>Streak</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: 24, paddingTop: 40, gap: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  trophyIcon: { fontSize: 32 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: '#9CA3AF' },
  podium: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 16 },
  podiumSlot: { flex: 1, alignItems: 'center', gap: 4 },
  podiumAvatar: { backgroundColor: '#1E2A3A', borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  podiumAvatarText: { color: '#FFFFFF', fontWeight: 'bold' },
  crownIcon: { fontSize: 20, position: 'absolute', top: -24 },
  podiumName: { color: '#FFFFFF', fontWeight: '600', fontSize: 12 },
  podiumBar: { width: '100%', borderRadius: 4, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 8 },
  podiumPoints: { fontWeight: 'bold', fontSize: 13 },
  row: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  youRow: { borderWidth: 2, borderColor: '#3B82F6', backgroundColor: '#3B82F610' },
  rankBadge: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  rankEmoji: { fontSize: 18 },
  rankNumber: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  rowAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' },
  rowAvatarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  rowInfo: { flex: 1 },
  rowNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  rowName: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  fireBadge: { backgroundColor: '#EF444420', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  fireText: { color: '#EF4444', fontSize: 11 },
  rowMeta: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
  rowPoints: { color: '#F59E0B', fontWeight: 'bold', fontSize: 16, textAlign: 'right' },
  rowPointsLabel: { color: '#9CA3AF', fontSize: 11, textAlign: 'right' },
  statsCard: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16, gap: 12, marginTop: 8 },
  statsTitle: { color: '#9CA3AF', fontSize: 13, textAlign: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', gap: 4 },
  statNum: { fontSize: 24, fontWeight: 'bold' },
  statSub: { color: '#9CA3AF', fontSize: 12 },
});