// __webpack_public_path__ = window.location
// console.log(window.location)
// import "custom-event-polyfill"
import React from "react"
import Search from "./Search"
import Results from "./Results"
import { searchByIPs, searchByCIDR, search as searchByInput } from "./actions"
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

  const search = React.useCallback((term) => {
    if (!term) return
    setError("")
    setProcessing(true)
    searchByInput(term)
      .then((data) => {
        console.log("DATA ITEMS", data)
        setItems(data)
      })
      .catch((error) => {
        let message = error.message || error
        try {
          message = JSON.parse(message)
          message = message.error || message
        } catch (e) {}
        if (message === "not found") setError("Couldn't find anything")
        else setError(message)
      })
      .finally(() => setProcessing(false))
  }, [])

  return (
    <div className="whois">
      <PageHeader heading="Whois" />
      <Search onChange={(searchTerm) => search(searchTerm)} />
      {error}
      <Results items={items} processing={processing} />
    </div>
  )
}

export default App
