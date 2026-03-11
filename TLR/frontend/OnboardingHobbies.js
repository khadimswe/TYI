import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function OnboardingHobbies({ navigation }) {
  const [hobby, setHobby] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState(['English']);
  const [newLanguage, setNewLanguage] = useState('');

  const addHobby = () => {
    if (hobby && !hobbies.includes(hobby)) {
      setHobbies([...hobbies, hobby]);
      setHobby('');
    }
  };

  const removeHobby = (h) => {
    setHobbies(hobbies.filter((hob) => hob !== h));
  };

  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang) => {
    if (lang !== 'English') {
      setLanguages(languages.filter((l) => l !== lang));
    }
  };

  const handleContinue = () => {
    navigation.navigate('OnboardingTrustedContact');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

        <View style={styles.header}>
          <Text style={styles.title}>Hobbies & Languages</Text>
          <Text style={styles.subtitle}>Beyond the classroom</Text>
        </View>

        <View style={styles.form}>

          {/* Hobbies */}
          <View style={styles.section}>
            <Text style={styles.label}>Hobbies & Interests</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="e.g., Photography, Guitar"
                placeholderTextColor="#6B7280"
                value={hobby}
                onChangeText={setHobby}
                onSubmitEditing={addHobby}
              />
              <TouchableOpacity style={styles.addButton} onPress={addHobby}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {hobbies.map((h) => (
                <View key={h} style={styles.tagBlue}>
                  <Text style={styles.tagBlueText}>{h}</Text>
                  <TouchableOpacity onPress={() => removeHobby(h)}>
                    <Text style={styles.tagRemove}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Languages */}
          <View style={styles.section}>
            <Text style={styles.label}>Languages you speak</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Add a language"
                placeholderTextColor="#6B7280"
                value={newLanguage}
                onChangeText={setNewLanguage}
                onSubmitEditing={addLanguage}
              />
              <TouchableOpacity style={styles.addButtonGold} onPress={addLanguage}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {languages.map((lang) => (
                <View key={lang} style={styles.tagGold}>
                  <Text style={styles.tagGoldText}>{lang}</Text>
                  {lang !== 'English' && (
                    <TouchableOpacity onPress={() => removeLanguage(lang)}>
                      <Text style={styles.tagRemove}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

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
  inner: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 32,
  },
  section: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonGold: {
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tagBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2A3A',
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  tagBlueText: {
    color: '#3B82F6',
    fontSize: 14,
  },
  tagGold: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2A3A',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  tagGoldText: {
    color: '#F59E0B',
    fontSize: 14,
  },
  tagRemove: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});