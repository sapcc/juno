import { useEffect } from "react"
import { useAlertsActions, useUserIsActive } from "./useStore"
import { get } from "../api/client"

let alertsWorkerUrl = new URL("workers/api.js", import.meta.url)
let silencesWorkerUrl = new URL("workers/silences.js", import.meta.url)

const loadAlertsWorker = fetch(alertsWorkerUrl)
  .then((r) => r.blob())
  .then((blob) => {
    var blobUrl = window.URL.createObjectURL(blob)
    return new Worker(blobUrl, { type: "module" })
  })

const loadSilencesWorker = fetch(silencesWorkerUrl)
  .then((r) => r.blob())
  .then((blob) => {
    var blobUrl = window.URL.createObjectURL(blob)
    return new Worker(blobUrl, { type: "module" })
  })

const useAlertmanagerAPI = (apiEndpoint) => {
  const { setAlertsData, setFilteredItems, setIsLoading, setIsUpdating } =
    useAlertsActions()
  const isUserActive = useUserIsActive()

  // Create a web worker to get updates from the alert manager api
  useEffect(() => {
    if (!apiEndpoint) return
    let cleanup

    // set alerts state to loading
    setIsLoading(true)

    loadAlertsWorker.then((worker) => {
      // receive messages from worker
      worker.onmessage = (e) => {
        const action = e.data.action
        switch (action) {
          case "ALERTS_UPDATE":
            setAlertsData({ items: e.data.alerts, counts: e.data.counts })
            break
          case "ALERTS_FETCH_START":
            setIsUpdating(true)
            break
          case "ALERTS_FETCH_END":
            setIsUpdating(false)
            break
          case "SILENCES_UPDATE":
            console.log("SILENCES_UPDATE:::::")
            break
          case "SILENCES_FETCH_START":
            console.log("SILENCES_FETCH_START:::::")
            break
          case "SILENCES_FETCH_END":
            console.log("SILENCES_FETCH_END:::::")
            break
        }
      }
      // initial config
      worker.postMessage({
        action: "ALERTS_CONFIGURE",
        apiEndpoint,
        limit: false,
        watch: true,
        watchInterval: 300000, // 5 min
        initialFetch: true,
      })

      cleanup = () => worker.terminate()
    })

    loadSilencesWorker.then((worker) => {
      // receive messages from worker
      worker.onmessage = (e) => {
        const action = e.data.action
        switch (action) {
          case "SILENCES_UPDATE":
            console.log("SILENCES_UPDATE:::::")
            break
          case "SILENCES_FETCH_START":
            console.log("SILENCES_FETCH_START:::::")
            break
          case "SILENCES_FETCH_END":
            console.log("SILENCES_FETCH_END:::::")
            break
        }
      }

      // initial config
      worker.postMessage({
        action: "SILENCES_CONFIGURE",
        apiEndpoint: apiEndpoint,
      })

      cleanup = () => worker.terminate()
    })

    return () => cleanup && cleanup()
  }, [apiEndpoint])

  useEffect(() => {
    if (isUserActive === undefined) return
    loadAlertsWorker.then((worker) => {
      worker.postMessage({
        action: "ALERTS_CONFIGURE",
        watch: isUserActive,
      })
    })
  }, [isUserActive])
}

export default useAlertmanagerAPI
