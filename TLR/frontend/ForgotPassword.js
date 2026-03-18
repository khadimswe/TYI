import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';

export default function ForgotPassword({ navigation }) {
  const [step, setStep] = useState('choose');
  const [method, setMethod] = useState(null);
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordsNoMatch = newPassword && confirmPassword && newPassword !== confirmPassword;

  const handleBack = () => {
    if (step === 'reset') setStep('verify');
    else if (step === 'verify') { setStep('choose'); setCode(''); }
    else navigation.goBack();
  };

  const handleSendCode = () => {
    if (!contact) return;
    setStep('verify');
  };

  const handleVerify = () => {
    if (code.length === 6) setStep('reset');
  };

  const handleReset = () => {
    if (!passwordsMatch || newPassword.length < 8) return;
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          {/* STEP 1 - Choose Method */}
          {step === 'choose' && (
            <View style={styles.content}>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>Choose how you'd like to receive your verification code</Text>

              <TouchableOpacity
                style={[styles.methodCard, method === 'phone' && styles.methodCardActive]}
                onPress={() => setMethod('phone')}
              >
                <View style={styles.methodIcon}>
                  <Text style={styles.methodIconText}>📱</Text>
                </View>
                <View>
                  <Text style={styles.methodTitle}>Send to Phone Number</Text>
                  <Text style={styles.methodSubtitle}>Receive SMS verification code</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.methodCard, method === 'email' && styles.methodCardActive]}
                onPress={() => setMethod('email')}
              >
                <View style={styles.methodIcon}>
                  <Text style={styles.methodIconText}>✉️</Text>
                </View>
                <View>
                  <Text style={styles.methodTitle}>Send to Email</Text>
                  <Text style={styles.methodSubtitle}>Receive email verification code</Text>
                </View>
              </TouchableOpacity>

              {method && (
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>{method === 'email' ? 'Email Address' : 'Phone Number'}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={method === 'email' ? 'you@example.com' : '(555) 123-4567'}
                    placeholderTextColor="#6B7280"
                    value={contact}
                    onChangeText={setContact}
                    keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                    autoCapitalize="none"
                  />
                  {contact.length > 0 && (
                    <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                      <Text style={styles.buttonText}>Send Verification Code</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          )}

          {/* STEP 2 - Verify Code */}
          {step === 'verify' && (
            <View style={styles.content}>
              <Text style={styles.title}>Enter Code</Text>
              <Text style={styles.subtitle}>We sent a code to {contact}</Text>

              <Text style={styles.label}>Verification Code</Text>
              <TextInput
                style={[styles.input, styles.codeInput]}
                placeholder="000000"
                placeholderTextColor="#6B7280"
                value={code}
                onChangeText={t => setCode(t.replace(/\D/g, ''))}
                keyboardType="number-pad"
                maxLength={6}
              />

              {code.length === 6 && (
                <TouchableOpacity style={styles.button} onPress={handleVerify}>
                  <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.textButton}>
                <Text style={styles.textButtonText}>Resend code</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 3 - Reset Password */}
          {step === 'reset' && (
            <View style={styles.content}>
              <Text style={styles.title}>Create New Password</Text>
              <Text style={styles.subtitle}>Choose a strong password for your account</Text>

              <Text style={styles.label}>Current Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter current password"
                  placeholderTextColor="#6B7280"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={!showCurrent}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowCurrent(!showCurrent)}>
                  <Text style={styles.eyeText}>{showCurrent ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>New Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Create new password"
                  placeholderTextColor="#6B7280"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNew}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowNew(!showNew)}>
                  <Text style={styles.eyeText}>{showNew ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.hint}>At least 8 characters</Text>

              <Text style={styles.label}>Confirm New Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, { flex: 1, borderColor: passwordsMatch ? '#22C55E' : passwordsNoMatch ? '#EF4444' : '#374151' }]}
                  placeholder="Re-enter new password"
                  placeholderTextColor="#6B7280"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirm}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirm(!showConfirm)}>
                  <Text style={styles.eyeText}>{showConfirm ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {passwordsMatch && <Text style={styles.successHint}>Passwords match</Text>}
              {passwordsNoMatch && <Text style={styles.errorHint}>Passwords don't match</Text>}

              {passwordsMatch && newPassword.length >= 8 && (
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
              )}
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
  content: { gap: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#9CA3AF', marginBottom: 8 },
  methodCard: { backgroundColor: '#1E2A3A', borderRadius: 12, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16, borderWidth: 1, borderColor: '#374151' },
  methodCardActive: { borderColor: '#3B82F6', backgroundColor: '#3B82F620' },
  methodIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#3B82F620', alignItems: 'center', justifyContent: 'center' },
  methodIconText: { fontSize: 22 },
  methodTitle: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  methodSubtitle: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
  fieldGroup: { gap: 12, marginTop: 8 },
  label: { fontSize: 14, color: '#FFFFFF', marginBottom: 4, marginTop: 8 },
  input: { backgroundColor: '#1E2A3A', borderRadius: 10, padding: 14, color: '#FFFFFF', fontSize: 16, borderWidth: 1, borderColor: '#374151' },
  codeInput: { textAlign: 'center', fontSize: 24, letterSpacing: 8 },
  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyeButton: { padding: 14, backgroundColor: '#1E2A3A', borderRadius: 10, borderWidth: 1, borderColor: '#374151' },
  eyeText: { fontSize: 18 },
  hint: { color: '#6B7280', fontSize: 12, marginTop: 4 },
  successHint: { color: '#22C55E', fontSize: 12, marginTop: 4 },
  errorHint: { color: '#EF4444', fontSize: 12, marginTop: 4 },
  button: { backgroundColor: '#3B82F6', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  textButton: { alignItems: 'center', padding: 12 },
  textButtonText: { color: '#3B82F6', fontSize: 14 },
});