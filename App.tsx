import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { getCurrentDayCount, getLastResetDate, refreshWidget, setLastResetDateToday } from './src/native/dayCounterModule';

export default function App() {
  const [dayCount, setDayCount] = useState(0);
  const [lastResetDate, setLastResetDate] = useState('');

  const loadState = useCallback(async () => {
    const [count, resetDate] = await Promise.all([getCurrentDayCount(), getLastResetDate()]);
    setDayCount(count);
    setLastResetDate(resetDate);
  }, []);

  const onRelax = useCallback(async () => {
    const resetDate = await setLastResetDateToday();
    setLastResetDate(resetDate);
    setDayCount(0);
    await refreshWidget();
  }, []);

  useEffect(() => {
    void loadState();
  }, [loadState]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        <Text style={styles.title}>{dayCount}</Text>
        <Text style={styles.subtitle}>{dayCount === 1 ? 'day clean' : 'days clean'}</Text>
        <Text style={styles.meta}>Last reset: {lastResetDate || '—'}</Text>

        <Pressable onPress={onRelax} style={styles.button}>
          <Text style={styles.buttonText}>Relax</Text>
        </Pressable>
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
    padding: 28,
    borderRadius: 12,
    backgroundColor: '#1f2937',
    alignItems: 'center',
    minWidth: 270
  },
  title: {
    fontSize: 68,
    fontWeight: '800',
    color: '#f3f4f6'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 18,
    color: '#9ca3af'
  },
  meta: {
    marginTop: 16,
    fontSize: 13,
    color: '#6b7280'
  },
  button: {
    marginTop: 22,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  }
});
