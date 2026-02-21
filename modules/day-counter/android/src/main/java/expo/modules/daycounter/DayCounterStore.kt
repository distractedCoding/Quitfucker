package expo.modules.daycounter

import android.content.Context
import java.time.LocalDate
import java.time.temporal.ChronoUnit

object DayCounterStore {
  private const val PREFS = "quitfucker_day_counter"
  private const val KEY_LAST_RESET_DATE = "lastResetDate"

  fun getLastResetDate(context: Context): String {
    val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
    val existing = prefs.getString(KEY_LAST_RESET_DATE, null)
    if (existing != null) return existing
    val today = LocalDate.now().toString()
    prefs.edit().putString(KEY_LAST_RESET_DATE, today).apply()
    return today
  }

  fun setLastResetDateToday(context: Context): String {
    val today = LocalDate.now().toString()
    context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
      .edit()
      .putString(KEY_LAST_RESET_DATE, today)
      .apply()
    return today
  }

  fun getCurrentDayCount(context: Context): Int {
    val lastReset = LocalDate.parse(getLastResetDate(context))
    val now = LocalDate.now()
    return maxOf(0, ChronoUnit.DAYS.between(lastReset, now).toInt())
  }
}
