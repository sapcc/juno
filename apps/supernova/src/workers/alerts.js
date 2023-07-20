import ApiService from "../api/apiService"
import { get } from "../api/client"
import { sortAlerts, countAlerts } from "../lib/utils"

const fetchAction = (endpoint, options = {}) => {
  return get(`${config.apiEndpoint}/alerts`, { params: config.params }).then(
    (items) => {
      // sort alerts
      let alerts = sortAlerts(items)

      // copy additional filter options to labels for easier filter selection
      // because the alert object is nested this makes it a lot easier to filter, since we only use what is present in alert.labels
      alerts.forEach((alert) => {
        if (alert.labels) {
          alert.labels.status = alert.status?.state
        }
      })

      // slice if limit provided
      if (options?.limit) {
        if (options?.debug)
          console.info("Alerts service: limit set: ", options?.limit)
        alerts = alerts.slice(0, options?.limit)
      }

      // check if new loaded alerts are different from the last response
      const newCompareString = JSON.stringify(alerts)
      if (options?.debug)
        console.info(
          "Alerts service: any changes?",
          compareString !== newCompareString
        )
      if (compareString !== newCompareString) {
        compareString = newCompareString

        if (options?.debug) console.info("Alerts service: inform listener")
        // inform listener to receive new alerts
        self.postMessage({
          action: "ALERTS_UPDATE",
          alerts,
          counts: countAlerts(alerts),
        })
      } else {
        if (options?.debug) console.info("Alerts service: no change found")
      }
    }
  )
}

// TODO: remove original implementation
// TODO: pass the limit as option to the function
// TODO: test
const alertsService = new ApiService({
  debug: true,
  onFetchStart: () => self.postMessage({ action: "ALERTS_FETCH_START" }),
  onFetchEnd: () => self.postMessage({ action: "ALERTS_FETCH_END" }),
})

self.onmessage = (e) => {
  const action = e.data.action

  switch (action) {
    case "ALERTS_CONFIGURE":
      if (e.data?.apiEndpoint) {
        e.data["fetchFn"] = () => fetchAction(e.data?.apiEndpoint)
      }
      alertsService.configure(e.data)
      break
    case "ALERTS_FETCH":
      alertService.fetch()
      break
  }
}
