import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🗺️ Map is not available on web</Text>
      <Text style={styles.subtext}>Please use the mobile app for map features</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtext: {
    color: '#94a3b8',
    fontSize: 14,
  },
});
