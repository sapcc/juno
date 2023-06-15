import ApiService from "../api/apiService"
import { get } from "../api/client"

const fetchAction = (endpoint) => {
  return get(`${endpoint}/silences`, {}).then((data) => {
    console.log("fetched data:::", data)
  })
}

const silenceService = new ApiService({
  debug: true,
  onFetchStart: () => self.postMessage({ action: "SILENCES_FETCH_START" }),
  onFetchEnd: () => self.postMessage({ action: "SILENCES_FETCH_END" }),
})

self.onmessage = (e) => {
  const action = e.data.action

  switch (action) {
    case "SILENCES_CONFIGURE":
      if (e.data?.apiEndpoint) {
        e.data["fetchFn"] = () => fetchAction(e.data?.apiEndpoint)
      }
      console.log("SILENCES_CONFIGURE", e.data)
      silenceService.configure(e.data)
      break
  }
}
