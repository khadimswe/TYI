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
import { useSignup } from './context/SignupContext';

export default function CreateAccount({ navigation }) {
  const { updateSignup } = useSignup();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsNoMatch = password && confirmPassword && password !== confirmPassword;
  const canContinue = passwordsMatch && username.length >= 3;

  const handleContinue = () => {
    if (!canContinue) return;
    // Save username and password to signup context
    updateSignup({ username, password });
    navigation.navigate('OnboardingScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>Choose a username and secure password</Text>

          {/* Username */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Choose a unique username"
              placeholderTextColor="#6B7280"
              value={username}
              onChangeText={(text) => setUsername(text.toLowerCase().replace(/\s/g, ''))}
              autoCapitalize="none"
            />
            <Text style={styles.hint}>At least 3 characters, no spaces</Text>
          </View>

          {/* Password */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputFlex}
                placeholder="Create a strong password"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.hint}>At least 8 characters</Text>
          </View>

          {/* Confirm Password */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={[
              styles.inputRow,
              passwordsMatch && { borderColor: '#22C55E' },
              passwordsNoMatch && { borderColor: '#EF4444' },
            ]}>
              <TextInput
                style={styles.inputFlex}
                placeholder="Re-enter your password"
                placeholderTextColor="#6B7280"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeButton}>
                <Text style={styles.eyeText}>{showConfirm ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            {passwordsMatch && <Text style={styles.matchText}>Passwords match</Text>}
            {passwordsNoMatch && <Text style={styles.noMatchText}>Passwords don't match</Text>}
          </View>

          <TouchableOpacity
            style={[styles.button, !canContinue && styles.buttonDisabled]}
            onPress={handleContinue}
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
  scroll: { flexGrow: 1, padding: 24, paddingTop: 40, gap: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: '#9CA3AF', fontSize: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { color: '#9CA3AF', fontSize: 15 },
  fieldContainer: { gap: 8 },
  label: { color: '#D1D5DB', fontSize: 14 },
  input: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#374151',
    paddingRight: 12,
  },
  inputFlex: {
    flex: 1,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeButton: { padding: 4 },
  eyeText: { fontSize: 18 },
  hint: { color: '#6B7280', fontSize: 12 },
  matchText: { color: '#22C55E', fontSize: 12 },
  noMatchText: { color: '#EF4444', fontSize: 12 },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});