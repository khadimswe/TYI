/**
 * TagYouAreIt – API client
 * Central place for all backend webhook calls.
 *
 * Update API_BASE to your deployed URL or local dev server.
 */

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
 * Also sends signup info so the backend can create the user's account.
 * Maps to: POST /api/transcript/upload
 */
export async function uploadTranscript(fileUri, fileName, userId, email, username, password, webFile) {
  const formData = new FormData();

  if (webFile) {
    // Web: use the actual browser File object
    formData.append('pdf', webFile, fileName || 'transcript.pdf');
  } else {
    // Native (iOS/Android): use the RN-style object
    formData.append('pdf', {
      uri: fileUri,
      name: fileName || 'transcript.pdf',
      type: 'application/pdf',
    });
  }
  formData.append('user_id', userId);
  formData.append('email', email || '');
  formData.append('username', username || '');
  formData.append('password', password || '');

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
export async function uploadSchedule(fileUri, fileName, userId, webFile) {
  const formData = new FormData();

  if (webFile) {
    formData.append('pdf', webFile, fileName || 'schedule.pdf');
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
