import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const questions = [
  { id: '1', author: 'Sarah Chen', subject: 'Mathematics', question: 'Quick question - is the derivative of e^x just e^x?', timestamp: '2 min ago', answers: 3, upvotes: 12, answered: true },
  { id: '2', author: 'Marcus Johnson', subject: 'Computer Science', question: "What's the time complexity of binary search again?", timestamp: '15 min ago', answers: 2, upvotes: 8, answered: true },
  { id: '3', author: 'Emma Davis', subject: 'Accounting', question: 'Does anyone have the formula for calculating working capital?', timestamp: '1 hour ago', answers: 1, upvotes: 5, answered: false },
  { id: '4', author: 'Alex Kim', subject: 'Physics', question: 'Can someone explain the right-hand rule for magnetic fields?', timestamp: '2 hours ago', answers: 4, upvotes: 15, answered: true },
];

const subjectColors = { Mathematics: '#EF4444', 'Computer Science': '#22C55E', Accounting: '#F97316', Physics: '#3B82F6' };
const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

export default function Board() {
  const [newQuestion, setNewQuestion] = useState('');
  const [showForm, setShowForm] = useState(false);
  const streak = 7;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>The Board</Text>
              <Text style={styles.subtitle}>Quick questions, quick answers</Text>
            </View>
            <TouchableOpacity style={styles.askButton} onPress={() => setShowForm(!showForm)}>
              <Text style={styles.askButtonText}>+ Ask</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.streakBanner}>
            <View style={styles.streakLeft}>
              <Text style={styles.streakIcon}>🔥</Text>
              <View>
                <Text style={styles.streakTitle}>{streak} Day Streak!</Text>
                <Text style={styles.streakSub}>Keep it going for bonus points</Text>
              </View>
            </View>
            <Text style={styles.streakMultiplier}>2.5x</Text>
          </View>

          {showForm && (
            <View style={styles.formCard}>
              <TextInput
                style={styles.textarea}
                placeholder="Ask a quick question (280 characters max)..."
                placeholderTextColor="#6B7280"
                value={newQuestion}
                onChangeText={setNewQuestion}
                maxLength={280}
                multiline
              />
              <View style={styles.formFooter}>
                <Text style={styles.charCount}>{newQuestion.length}/280</Text>
                <View style={styles.formButtons}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.postButton, newQuestion.length < 10 && styles.disabledButton]}
                    onPress={() => { setNewQuestion(''); setShowForm(false); }}
                    disabled={newQuestion.length < 10}
                  >
                    <Text style={styles.postText}>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {questions.map((q) => (
            <View key={q.id} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getInitials(q.author)}</Text>
                </View>
                <View style={styles.authorInfo}>
                  <View style={styles.authorRow}>
                    <Text style={styles.authorName}>{q.author}</Text>
                    <View style={[styles.subjectBadge, { backgroundColor: (subjectColors[q.subject] || '#6B7280') + '30' }]}>
                      <Text style={[styles.subjectText, { color: subjectColors[q.subject] || '#6B7280' }]}>{q.subject}</Text>
                    </View>
                  </View>
                  <Text style={styles.timestamp}>{q.timestamp}</Text>
                </View>
              </View>
              <Text style={styles.questionText}>{q.question}</Text>
              <View style={styles.questionFooter}>
                <TouchableOpacity style={styles.metaButton}>
                  <Text style={styles.metaText}>👍 {q.upvotes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.metaButton}>
                  <Text style={styles.metaText}>💬 {q.answers} answers</Text>
                </TouchableOpacity>
                {q.answered && (
                  <View style={styles.answeredBadge}>
                    <Text style={styles.answeredText}>Answered</Text>
                  </View>
                )}
              </View>
              {!q.answered && (
                <TouchableOpacity style={styles.answerButton}>
                  <Text style={styles.answerButtonText}>Answer for {10 + q.upvotes * 2} pts</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Today's Activity</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#F59E0B' }]}>5</Text>
                <Text style={styles.statSub}>Answered</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#3B82F6' }]}>125</Text>
                <Text style={styles.statSub}>Points Earned</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#22C55E' }]}>{streak}</Text>
                <Text style={styles.statSub}>Day Streak</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: 24, paddingTop: 40, gap: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },
  askButton: { backgroundColor: '#3B82F6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  askButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  streakBanner: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#EF444430' },
  streakLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  streakIcon: { fontSize: 24 },
  streakTitle: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  streakSub: { color: '#9CA3AF', fontSize: 12 },
  streakMultiplier: { color: '#F59E0B', fontWeight: 'bold', fontSize: 24 },
  formCard: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16, gap: 12 },
  textarea: { backgroundColor: '#0A0F1E', borderRadius: 10, padding: 12, color: '#FFFFFF', fontSize: 15, borderWidth: 1, borderColor: '#374151', minHeight: 80, textAlignVertical: 'top' },
  formFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  charCount: { color: '#6B7280', fontSize: 12 },
  formButtons: { flexDirection: 'row', gap: 8 },
  cancelButton: { borderWidth: 1, borderColor: '#374151', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  cancelText: { color: '#FFFFFF', fontSize: 14 },
  postButton: { backgroundColor: '#3B82F6', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  disabledButton: { opacity: 0.4 },
  postText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  questionCard: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16, gap: 12 },
  questionHeader: { flexDirection: 'row', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  authorInfo: { flex: 1 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  authorName: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  subjectBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  subjectText: { fontSize: 11, fontWeight: '600' },
  timestamp: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  questionText: { color: '#FFFFFF', fontSize: 15, lineHeight: 22 },
  questionFooter: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  metaButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: '#9CA3AF', fontSize: 13 },
  answeredBadge: { marginLeft: 'auto', backgroundColor: '#22C55E20', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: '#22C55E' },
  answeredText: { color: '#22C55E', fontSize: 11, fontWeight: '600' },
  answerButton: { backgroundColor: '#3B82F620', borderWidth: 1, borderColor: '#3B82F6', borderRadius: 10, padding: 12, alignItems: 'center' },
  answerButtonText: { color: '#3B82F6', fontWeight: '600', fontSize: 14 },
  statsCard: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16, gap: 12 },
  statsLabel: { color: '#9CA3AF', fontSize: 13 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', gap: 4 },
  statNumber: { fontSize: 24, fontWeight: 'bold' },
  statSub: { color: '#9CA3AF', fontSize: 12 },
});