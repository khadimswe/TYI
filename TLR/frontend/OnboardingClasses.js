import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';

export default function OnboardingClasses({ navigation }) {
  const [currentInput, setCurrentInput] = useState('');
  const [pastInput, setPastInput] = useState('');
  const [currentClasses, setCurrentClasses] = useState([]);
  const [pastClasses, setPastClasses] = useState([]);

  const addCurrent = () => {
    if (currentInput && !currentClasses.includes(currentInput)) {
      setCurrentClasses([...currentClasses, currentInput]);
      setCurrentInput('');
    }
  };

  const addPast = () => {
    if (pastInput && !pastClasses.includes(pastInput)) {
      setPastClasses([...pastClasses, pastInput]);
      setPastInput('');
    }
  };

  const canContinue = currentClasses.length > 0 || pastClasses.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <View style={styles.headerSection}>
            <Text style={styles.title}>Your Classes</Text>
            <Text style={styles.subtitle}>Help us match you with the right tags</Text>
          </View>

          {/* Current Classes */}
          <View style={styles.section}>
            <Text style={styles.label}>Classes you're taking now</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputFlex}
                placeholder="e.g., CS 101"
                placeholderTextColor="#6B7280"
                value={currentInput}
                onChangeText={setCurrentInput}
                onSubmitEditing={addCurrent}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.addBtn} onPress={addCurrent}>
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagsRow}>
              {currentClasses.map((cls) => (
                <View key={cls} style={styles.tagBlue}>
                  <Text style={styles.tagBlueText}>{cls}</Text>
                  <TouchableOpacity onPress={() => setCurrentClasses(currentClasses.filter(c => c !== cls))}>
                    <Text style={styles.tagRemove}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Past Classes */}
          <View style={styles.section}>
            <Text style={styles.label}>Classes you've passed with B+ or higher</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputFlex}
                placeholder="e.g., MATH 201"
                placeholderTextColor="#6B7280"
                value={pastInput}
                onChangeText={setPastInput}
                onSubmitEditing={addPast}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.addBtnGold} onPress={addPast}>
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagsRow}>
              {pastClasses.map((cls) => (
                <View key={cls} style={styles.tagGold}>
                  <Text style={styles.tagGoldText}>{cls}</Text>
                  <TouchableOpacity onPress={() => setPastClasses(pastClasses.filter(c => c !== cls))}>
                    <Text style={styles.tagRemoveGold}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, !canContinue && styles.buttonDisabled]}
            onPress={() => canContinue && navigation.navigate('TranscriptUpload')}
            disabled={!canContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { flexGrow: 1, padding: 24, paddingTop: 60, gap: 24 },
  headerSection: { alignItems: 'center', gap: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { color: '#9CA3AF', fontSize: 15 },
  section: { gap: 12 },
  label: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
  inputRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  inputFlex: {
    flex: 1, backgroundColor: '#1E2A3A', borderRadius: 10,
    padding: 14, color: '#FFFFFF', fontSize: 16,
    borderWidth: 1, borderColor: '#374151',
  },
  addBtn: {
    width: 46, height: 46, borderRadius: 10,
    backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center',
  },
  addBtnGold: {
    width: 46, height: 46, borderRadius: 10,
    backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', lineHeight: 28 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagBlue: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#1E2A3A', borderWidth: 1, borderColor: '#3B82F6',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  tagBlueText: { color: '#3B82F6', fontSize: 13, fontWeight: '500' },
  tagGold: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#1E2A3A', borderWidth: 1, borderColor: '#F59E0B',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  tagGoldText: { color: '#F59E0B', fontSize: 13, fontWeight: '500' },
  tagRemove: { color: '#3B82F6', fontSize: 12, fontWeight: 'bold' },
  tagRemoveGold: { color: '#F59E0B', fontSize: 12, fontWeight: 'bold' },
  button: {
    backgroundColor: '#3B82F6', borderRadius: 10,
    padding: 18, alignItems: 'center', marginTop: 8,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});