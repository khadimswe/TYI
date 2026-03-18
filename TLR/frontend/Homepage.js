import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Homepage({ navigation }) {
  const [xp] = useState(1240);
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 32 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Two-tier nearby tags — blue = course, green = skill
  const nearbyTags = [
    {
      id: '1', type: 'course', subject: 'CS 101',
      topic: 'Need help learning how to do linked list', distance: '0.2 mi',
      xp: 140, passes: 2, urgency: 'ASAP',
    },
    {
      id: '2', type: 'skill', subject: 'Figma Basics',
      topic: 'Help cleaning up a design in Figma', distance: '0.3 mi',
      xp: 38, passes: 0, urgency: 'Soon',
    },
    {
      id: '3', type: 'course', subject: 'Math 1502',
      topic: 'Linear algebra', distance: '0.5 mi',
      xp: 90, passes: 1, urgency: 'Today',
    },
  ];

  const hotSubjects = [
    { subject: 'Calc II', count: 12, color: '#3B82F6' },
    { subject: 'Python', count: 9, color: '#22C55E' },
    { subject: 'Accounting', count: 7, color: '#F59E0B' },
    { subject: 'Physics', count: 5, color: '#3B82F6' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
<View style={styles.header}>
  <TouchableOpacity style={styles.profileRow} onPress={() => navigation.navigate('Profile')}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>K</Text>
    </View>
    <View>
      <Text style={styles.welcomeText}>Welcome back</Text>
      <Text style={styles.userName}>Khadim</Text>
    </View>
  </TouchableOpacity>

  {/* Right side — XP + notification bell */}
  <View style={styles.headerRight}>
    <TouchableOpacity style={styles.xpBadge} onPress={() => navigation.navigate('XPWallet')}>
      <Text style={styles.xpText}>{xp.toLocaleString()} XP</Text>
    </TouchableOpacity>

    {/* Bell — opens TagFeed */}
    <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('TagFeed')}>
      <Ionicons name="notifications-outline" size={18} color="#FFFFFF" />
      {/* Badge — shows number of incoming tags */}
      <View style={styles.bellBadge}>
        <Text style={styles.bellBadgeText}>3</Text>
      </View>
    </TouchableOpacity>
  </View>
</View>

        {/* Midterm Rush Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerRow}>
            <Text style={styles.bannerTitle}>MIDTERM RUSH EVENT!!</Text>
          </View>
          <Text style={styles.bannerSubtitle}>
            All tags worth <Text style={styles.bold}>1.5x XP</Text>
          </Text>
          <View style={styles.bannerFooter}>
            <Text style={styles.bannerTime}>
              Ends in {timeLeft.hours}h {timeLeft.minutes}m
            </Text>
            <View style={styles.bonusBadge}>
              <Text style={styles.bonusText}>+60 XP for CALC tags</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => navigation.navigate('CreateTag')}
          >
            <Ionicons name="pricetag-outline" size={20} color="#3B82F6" />
            <Text style={styles.quickActionText}>Create Tag</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => navigation.navigate('Map')}
          >
            <Ionicons name="map-outline" size={20} color="#22C55E" />
            <Text style={styles.quickActionText}>Live Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => navigation.navigate('XPWallet')}
          >
            <Ionicons name="wallet-outline" size={20} color="#F59E0B" />
            <Text style={styles.quickActionText}>XP Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => navigation.jumpTo('Leaderboard')}
          >
            <Ionicons name="trophy-outline" size={20} color="#A855F7" />
            <Text style={styles.quickActionText}>Ranks</Text>
          </TouchableOpacity>
        </View>

        {/* Live Tags Near You */}
<View style={styles.section}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>Live Tags Near You</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Map')}>
      <Text style={styles.viewAll}>View All ›</Text>
    </TouchableOpacity>
  </View>

  {nearbyTags.map((tag) => {
    const isCourse = tag.type === 'course';
    const accentColor = isCourse ? '#3B82F6' : '#22C55E';
    return (
      <TouchableOpacity
        key={tag.id}
        style={[styles.tagCard, { borderLeftColor: accentColor }]}
        onPress={() => navigation.navigate('Map')}
      >
        <View style={[styles.tierBadge, { backgroundColor: `${accentColor}20`, borderColor: accentColor }]}>
          <Ionicons
            name={isCourse ? 'school-outline' : 'flash-outline'}
            size={10} color={accentColor}
          />
          <Text style={[styles.tierBadgeText, { color: accentColor }]}>
            {isCourse ? 'Course' : 'Skill'}
          </Text>
        </View>

        <View style={styles.tagContent}>
          <View style={styles.tagRow}>
            <Text style={styles.tagSubject}>{tag.subject}</Text>
            {tag.passes > 0 && (
              <View style={styles.passBadge}>
                <Text style={styles.passText}>⚡ {tag.passes}x passed</Text>
              </View>
            )}
          </View>
          <Text style={styles.tagTopic}>{tag.topic}</Text>
          <View style={styles.tagMeta}>
            <Text style={styles.metaText}>📍 {tag.distance}</Text>
            <Text style={styles.metaXP}>{tag.xp} XP</Text>
            <View style={[
              styles.urgencyBadge,
              { backgroundColor: tag.urgency === 'ASAP' ? '#EF444420' : '#3B82F620' }
            ]}>
              <Text style={[
                styles.urgencyText,
                { color: tag.urgency === 'ASAP' ? '#EF4444' : '#3B82F6' }
              ]}>{tag.urgency}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  })}
</View>

        {/* Today on Campus */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today on Campus</Text>

          <View style={styles.statsCard}>
            <View>
              <Text style={styles.statsLabel}>Tags Solved Today</Text>
              <Text style={styles.statsNumber}>87</Text>
            </View>
            <View style={styles.statsIcon}>
              <Text style={styles.statsIconText}>📈</Text>
            </View>
          </View>

          <View style={styles.statsCard}>
            <View>
              <Text style={styles.statsLabel}>Top Helper Today</Text>
              <View style={styles.helperRow}>
                <View style={styles.helperAvatar}>
                  <Text style={styles.helperAvatarText}>SC</Text>
                </View>
                <View>
                  <Text style={styles.helperName}>Sarah Chen</Text>
                  <Text style={styles.helperPoints}>+340 XP today</Text>
                </View>
              </View>
            </View>
            <Text style={styles.flameIcon}>🔥</Text>
          </View>
        </View>

        {/* Hot Subjects */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hot Subjects Near You</Text>
                      </View>
          <View style={styles.subjectsGrid}>
            {hotSubjects.map((subject) => (
              <TouchableOpacity
                key={subject.subject}
                style={styles.subjectCard}
                onPress={() => navigation.navigate('CreateTag')}
              >
                <View style={styles.subjectRow}>
                  <View style={[styles.subjectDot, { backgroundColor: subject.color }]} />
                  <Text style={styles.subjectName}>{subject.subject}</Text>
                </View>
                <Text style={styles.subjectCount}>{subject.count} active tags</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { paddingBottom: 100 },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 24,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  welcomeText: { color: '#9CA3AF', fontSize: 12 },
  userName: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  xpBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#1E2A3A', paddingHorizontal: 14,
    paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: '#F59E0B30',
  },
  xpText: { color: '#F59E0B', fontWeight: 'bold', fontSize: 12 },

  banner: {
    marginHorizontal: 24, marginBottom: 16, padding: 20,
    borderRadius: 12, backgroundColor: '#7C3AED', gap: 8,
  },
  bannerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bannerTitle: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  bannerSubtitle: { color: '#FFFFFF', fontSize: 14 },
  bold: { fontWeight: 'bold' },
  bannerFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerTime: { color: '#FFFFFF', fontSize: 13 },
  bonusBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  bonusText: { color: '#FFFFFF', fontSize: 12 },

  // Quick actions row
  quickActions: {
    flexDirection: 'row', marginHorizontal: 24, marginBottom: 24,
    gap: 8,
  },
  quickActionBtn: {
    flex: 1, backgroundColor: '#141929', borderRadius: 12,
    paddingVertical: 12, alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: '#1E2A45',
  },
  quickActionText: { color: '#9CA3AF', fontSize: 10, fontWeight: '600' },

  section: { paddingHorizontal: 24, marginBottom: 24, gap: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  viewAll: { color: '#3B82F6', fontSize: 14 },
  trendIcon: { fontSize: 20 },

  // Tag cards — two-tier style
  tagCard: {
    backgroundColor: '#1E2A3A', borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    borderLeftWidth: 3,
  },
  tierBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6,
    borderWidth: 1, marginTop: 2, alignSelf: 'flex-start',
  },
  tierBadgeText: { fontSize: 9, fontWeight: '700' },
  tagContent: { flex: 1, gap: 4 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tagSubject: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  passBadge: { backgroundColor: '#F59E0B20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  passText: { color: '#F59E0B', fontSize: 11 },
  tagTopic: { color: '#9CA3AF', fontSize: 13 },
  tagMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  metaText: { color: '#6B7280', fontSize: 12 },
  metaXP: { color: '#F59E0B', fontSize: 12, fontWeight: '600' },
  urgencyBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  urgencyText: { fontSize: 11, fontWeight: '600' },

  statsCard: {
    backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  statsLabel: { color: '#9CA3AF', fontSize: 13, marginBottom: 4 },
  statsNumber: { color: '#22C55E', fontSize: 32, fontWeight: 'bold' },
  statsIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#22C55E20', alignItems: 'center', justifyContent: 'center',
  },
  statsIconText: { fontSize: 28 },
  helperRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  helperAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center',
  },
  helperAvatarText: { color: '#000000', fontWeight: 'bold', fontSize: 14 },
  helperName: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  helperPoints: { color: '#F59E0B', fontSize: 13 },
  flameIcon: { fontSize: 24 },

  subjectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  subjectCard: {
    backgroundColor: '#1E2A3A', borderRadius: 12,
    padding: 16, width: '47%', gap: 6,
  },
  subjectRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subjectDot: { width: 10, height: 10, borderRadius: 5 },
  subjectName: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
  subjectCount: { color: '#9CA3AF', fontSize: 12 },
  headerRight: {
  flexDirection: 'row', alignItems: 'center', gap: 10,
},
bellBtn: {
  width: 40, height: 40, borderRadius: 20,
  backgroundColor: '#1E2A3A', alignItems: 'center', justifyContent: 'center',
  borderWidth: 1, borderColor: '#1E2A45',
},
bellBadge: {
  position: 'absolute', top: -2, right: -2,
  width: 16, height: 16, borderRadius: 8,
  backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center',
},
bellBadgeText: {
  color: '#FFFFFF', fontSize: 9, fontWeight: '700',
},
});