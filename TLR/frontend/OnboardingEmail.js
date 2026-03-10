import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function OnboardingEmail({ navigation }) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendCode = () => {
    setIsCodeSent(true);
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setIsVerified(true);
      setTimeout(() => {
        navigation.navigate('OnboardingClasses');
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>

        <View style={styles.header}>
          <Text style={styles.title}>Verify Your School Email</Text>
          <Text style={styles.subtitle}>We need to confirm you're a student</Text>
        </View>

        {isVerified ? (
          <View style={styles.verifiedContainer}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.verifiedText}>Email Verified!</Text>
          </View>
        ) : (
          <View style={styles.form}>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>School Email</Text>
              <TextInput
                style={[styles.input, isCodeSent && styles.inputDisabled]}
                placeholder="you@university.edu"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                editable={!isCodeSent}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {isCodeSent && (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Verification Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit code"
                  placeholderTextColor="#6B7280"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                <Text style={styles.hint}>Check your email for the verification code</Text>
              </View>
            )}

            {!isCodeSent ? (
              email.includes('.edu') ? (
                <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                  <Text style={styles.buttonText}>Send Verification Code</Text>
                </TouchableOpacity>
              ) : null
            ) : (
              verificationCode.length === 6 ? (
                <TouchableOpacity style={styles.button} onPress={handleVerify}>
                  <Text style={styles.buttonText}>Verify Email</Text>
                </TouchableOpacity>
              ) : null
            )}

          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  inner: {
    flex: 1,
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
    gap: 24,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 6,
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
  inputDisabled: {
    opacity: 0.5,
  },
  hint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
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
  verifiedContainer: {
    alignItems: 'center',
    gap: 16,
  },
  checkmark: {
    fontSize: 64,
    color: '#22C55E',
  },
  verifiedText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});