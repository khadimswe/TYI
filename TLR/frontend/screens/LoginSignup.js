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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { loginUser } from './api';

export default function LoginSignup({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter your credentials');
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser(identifier, password);
      if (data.success) {
        // TODO: persist user_id / token in context or AsyncStorage
        navigation.navigate('MainApp');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (err) {
      Alert.alert('Error', 'Could not connect to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupStart = () => {
    navigation.navigate('SignupVerify');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Scale texture */}
      <View style={styles.texture} pointerEvents="none" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>
              <Text style={styles.logoBlue}>You're</Text> It
            </Text>
            <Text style={styles.tagline}>Tag. Connect. Learn.</Text>
          </View>

          {/* Toggle */}
          <View style={styles.toggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, isLogin && styles.toggleBtnActive]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, !isLogin && styles.toggleBtnActive]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {isLogin ? (
            <View style={styles.form}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email / Phone Number / Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email, phone, or username"
                  placeholderTextColor="#6B7280"
                  value={identifier}
                  onChangeText={setIdentifier}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={styles.forgotLinks}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotBlue}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotUsername')}>
                  <Text style={styles.forgotGray}>Forgot username?</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.signupCard}>
                <Text style={styles.signupTitle}>Get Started</Text>
                <Text style={styles.signupSubtitle}>
                  Join your campus community and start earning rewards for helping your peers.
                </Text>
                <View style={styles.benefitsList}>
                  {[
                    'Help peers and earn points',
                    'Redeem for campus rewards',
                    'Build your academic network',
                  ].map((benefit) => (
                    <View key={benefit} style={styles.benefitRow}>
                      <View style={styles.checkCircle}>
                        <Text style={styles.checkText}>✓</Text>
                      </View>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSignupStart}>
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
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
  texture: {
    position: 'absolute',
    inset: 0,
    opacity: 0.03,
    backgroundColor: 'transparent',
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  logoBlue: {
    color: '#3B82F6',
  },
  tagline: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 4,
    marginBottom: 32,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#3B82F6',
  },
  toggleText: {
    color: '#9CA3AF',
    fontWeight: '500',
    fontSize: 15,
  },
  toggleTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
  form: {
    gap: 20,
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
  forgotLinks: {
    alignItems: 'center',
    gap: 10,
  },
  forgotBlue: {
    color: '#3B82F6',
    fontSize: 14,
  },
  forgotGray: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  signupCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 24,
    gap: 16,
  },
  signupTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  signupSubtitle: {
    color: '#9CA3AF',
    fontSize: 15,
    lineHeight: 22,
  },
  benefitsList: {
    gap: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: 'bold',
  },
  benefitText: {
    color: '#D1D5DB',
    fontSize: 15,
  },
});