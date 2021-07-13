// __webpack_public_path__ = window.location
// console.log(window.location)
// import "custom-event-polyfill"
import React from "react"
import Search from "./Search"
import Results from "./Results"
import { searchByIPs, searchByCIDR } from "./actions"
import cidrRegex from "cidr-regex"
import ipRegex from "ip-regex"
import testData from "./testData"

import { PageHeader } from "juno-ui-components"

/**
 * This Component implements the event interface and controls
 * the visibility state of the login form.
 * @param {object} props
 */
const App = (props) => {
  const [processing, setProcessing] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [error, setError] = React.useState(null)

  const search = React.useCallback(
    (term) => {
      if (!term) return
      let cidrs = term.match(cidrRegex()) || []
      let rest = term
      for (let cidr of cidrs) rest = rest.replace(cidr, "")
      let ips = rest.match(ipRegex()) || []

      const requests = []
      if (cidrs && cidrs.length > 0)
        cidrs.forEach((cidr) => requests.push(searchByCIDR(cidr)))
      if (ips && ips.length > 0) requests.push(searchByIPs(ips))

      setProcessing(true)
      Promise.all(requests)
        .then((data) => {
          let flatData = []
          for (let item of data) {
            if (Array.isArray(item)) flatData = flatData.concat(item)
            else flatData.push(item)
          }
          return flatData
        })
        .then((data) => setItems(data))
        .catch((error) => setError(error))
        .finally(() => setProcessing(false))
    },
    [setItems]
  )

  return (
    <>
      <PageHeader heading="Whois" />
      <Search onChange={(searchTerm) => search(searchTerm)} />
      <Results items={items} processing={processing} />
    </>
  )
}

export default App
