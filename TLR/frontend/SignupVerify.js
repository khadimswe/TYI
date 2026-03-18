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

export default function SignupVerify({ navigation }) {
  const [step, setStep] = useState('choose');
  const [method, setMethod] = useState(null);
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');

  const handleBack = () => {
    if (step === 'enterCode') {
      setStep('enterContact');
      setCode('');
    } else if (step === 'enterContact') {
      setStep('choose');
      setMethod(null);
      setContact('');
    } else {
      navigation.goBack();
    }
  };

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    setStep('enterContact');
  };

  const handleSendCode = () => {
    if (contact.length > 0) {
      setStep('enterCode');
    }
  };

  const handleVerify = () => {
    if (code.length === 6) {
      navigation.navigate('CreateAccount');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          {/* Step 1 — Choose Method */}
          {step === 'choose' && (
            <View style={styles.content}>
              <Text style={styles.title}>Verify Your Identity</Text>
              <Text style={styles.subtitle}>Choose how you'd like to verify your account</Text>

              <TouchableOpacity style={styles.methodCard} onPress={() => handleMethodSelect('phone')}>
                <View style={styles.methodIcon}>
                  <Text style={styles.methodIconText}>📱</Text>
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>Continue with Phone Number</Text>
                  <Text style={styles.methodSubtitle}>Receive SMS verification code</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.methodCard} onPress={() => handleMethodSelect('email')}>
                <View style={styles.methodIcon}>
                  <Text style={styles.methodIconText}>✉️</Text>
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>Continue with Email</Text>
                  <Text style={styles.methodSubtitle}>Receive email verification code</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2 — Enter Contact */}
          {step === 'enterContact' && (
            <View style={styles.content}>
              <Text style={styles.title}>
                Enter Your {method === 'email' ? 'Email' : 'Phone Number'}
              </Text>
              <Text style={styles.subtitle}>We'll send you a verification code</Text>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                  {method === 'email' ? 'Email Address' : 'Phone Number'}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={method === 'email' ? 'you@example.com' : '(555) 123-4567'}
                  placeholderTextColor="#6B7280"
                  value={contact}
                  onChangeText={setContact}
                  keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                  autoCapitalize="none"
                />
              </View>

              {contact.length > 0 && (
                <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                  <Text style={styles.buttonText}>Send Verification Code</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Step 3 — Enter Code */}
          {step === 'enterCode' && (
            <View style={styles.content}>
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.subtitle}>We sent a code to {contact}</Text>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Verification Code</Text>
                <TextInput
                  style={styles.codeInput}
                  placeholder="000000"
                  placeholderTextColor="#6B7280"
                  value={code}
                  onChangeText={(text) => setCode(text.replace(/\D/g, ''))}
                  keyboardType="number-pad"
                  maxLength={6}
                  textAlign="center"
                />
              </View>

              {code.length === 6 && (
                <TouchableOpacity style={styles.button} onPress={handleVerify}>
                  <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => setCode('')} style={styles.resendButton}>
                <Text style={styles.resendText}>Resend code</Text>
              </TouchableOpacity>

              {method === 'phone' && (
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>
                    📧 You'll need to set up email verification later to receive rewards.
                  </Text>
                </View>
              )}
            </View>
          )}

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
  scroll: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 32,
  },
  backText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  content: {
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    lineHeight: 22,
  },
  methodCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIconText: {
    fontSize: 22,
  },
  methodInfo: {
    flex: 1,
    gap: 4,
  },
  methodTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  methodSubtitle: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  codeInput: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#374151',
    letterSpacing: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 4,
  },
  resendText: {
    color: '#3B82F6',
    fontSize: 14,
  },
  noteBox: {
    backgroundColor: '#1D3557',
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
  },
  noteText: {
    color: '#93C5FD',
    fontSize: 13,
    lineHeight: 20,
  },
});