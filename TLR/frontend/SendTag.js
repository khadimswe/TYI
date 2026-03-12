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

const subjects = [
  'Mathematics', 'Computer Science', 'Accounting',
  'Physics', 'Chemistry', 'Biology', 'Business', 'English', 'Other'
];

const urgencies = [
  { label: 'ASAP (within 15 min)', value: 'asap' },
  { label: 'Soon (within 1 hour)', value: 'soon' },
  { label: 'Today (within 4 hours)', value: 'today' },
  { label: 'Flexible', value: 'flexible' },
];

export default function SendTag() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [urgency, setUrgency] = useState('');
  const [showSubjects, setShowSubjects] = useState(false);
  const [showUrgency, setShowUrgency] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
    }, 3000);
  };

  const reset = () => {
    setSubject('');
    setTopic('');
    setUrgency('');
    setSent(false);
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.title}>Tag Sent!</Text>
          <Text style={styles.subtitle}>Sarah Chen has caught your tag and is on the way</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Meeting at:</Text>
              <Text style={styles.infoValue}>Student Union - 2nd Floor</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Arrives in:</Text>
              <Text style={[styles.infoValue, { color: '#3B82F6' }]}>~8 minutes</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Points reward:</Text>
              <Text style={[styles.infoValue, { color: '#F59E0B' }]}>50 pts</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={reset}>
            <Text style={styles.buttonText}>Send Another Tag</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isSending) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.title}>Finding help...</Text>
          <Text style={styles.sonarEmoji}>📡</Text>
          <Text style={styles.subtitle}>Searching for verified students nearby...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isValid = subject && topic && urgency;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Send a Tag</Text>
          <Text style={styles.subtitle}>Describe what you need help with, and we'll find someone nearby</Text>

          <Text style={styles.label}>Subject</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => { setShowSubjects(!showSubjects); setShowUrgency(false); }}>
            <Text style={subject ? styles.dropdownSelected : styles.dropdownPlaceholder}>
              {subject || 'Select a subject'}
            </Text>
            <Text style={styles.dropdownArrow}>{showSubjects ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showSubjects && (
            <View style={styles.dropdownList}>
              {subjects.map((s) => (
                <TouchableOpacity key={s} style={styles.dropdownItem} onPress={() => { setSubject(s); setShowSubjects(false); }}>
                  <Text style={styles.dropdownItemText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Topic / Question</Text>
          <TextInput
            style={styles.textarea}
            placeholder="What do you need help with?"
            placeholderTextColor="#6B7280"
            value={topic}
            onChangeText={setTopic}
            multiline
            maxLength={280}
          />
          <Text style={styles.charCount}>{topic.length}/280</Text>

          <Text style={styles.label}>Urgency</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => { setShowUrgency(!showUrgency); setShowSubjects(false); }}>
            <Text style={urgency ? styles.dropdownSelected : styles.dropdownPlaceholder}>
              {urgencies.find(u => u.value === urgency)?.label || 'How urgent is this?'}
            </Text>
            <Text style={styles.dropdownArrow}>{showUrgency ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showUrgency && (
            <View style={styles.dropdownList}>
              {urgencies.map((u) => (
                <TouchableOpacity key={u.value} style={styles.dropdownItem} onPress={() => { setUrgency(u.value); setShowUrgency(false); }}>
                  <Text style={styles.dropdownItemText}>{u.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Base reward:</Text>
              <Text style={[styles.infoValue, { color: '#F59E0B' }]}>50 points</Text>
            </View>
            <Text style={styles.rewardNote}>Reward increases with each pass if no one accepts immediately</Text>
          </View>

          {isValid && (
            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>🏷️ Send Tag</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: 24, paddingTop: 40, gap: 12 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 15, color: '#9CA3AF', textAlign: 'center' },
  sonarEmoji: { fontSize: 80 },
  successIcon: { fontSize: 80 },
  label: { fontSize: 14, color: '#FFFFFF', marginBottom: 4, marginTop: 8 },
  dropdown: { backgroundColor: '#1E2A3A', borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#374151', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dropdownPlaceholder: { color: '#6B7280', fontSize: 16 },
  dropdownSelected: { color: '#FFFFFF', fontSize: 16 },
  dropdownArrow: { color: '#9CA3AF', fontSize: 12 },
  dropdownList: { backgroundColor: '#1E2A3A', borderRadius: 10, borderWidth: 1, borderColor: '#374151', overflow: 'hidden' },
  dropdownItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#374151' },
  dropdownItemText: { color: '#FFFFFF', fontSize: 15 },
  textarea: { backgroundColor: '#1E2A3A', borderRadius: 10, padding: 14, color: '#FFFFFF', fontSize: 16, borderWidth: 1, borderColor: '#374151', minHeight: 100, textAlignVertical: 'top' },
  charCount: { color: '#6B7280', fontSize: 12, textAlign: 'right' },
  infoCard: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 16, gap: 8, marginTop: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { color: '#9CA3AF', fontSize: 14 },
  infoValue: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  rewardNote: { color: '#6B7280', fontSize: 12 },
  button: { backgroundColor: '#3B82F6', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});