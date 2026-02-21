import { dayCountSince, ensureResetDate, resetToday, toIsoDate } from '../src/domain/dayCounter';

describe('dayCounter domain', () => {
  it('calculates day count from ISO dates', () => {
    const now = new Date('2026-02-21T22:10:00.000Z');
    expect(dayCountSince('2026-02-19', now)).toBe(2);
    expect(dayCountSince('2026-02-21', now)).toBe(0);
  });

  it('initializes missing reset date to today', async () => {
    const store = {
      date: null as string | null,
      async getLastResetDate() {
        return this.date;
      },
      async setLastResetDate(date: string) {
        this.date = date;
      }
    };

    const now = new Date('2026-02-21T01:00:00.000Z');
    const resolved = await ensureResetDate(store, now);

    expect(resolved).toBe('2026-02-21');
    expect(store.date).toBe('2026-02-21');
    expect(toIsoDate(now)).toBe('2026-02-21');
  });

  it('resets to today', async () => {
    const store = {
      date: '2026-01-01',
      async getLastResetDate() {
        return this.date;
      },
      async setLastResetDate(date: string) {
        this.date = date;
      }
    };

    const now = new Date('2026-02-21T09:00:00.000Z');
    const resetDate = await resetToday(store, now);

    expect(resetDate).toBe('2026-02-21');
    expect(store.date).toBe('2026-02-21');
    expect(dayCountSince(store.date, now)).toBe(0);
  });
});
