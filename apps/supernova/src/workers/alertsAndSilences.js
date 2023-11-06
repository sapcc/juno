import ApiService from "../api/apiService"
import { get } from "../api/client"
import { sortAlerts, countAlerts } from "../lib/utils"

/**
 * @param {string} endpoint
 * @param {object} options
 * @returns {function} fetch function
 */
const fetchAction = (endpoint, options = {}) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      // get alerts
      get(`${endpoint}/alerts`, { params: options?.params }).then((items) => {
        // sort alerts
        let alerts = sortAlerts(items)

        // copy additional filter options to labels for easier filter selection
        // because the alert object is nested this makes it a lot easier to filter, since we only use what is present in alert.labels
        alerts.forEach((alert) => {
          if (alert.labels) {
            alert.labels.status = alert.status?.state
          }
        })

        // count alerts
        const counts = countAlerts(alerts)

        // resolve promise
        resolve({ alerts, counts })
      }),
      // get silences
      get(`${endpoint}/silences`, {}).then((items) => {
        // convert items to hash to easear access
        const itemsHash = items.reduce((itemsHash, silence) => {
          itemsHash[silence.id] = silence
          return itemsHash
        }, {})

        // split items by state (active, pending and expired)
        // https://github.com/prometheus/alertmanager/blob/main/types/types.go#L434
        const itemsByState = sortSilencesByState(items)

        resolve({
          silences: items,
          silencesHash: itemsHash,
          silencesByState: itemsByState,
        })
      }),
    ]).then((data) => {
      console.log("alertsAndSilencesService::fetchAction: data", data)
    })
  })
}

const alertsAndSilencesService = new ApiService({
  serviceName: "alerts&Silences",
  debug: true,
  onFetchStart: () => self.postMessage({ action: "ALERTS_FETCH_START" }),
  onFetchEnd: () => self.postMessage({ action: "ALERTS_FETCH_END" }),
})

self.onmessage = (e) => {
  const action = e.data.action

  switch (action) {
    case "ALERTS&SILENCES_CONFIGURE":
      // require at least apiEndpoint to update the fetch method
      if (e.data?.fetchVars?.apiEndpoint) {
        // update the fetch function
        e.data["fetchFn"] = () =>
          fetchAction(
            e.data?.fetchVars.apiEndpoint,
            e.data?.fetchVars.options || {}
          )
      }
      alertsService.configure(e.data)
      break
    case "ALERTS&SILENCES_FETCH":
      alertService.fetch()
      break
  }
}
