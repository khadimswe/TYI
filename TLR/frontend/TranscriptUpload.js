import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { uploadTranscript } from './api';
import { useSignup } from './context/SignupContext';

export default function TranscriptUpload({ navigation }) {
  const { signupData } = useSignup();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [pickError, setPickError] = useState(null);
  const [result, setResult] = useState(null);

  const handlePickFile = async () => {
    setPickError(null);
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf'],
        copyToCacheDirectory: true,
      });

      // expo-document-picker v11+ returns { canceled, assets }
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const picked = res.assets[0];
        setFile({
          name: picked.name,
          uri: picked.uri,
          size: picked.size,
          // On web, expo-document-picker provides the browser File object
          webFile: picked.file || null,
        });
      }
    } catch (err) {
      setPickError('Could not open file picker. Please try again.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    console.log('📋 signupData at upload:', JSON.stringify(signupData));
    setUploading(true);
    try {
      const data = await uploadTranscript(
        file.uri,
        file.name,
        signupData.userId,
        signupData.email,
        signupData.username,
        signupData.password,
        file.webFile,
        signupData.phone,
      );
      setResult(data);
      if (data.success) {
        setVerified(true);
        setTimeout(() => navigation.navigate('OnboardingHobbies'), 2500);
      } else {
        Alert.alert('Upload Failed', data.message || 'Could not process transcript');
      }
    } catch (err) {
      Alert.alert('Error', 'Could not connect to the server');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = () => navigation.navigate('OnboardingHobbies');

  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Progress bar */}
        <View style={styles.progressRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <View key={s} style={[styles.progressBar, s <= 3 && styles.progressBarActive]} />
          ))}
        </View>
        <Text style={styles.progressLabel}>Step 3 of 5</Text>

        <Text style={styles.title}>Upload Your Transcript</Text>
        <Text style={styles.subtitle}>
          We'll verify the classes you've aced — unlocking you as a verified Course Tag helper
        </Text>

        {verified ? (
          /* ── Verified State + Badge Preview ── */
          <View style={styles.verifiedContainer}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark-circle" size={56} color="#22C55E" />
            </View>
            <Text style={styles.successTitle}>Transcript Verified!</Text>
            <Text style={styles.successSub}>
              {result?.approved
                ? `GPA: ${result.gpa?.toFixed(2)} — ${result.courses_count || 0} courses verified!`
                : result?.message || 'Your transcript has been processed.'}
            </Text>

            {/* Badge preview */}
            <View style={styles.badgePreviewBox}>
              <View style={styles.badgePreviewHeader}>
                <Ionicons name="school-outline" size={15} color="#3B82F6" />
                <Text style={styles.badgePreviewTitle}>Your Verified Course Badges</Text>
              </View>
              <View style={styles.badgeRow}>
                <View style={styles.badge}>
                  <Ionicons name="checkmark-circle" size={12} color="#3B82F6" />
                  <Text style={styles.badgeText}>{result?.courses_count || 0} courses verified</Text>
                </View>
              </View>
              <Text style={styles.badgeNote}>
                These will appear on your profile and make you eligible to catch Course Tags
              </Text>
            </View>

            <Text style={styles.redirectNote}>Moving to next step...</Text>
          </View>
        ) : (
          <>
            {/* ── Upload Area ── */}
            <TouchableOpacity
              style={[styles.uploadBox, file && styles.uploadBoxFilled]}
              onPress={handlePickFile}
              disabled={uploading}
            >
              {!file ? (
                <>
                  <View style={styles.uploadIconCircle}>
                    <Ionicons name="cloud-upload-outline" size={36} color="#3B82F6" />
                  </View>
                  <Text style={styles.uploadText}>Tap to choose your transcript</Text>
                  <Text style={styles.uploadHint}>PDF, JPG, or PNG · Max 10MB</Text>
                </>
              ) : (
                <View style={styles.fileRow}>
                  <View style={styles.fileIconBox}>
                    <Ionicons name="document-text-outline" size={28} color="#3B82F6" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                    {file.size ? <Text style={styles.fileSize}>{formatSize(file.size)}</Text> : null}
                  </View>
                  <TouchableOpacity
                    onPress={() => { setFile(null); setPickError(null); }}
                    style={styles.fileRemoveBtn}
                    disabled={uploading}
                  >
                    <Ionicons name="close-circle" size={22} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            {/* Error */}
            {pickError && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={15} color="#EF4444" />
                <Text style={styles.errorText}>{pickError}</Text>
              </View>
            )}

            {/* Upload progress */}
            {uploading && (
              <View style={styles.uploadingBox}>
                <ActivityIndicator size="small" color="#3B82F6" />
                <Text style={styles.uploadingText}>Verifying your transcript...</Text>
              </View>
            )}

            {/* Verify button */}
            {file && !uploading && (
              <TouchableOpacity style={styles.button} onPress={handleUpload}>
                <Ionicons name="shield-checkmark-outline" size={18} color="#000" />
                <Text style={styles.buttonText}>Verify Transcript</Text>
              </TouchableOpacity>
            )}

            {/* What you'll unlock preview */}
            <View style={styles.previewBox}>
              <View style={styles.previewHeader}>
                <Ionicons name="sparkles-outline" size={14} color="#F59E0B" />
                <Text style={styles.previewHeaderText}>What you unlock by verifying</Text>
              </View>
              <View style={styles.previewRow}>
                <Ionicons name="checkmark-circle-outline" size={14} color="#22C55E" />
                <Text style={styles.previewItem}>Verified badges on your profile</Text>
              </View>
              <View style={styles.previewRow}>
                <Ionicons name="checkmark-circle-outline" size={14} color="#22C55E" />
                <Text style={styles.previewItem}>Eligible to catch Course Tags (50–150 XP)</Text>
              </View>
              <View style={styles.previewRow}>
                <Ionicons name="checkmark-circle-outline" size={14} color="#22C55E" />
                <Text style={styles.previewItem}>Priority pings for matching tags near you</Text>
              </View>
            </View>

            {/* Security note */}
            <View style={styles.noteBox}>
              <Ionicons name="lock-closed-outline" size={13} color="#93C5FD" />
              <Text style={styles.noteText}>
                Your transcript is encrypted and only used to verify course history. It's never shared.
              </Text>
            </View>
          </>
        )}

      </ScrollView>

      {!verified && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { flexGrow: 1, padding: 24, paddingTop: 40, gap: 20 },

  progressRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  progressBar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#374151' },
  progressBarActive: { backgroundColor: '#3B82F6' },
  progressLabel: { color: '#9CA3AF', fontSize: 13, marginBottom: 4 },

  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { color: '#9CA3AF', fontSize: 15, lineHeight: 22 },

  // Upload box
  uploadBox: {
    borderWidth: 2, borderColor: '#374151', borderStyle: 'dashed',
    borderRadius: 16, padding: 32, alignItems: 'center', gap: 10,
    backgroundColor: '#141929',
  },
  uploadBoxFilled: {
    borderStyle: 'solid', borderColor: '#3B82F6', padding: 18,
  },
  uploadIconCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#3B82F620', alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
  },
  uploadText: { color: '#D1D5DB', fontSize: 16, fontWeight: '600' },
  uploadHint: { color: '#6B7280', fontSize: 13 },

  fileRow: { flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' },
  fileIconBox: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: '#3B82F620', alignItems: 'center', justifyContent: 'center',
  },
  fileName: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
  fileSize: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
  fileRemoveBtn: { padding: 4 },

  errorBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#EF444415', borderWidth: 1, borderColor: '#EF4444',
    borderRadius: 10, padding: 12,
  },
  errorText: { color: '#EF4444', fontSize: 13, flex: 1 },

  uploadingBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#3B82F610', borderRadius: 10, padding: 14,
  },
  uploadingText: { color: '#9CA3AF', fontSize: 14 },

  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#3B82F6', borderRadius: 12, padding: 18,
  },
  buttonText: { color: '#000', fontSize: 16, fontWeight: '700' },

  // What you unlock preview
  previewBox: {
    backgroundColor: '#141929', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: '#1E2A45', gap: 10,
  },
  previewHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  previewHeaderText: { color: '#F59E0B', fontSize: 13, fontWeight: '600' },
  previewRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewItem: { color: '#D1D5DB', fontSize: 13 },

  noteBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: '#1D3557', borderRadius: 10, padding: 14,
  },
  noteText: { flex: 1, color: '#93C5FD', fontSize: 13, lineHeight: 20 },

  skipButton: { padding: 20, alignItems: 'center' },
  skipText: { color: '#6B7280', fontSize: 14 },

  // Verified state
  verifiedContainer: { alignItems: 'center', gap: 14, marginTop: 20 },
  successCircle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: '#22C55E15', alignItems: 'center', justifyContent: 'center',
  },
  successTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  successSub: { color: '#9CA3AF', fontSize: 15, textAlign: 'center' },

  badgePreviewBox: {
    width: '100%', backgroundColor: '#141929', borderRadius: 14,
    padding: 16, borderWidth: 1, borderColor: '#1E2A45', gap: 12, marginTop: 4,
  },
  badgePreviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badgePreviewTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#1E2A3A', borderWidth: 1, borderColor: '#3B82F6',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  badgeText: { color: '#3B82F6', fontSize: 13, fontWeight: '600' },
  badgeNote: { color: '#9CA3AF', fontSize: 12, lineHeight: 18 },

  redirectNote: { color: '#6B7280', fontSize: 13, marginTop: 4 },
});