import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

const tutorials = [
  {
    icon: '🎯',
    color: '#3b82f6',
    title: 'Send a Tag',
    description:
      'When you need help, send out a tag. It pulses out like a sonar wave to find verified students nearby who can help.',
  },
  {
    icon: '⚡',
    color: '#f59e0b',
    title: 'The Bigger the Chase, The Bigger the Reward',
    description:
      'Every time a tag is passed, the reward multiplies. A tag passed 5 times is worth 5x the points. Everyone wants to catch the hot tags!',
  },
  {
    icon: '🏆',
    color: '#22c55e',
    title: 'Cash Out for Real Rewards',
    description:
      'Earn points by helping others, then cash them out for dining dollars, meal swipes, and bookstore discounts.',
  },
];

export default function OnboardingTutorial({ navigation }) {
  const [step, setStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (step < tutorials.length - 1) {
        setStep(step + 1);
      } else {
        navigation.navigate('Homepage');
      }
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const current = tutorials[step];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{current.icon}</Text>
        </View>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.description}>{current.description}</Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {tutorials.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === step ? '#3b82f6' : '#4b5563' },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>
            {step < tutorials.length - 1 ? 'Next' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 8,
  },
  icon: {
    fontSize: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    width: '100%',
    maxWidth: 400,
    marginTop: 48,
    gap: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});