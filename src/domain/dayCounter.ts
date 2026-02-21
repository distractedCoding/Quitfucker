export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function assertIsoDate(value: string): string {
  if (!ISO_DATE_REGEX.test(value)) {
    throw new Error(`Invalid ISO date: ${value}`);
  }
  return value;
}

export function dayCountSince(lastResetDate: string, now = new Date()): number {
  const iso = assertIsoDate(lastResetDate);
  const start = new Date(`${iso}T00:00:00.000Z`);
  const end = new Date(`${toIsoDate(now)}T00:00:00.000Z`);
  const diffMs = end.getTime() - start.getTime();
  return Math.max(0, Math.floor(diffMs / (24 * 60 * 60 * 1000)));
}

export interface DayCounterStorage {
  getLastResetDate(): Promise<string | null>;
  setLastResetDate(date: string): Promise<void>;
}

export async function ensureResetDate(storage: DayCounterStorage, now = new Date()): Promise<string> {
  const existing = await storage.getLastResetDate();
  if (existing && ISO_DATE_REGEX.test(existing)) {
    return existing;
  }
  const today = toIsoDate(now);
  await storage.setLastResetDate(today);
  return today;
}

export async function resetToday(storage: DayCounterStorage, now = new Date()): Promise<string> {
  const today = toIsoDate(now);
  await storage.setLastResetDate(today);
  return today;
}
