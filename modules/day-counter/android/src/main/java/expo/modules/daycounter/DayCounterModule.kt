package expo.modules.daycounter

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DayCounterModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("DayCounter")

    Function("getLastResetDate") {
      DayCounterStore.getLastResetDate(appContext.reactContext ?: throw Exception("No context"))
    }

    Function("setLastResetDateToday") {
      val context = appContext.reactContext ?: throw Exception("No context")
      val date = DayCounterStore.setLastResetDateToday(context)
      DayCounterWidgetProvider.refreshAll(context)
      date
    }

    Function("getCurrentDayCount") {
      DayCounterStore.getCurrentDayCount(appContext.reactContext ?: throw Exception("No context"))
    }

    Function("refreshWidget") {
      DayCounterWidgetProvider.refreshAll(appContext.reactContext ?: throw Exception("No context"))
      true
    }
  }
}
