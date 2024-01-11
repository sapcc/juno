import { useEffect, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useEndpoint, useActions } from "../components/StoreProvider"
import { request } from "graphql-request"
import sevicesQuery from "../lib/queries/services"

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
const useQueryClientFn = () => {
  const queryClient = useQueryClient()
  const endpoint = useEndpoint()
  const { setQueryClientFnReady } = useActions()

  /*
  As stated in getQueryDefaults, the order of registration of query defaults does matter. Since the first matching defaults are returned by getQueryDefaults, the registration should be made in the following order: from the least generic key to the most generic one. This way, in case of specific key, the first matching one would be the expected one.
  */
  useEffect(() => {
    if (!queryClient || !endpoint) return
    console.log("useQueryClientFn::: setting defaults")

    queryClient.setQueryDefaults(["services"], {
      queryFn: async ({ queryKey }) => {
        const [_key, options] = queryKey
        console.log("useQueryClientFn::: queryKey: ", queryKey)
        return await request(
          endpoint,
          sevicesQuery(),
          options?.paginationParams
        )
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false, // default: true
    })

    // set queryClientFnReady to true once
    setQueryClientFnReady(true)
  }, [queryClient, endpoint])
}

export default useQueryClientFn
