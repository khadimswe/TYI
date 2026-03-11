import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function Homepage({ navigation }) {
  const [points] = useState(1250);
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 32 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const nearbyTags = [
    {
      id: '1',
      subject: 'Calculus II',
      topic: 'Integration by parts help',
      distance: '0.2 mi',
      points: 120,
      passes: 2,
      color: '#EF4444',
      urgency: 'ASAP',
    },
    {
      id: '2',
      subject: 'Computer Science',
      topic: 'Binary search tree traversal',
      distance: '0.3 mi',
      points: 75,
      passes: 1,
      color: '#22C55E',
      urgency: 'Soon',
    },
    {
      id: '3',
      subject: 'Physics',
      topic: 'Projectile motion problem',
      distance: '0.5 mi',
      points: 50,
      passes: 0,
      color: '#3B82F6',
      urgency: 'Today',
    },
  ];

  const hotSubjects = [
    { subject: 'Calculus II', count: 12, color: '#EF4444' },
    { subject: 'Computer Science', count: 9, color: '#22C55E' },
    { subject: 'Accounting', count: 7, color: '#F97316' },
    { subject: 'Physics', count: 5, color: '#3B82F6' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.userName}>Student</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.pointsBadge}>
            <Text style={styles.trophyIcon}>🏆</Text>
            <Text style={styles.pointsText}>{points}</Text>
          </View>
        </View>

        {/* Midterm Rush Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerRow}>
            <Text style={styles.bannerIcon}>🔥</Text>
            <Text style={styles.bannerTitle}>MIDTERM RUSH EVENT</Text>
          </View>
          <Text style={styles.bannerSubtitle}>
            All tags worth <Text style={styles.bold}>1.5x points</Text>
          </Text>
          <View style={styles.bannerFooter}>
            <Text style={styles.bannerTime}>
              ⏰ Ends in {timeLeft.hours}h {timeLeft.minutes}m
            </Text>
            <View style={styles.bonusBadge}>
              <Text style={styles.bonusText}>⚡ +60 pts for Calc II</Text>
            </View>
          </View>
        </View>

        {/* Leaderboard Shortcut */}
        <TouchableOpacity style={styles.leaderboardCard}>
          <View style={styles.leaderboardLeft}>
            <Text style={styles.leaderboardIcon}>🏆</Text>
            <View>
              <Text style={styles.leaderboardTitle}>Campus Leaderboard</Text>
              <Text style={styles.leaderboardSubtitle}>See who's helping the most</Text>
            </View>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Live Tags Near You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live Tags Near You</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All ›</Text>
            </TouchableOpacity>
          </View>

          {nearbyTags.map((tag) => (
            <TouchableOpacity key={tag.id} style={styles.tagCard}>
              <View style={[styles.tagDot, { backgroundColor: tag.color }]} />
              <View style={styles.tagContent}>
                <View style={styles.tagRow}>
                  <Text style={styles.tagSubject}>{tag.subject}</Text>
                  {tag.passes > 0 && (
                    <View style={styles.passBadge}>
                      <Text style={styles.passText}>{tag.passes}x passed</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.tagTopic}>{tag.topic}</Text>
                <View style={styles.tagMeta}>
                  <Text style={styles.metaText}>📍 {tag.distance}</Text>
                  <Text style={styles.metaPoints}>🏆 {tag.points} pts</Text>
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
          ))}
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
                  <Text style={styles.helperPoints}>🏆 +340 pts today</Text>
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
            <Text style={styles.trendIcon}>📈</Text>
          </View>
          <View style={styles.subjectsGrid}>
            {hotSubjects.map((subject) => (
              <View key={subject.subject} style={styles.subjectCard}>
                <View style={styles.subjectRow}>
                  <View style={[styles.subjectDot, { backgroundColor: subject.color }]} />
                  <Text style={styles.subjectName}>{subject.subject}</Text>
                </View>
                <Text style={styles.subjectCount}>{subject.count} active tags</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  scroll: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  welcomeText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2A3A',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  trophyIcon: {
    fontSize: 16,
  },
  pointsText: {
    color: '#F59E0B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  banner: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#7C3AED',
    gap: 8,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bannerIcon: {
    fontSize: 18,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  bannerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTime: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  bonusBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  bonusText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  leaderboardCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leaderboardIcon: {
    fontSize: 32,
    marginRight: 8,
  },
  leaderboardTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  leaderboardSubtitle: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  chevron: {
    color: '#9CA3AF',
    fontSize: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#3B82F6',
    fontSize: 14,
  },
  trendIcon: {
    fontSize: 20,
  },
  tagCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tagDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  tagContent: {
    flex: 1,
    gap: 4,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagSubject: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  passBadge: {
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  passText: {
    color: '#F59E0B',
    fontSize: 11,
  },
  tagTopic: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  tagMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 12,
  },
  metaPoints: {
    color: '#F59E0B',
    fontSize: 12,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsLabel: {
    color: '#9CA3AF',
    fontSize: 13,
    marginBottom: 4,
  },
  statsNumber: {
    color: '#22C55E',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statsIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#22C55E20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsIconText: {
    fontSize: 28,
  },
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  helperAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperAvatarText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  helperName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  helperPoints: {
    color: '#F59E0B',
    fontSize: 13,
  },
  flameIcon: {
    fontSize: 24,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subjectCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    gap: 6,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subjectDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  subjectName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  subjectCount: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});