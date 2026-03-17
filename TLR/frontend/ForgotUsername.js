import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';

export default function ForgotUsername({ navigation }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back to Login</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Forgot Username</Text>
          <Text style={styles.subtitle}>Enter your email address and we'll send you your username</Text>

          {!submitted ? (
            <View style={styles.form}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {email.length > 0 && (
                <TouchableOpacity style={styles.button} onPress={() => setSubmitted(true)}>
                  <Text style={styles.buttonText}>Send Username</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.successCard}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkText}>✓</Text>
              </View>
              <Text style={styles.successTitle}>Check Your Email</Text>
              <Text style={styles.successSubtitle}>
                We've sent your username to {email}. It may take a few minutes to arrive.
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.buttonText}>Return to Login</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: 24, paddingTop: 20, gap: 16 },
  backButton: { marginBottom: 8, marginTop: 8 },
  backText: { color: '#9CA3AF', fontSize: 15 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#9CA3AF', marginBottom: 8 },
  form: { gap: 12 },
  label: { fontSize: 14, color: '#FFFFFF', marginBottom: 4 },
  input: { backgroundColor: '#1E2A3A', borderRadius: 10, padding: 14, color: '#FFFFFF', fontSize: 16, borderWidth: 1, borderColor: '#374151' },
  button: { backgroundColor: '#3B82F6', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  successCard: { backgroundColor: '#1E2A3A', borderRadius: 16, padding: 24, alignItems: 'center', gap: 16 },
  checkCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#22C55E20', alignItems: 'center', justifyContent: 'center' },
  checkText: { color: '#22C55E', fontSize: 32, fontWeight: 'bold' },
  successTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  successSubtitle: { color: '#9CA3AF', fontSize: 14, textAlign: 'center' },
});