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

export default function OnboardingTrustedContact({ navigation }) {
  const [contact1Name, setContact1Name] = useState('');
  const [contact1Phone, setContact1Phone] = useState('');
  const [contact2Name, setContact2Name] = useState('');
  const [contact2Phone, setContact2Phone] = useState('');

  const isValid = contact1Name && contact1Phone && contact1Phone.length >= 10;

  const handleContinue = () => {
    navigation.navigate('OnboardingTutorial');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.header}>
            <Text style={styles.shield}>🛡️</Text>
            <Text style={styles.title}>Safety First</Text>
            <Text style={styles.subtitle}>
              Add 1-2 trusted contacts who will receive an alert if you use the SOS feature
            </Text>
          </View>

          {/* Primary Contact */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Primary Contact</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Contact name"
                placeholderTextColor="#6B7280"
                value={contact1Name}
                onChangeText={setContact1Name}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="(123) 456-7890"
                placeholderTextColor="#6B7280"
                value={contact1Phone}
                onChangeText={setContact1Phone}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
          </View>

          {/* Secondary Contact */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Secondary Contact <Text style={styles.optional}>(Optional)</Text></Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Contact name"
                placeholderTextColor="#6B7280"
                value={contact2Name}
                onChangeText={setContact2Name}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="(123) 456-7890"
                placeholderTextColor="#6B7280"
                value={contact2Phone}
                onChangeText={setContact2Phone}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
          </View>

          {isValid ? (
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          ) : null}

        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 24,
    paddingTop: 60,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  shield: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  optional: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#9CA3AF',
  },
  fieldContainer: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  input: {
    backgroundColor: '#0A0F1E',
    borderRadius: 10,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
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