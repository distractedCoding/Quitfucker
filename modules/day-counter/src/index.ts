import { requireNativeModule } from 'expo-modules-core';

export type DayCounterNativeModule = {
  getLastResetDate(): string;
  setLastResetDateToday(): string;
  getCurrentDayCount(): number;
  refreshWidget(): boolean;
};

export default requireNativeModule<DayCounterNativeModule>('DayCounter');
