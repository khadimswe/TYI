import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const currentClasses = ['CS 101', 'MATH 201'];
const pastClasses = ['ENG 101', 'HIST 150'];
const hobbies = ['Photography', 'Guitar'];

export default function Profile({ navigation }) {
  const [points] = useState(1250);
  const [streak] = useState(3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Avatar + Name */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Student</Text>
            <View style={styles.infoRow}>
              <Ionicons name="flash" size={14} color="#F59E0B" />
              <Text style={styles.pointsText}>{points} XP</Text>
            </View>
            {streak > 0 && (
              <View style={styles.infoRow}>
                <Ionicons name="flame" size={14} color="#F59E0B" />
                <Text style={styles.streakText}>{streak} day streak</Text>
              </View>
            )}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#3B82F6' }]}>12</Text>
            <Text style={styles.statLabel}>Tags Caught</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#F59E0B' }]}>8</Text>
            <Text style={styles.statLabel}>Tags Sent</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#22C55E' }]}>45</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
        </View>

        {/* Current Classes */}
        {currentClasses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Classes</Text>
            <View style={styles.tagsRow}>
              {currentClasses.map((cls) => (
                <View key={cls} style={styles.tagBlue}>
                  <Text style={styles.tagBlueText}>{cls}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Qualified to Help */}
        {pastClasses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Qualified to Help</Text>
            <View style={styles.tagsRow}>
              {pastClasses.map((cls) => (
                <View key={cls} style={styles.tagGold}>
                  <Text style={styles.tagGoldText}>{cls}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Hobbies */}
        {hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Interests</Text>
            <View style={styles.tagsRow}>
              {hobbies.map((h) => (
                <View key={h} style={styles.tagGray}>
                  <Text style={styles.tagGrayText}>{h}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* View Talent Profile — replaces SOS */}
        <View style={styles.talentSection}>
          <TouchableOpacity
            style={styles.talentBtn}
            onPress={() => navigation.navigate('TalentProfile')}
          >
            <View style={styles.talentBtnLeft}>
              <Ionicons name="briefcase-outline" size={20} color="#3B82F6" />
              <View>
                <Text style={styles.talentBtnTitle}>View Talent Profile</Text>
                <Text style={styles.talentBtnSub}>See how employers view your skill record</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#3B82F6" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: 24, paddingTop: 40, gap: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 28 },
  profileInfo: { flex: 1, gap: 6 },
  userName: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pointsText: { color: '#F59E0B', fontSize: 15, fontWeight: '600' },
  streakText: { color: '#9CA3AF', fontSize: 14 },
  statsGrid: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1, backgroundColor: '#1E2A3A', borderRadius: 12,
    padding: 14, alignItems: 'center', gap: 4,
  },
  statNum: { fontSize: 26, fontWeight: 'bold' },
  statLabel: { color: '#9CA3AF', fontSize: 11, textAlign: 'center' },
  section: { gap: 10 },
  sectionTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagBlue: {
    backgroundColor: '#1E2A3A', borderWidth: 1, borderColor: '#3B82F6',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  tagBlueText: { color: '#3B82F6', fontSize: 13, fontWeight: '500' },
  tagGold: {
    backgroundColor: '#1E2A3A', borderWidth: 1, borderColor: '#F59E0B',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  tagGoldText: { color: '#F59E0B', fontSize: 13, fontWeight: '500' },
  tagGray: {
    backgroundColor: '#1E2A3A', borderWidth: 1, borderColor: '#6B7280',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  tagGrayText: { color: '#D1D5DB', fontSize: 13 },
  talentSection: { paddingBottom: 32 },
  talentBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#141929', borderWidth: 1, borderColor: '#3B82F6',
    borderRadius: 14, padding: 16,
  },
  talentBtnLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  talentBtnTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', marginBottom: 2 },
  talentBtnSub: { color: '#9CA3AF', fontSize: 12 },
});