import { requireNativeModule } from 'expo-modules-core';

export type DayCounterNativeModule = {
  getLastResetDate(): string;
  setLastResetDateToday(): string;
  getCurrentDayCount(): number;
  refreshWidget(): boolean;
};

const DayCounter = requireNativeModule<DayCounterNativeModule>('DayCounter');

export async function getLastResetDate() {
  return DayCounter.getLastResetDate();
}

export async function setLastResetDateToday() {
  return DayCounter.setLastResetDateToday();
}

export async function getCurrentDayCount() {
  return DayCounter.getCurrentDayCount();
}

export async function refreshWidget() {
  return DayCounter.refreshWidget();
}
