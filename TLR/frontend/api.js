/**
 * TagYouAreIt – API client
 * Central place for all backend webhook calls.
 *
 * Update API_BASE to your deployed URL or local dev server.
 */
import { Platform } from 'react-native';

// In development, Expo web uses localhost; for device testing use your LAN IP
const API_BASE = 'http://localhost:8000';

/**
 * Login with identifier (username / email / phone) + password.
 * Maps to: POST /api/auth/login
 */
export async function loginUser(identifier, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  return res.json();
}

/**
 * Create a new account.
 * Maps to: POST /api/auth/signup
 */
export async function signupUser({ username, email, phoneNumber, password }) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      email,
      phone_number: phoneNumber,
      password,
    }),
  });
  return res.json();
}

/**
 * Upload a transcript PDF for parsing + tutoring approval.
 * Maps to: POST /api/transcript/upload
 */
export async function uploadTranscript(fileUri, fileName, userId) {
  const formData = new FormData();

  if (Platform.OS === 'web') {
    // On web, fetch the blob from the object URL created by the file picker
    const blob = await fetch(fileUri).then((r) => r.blob());
    formData.append('pdf', blob, fileName || 'transcript.pdf');
  } else {
    // On native (iOS / Android), React Native accepts the { uri, name, type } shorthand
    formData.append('pdf', {
      uri: fileUri,
      name: fileName || 'transcript.pdf',
      type: 'application/pdf',
    });
  }

  formData.append('user_id', userId);

  const res = await fetch(`${API_BASE}/api/transcript/upload`, {
    method: 'POST',
    body: formData,
    // Don't set Content-Type – fetch sets it with boundary for multipart
  });
  return res.json();
}

/**
 * Upload a class schedule PDF for parsing.
 * Maps to: POST /api/schedule/upload
 */
export async function uploadSchedule(fileUri, fileName, userId) {
  const formData = new FormData();

  if (Platform.OS === 'web') {
    const blob = await fetch(fileUri).then((r) => r.blob());
    formData.append('pdf', blob, fileName || 'schedule.pdf');
  } else {
    formData.append('pdf', {
      uri: fileUri,
      name: fileName || 'schedule.pdf',
      type: 'application/pdf',
    });
  }

  formData.append('user_id', userId);

  const res = await fetch(`${API_BASE}/api/schedule/upload`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}
