import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import {
  useGlobalsEndpoint,
  useGlobalsActions,
} from "../components/StoreProvider"
import { fetchProxy as fetch, fetchProxyInitDB } from "utils"
import db from "../../db.json"

class HTTPError extends Error {
  constructor(code, message) {
    super(message || code)
    this.name = "HTTPError"
    this.statusCode = code
  }
}

const encodeUrlParamsFromObject = (options) => {
  if (!options || Object.keys(options) <= 0) return ""
  let encodedOptions = Object.keys(options)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`)
    .join("&")
  return `&${encodedOptions}`
}

// Check response status
const checkStatus = (response) => {
  if (response.status < 400) {
    return response
  } else {
    return response.text().then((message) => {
      var error = new HTTPError(response.status, message || response.statusText)
      error.statusCode = response.status
      return Promise.reject(error)
    })
  }
}

// hook to register query defaults that depends on the queryClient and options
const useQueryClientFn = (mockAPI) => {
  const queryClient = useQueryClient()
  const endpoint = useGlobalsEndpoint()
  const { setQueryClientFnReady } = useGlobalsActions()
  const [isMockDBReady, setIsMockDBReady] = useState(false)

  // setup the mock db.json just once
  useEffect(() => {
    if (mockAPI && !isMockDBReady) {
      // setup the mock db.json
      console.log("useQueryClientFn::: init mock db")
      fetchProxyInitDB(db)
    }
  }, [mockAPI, isMockDBReady])

  /*
  As stated in getQueryDefaults, the order of registration of query defaults does matter. Since the first matching defaults are returned by getQueryDefaults, the registration should be made in the following order: from the least generic key to the most generic one. This way, in case of specific key, the first matching one would be the expected one.
  */
  useEffect(() => {
    if (!queryClient || !endpoint) return

    console.log("useQueryClientFn::: setting defaults: ", endpoint)

    queryClient.setQueryDefaults(["peaks"], {
      queryFn: ({ queryKey }) => {
        const [_key, id, params] = queryKey
        const query = encodeUrlParamsFromObject(params)
        return fetch(
          `${endpoint}/peaks${id ? "/" + id : ""}${query ? "" + query : ""}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            ...{ mock: true },
          }
        )
          .then(checkStatus)
          .then((response) => {
            //  sort peaks by name
            return response.json().then((data) => {
              // check if data is an array to sort (peaks vs peak/id)
              if (Array.isArray(data)) {
                return data.sort((a, b) => {
                  return a.name.localeCompare(b.name)
                })
              }
              return data
            })
          })
      },
    })

    queryClient.setMutationDefaults(["peakAdd"], {
      mutationFn: ({ formState }) => {
        // Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
        const sendBody = JSON.stringify(formState)
        return fetch(`${endpoint}/peaks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          ...{ mock: true },
          body: sendBody,
        })
          .then(checkStatus)
          .then((response) => {
            return response.json()
          })
      },
    })

    queryClient.setMutationDefaults(["peakEdit"], {
      mutationFn: ({ id, formState }) => {
        // Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
        const sendBody = JSON.stringify(formState)
        return fetch(`${endpoint}/peaks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          ...{ mock: true },
          body: sendBody,
        })
          .then(checkStatus)
          .then((response) => {
            return response.json()
          })
      },
    })

    queryClient.setMutationDefaults(["peakDelete"], {
      mutationFn: ({ id }) => {
        return fetch(`${endpoint}/peaks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          ...{ mock: true },
        })
          .then(checkStatus)
          .then((response) => {
            return response.json()
          })
      },
    })

    // set queryClientFnReady to true once
    setQueryClientFnReady(true)
  }, [queryClient, endpoint, setQueryClientFnReady, mockAPI])
}

export default useQueryClientFn
