import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        <Text style={styles.title}>Quitfucker</Text>
        <Text style={styles.subtitle}>Android day tracker</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#1f2937',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#f3f4f6'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#9ca3af'
  }
});
