/**
 * SignupContext
 * 
 * Persists user data (username, email, password, userId) across
 * the entire onboarding flow so every screen can read/write to it.
 *
 * Flow: SignupVerify → CreateAccount → OnboardingScreen →
 *       OnboardingClasses → TranscriptUpload → OnboardingHobbies
 *
 * A UUID is auto-generated when the context mounts so that
 * TranscriptUpload (and any other screen) always has a stable user_id.
 */
import React, { createContext, useContext, useState, useCallback } from 'react';

function generateUUID() {
  // RFC-4122 v4 UUID (good enough for client-side pre-generation)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const SignupContext = createContext(null);

export function SignupProvider({ children }) {
  const [signupData, setSignupData] = useState({
    userId: generateUUID(),  // stable UUID for the entire signup session
    email: '',
    phone: '',
    username: '',
    password: '',
    name: '',
    classification: '',
    school: '',
  });

  /** Merge partial updates into signupData */
  const updateSignup = useCallback((partial) => {
    setSignupData((prev) => ({ ...prev, ...partial }));
  }, []);

  /** Reset everything (e.g. on logout or restart) */
  const resetSignup = useCallback(() => {
    setSignupData({
      userId: generateUUID(),
      email: '',
      phone: '',
      username: '',
      password: '',
      name: '',
      classification: '',
      school: '',
    });
  }, []);

  return (
    <SignupContext.Provider value={{ signupData, updateSignup, resetSignup }}>
      {children}
    </SignupContext.Provider>
  );
}

/** Hook for any onboarding screen to read / update signup state */
export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error('useSignup must be used inside <SignupProvider>');
  return ctx;
}
