package expo.modules.daycounter

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews

class DayCounterWidgetProvider : AppWidgetProvider() {
  override fun onReceive(context: Context, intent: Intent) {
    super.onReceive(context, intent)
    if (intent.action == ACTION_RELAX) {
      DayCounterStore.setLastResetDateToday(context)
      refreshAll(context)
    }
  }

  override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
    appWidgetIds.forEach { id -> appWidgetManager.updateAppWidget(id, buildViews(context)) }
  }

  companion object {
    const val ACTION_RELAX = "expo.modules.daycounter.ACTION_RELAX"

    fun refreshAll(context: Context) {
      val manager = AppWidgetManager.getInstance(context)
      val component = ComponentName(context, DayCounterWidgetProvider::class.java)
      manager.getAppWidgetIds(component).forEach { id ->
        manager.updateAppWidget(id, buildViews(context))
      }
    }

    private fun buildViews(context: Context): RemoteViews {
      val views = RemoteViews(context.packageName, R.layout.day_counter_widget)
      val count = DayCounterStore.getCurrentDayCount(context)
      views.setTextViewText(R.id.widgetDayCount, "$count")
      views.setTextViewText(R.id.widgetLabel, if (count == 1) "day" else "days")

      val relaxIntent = Intent(context, DayCounterWidgetProvider::class.java).apply { action = ACTION_RELAX }
      val pendingIntent = PendingIntent.getBroadcast(
        context,
        404,
        relaxIntent,
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
      )
      views.setOnClickPendingIntent(R.id.widgetRelaxButton, pendingIntent)
      return views
    }
  }
}
