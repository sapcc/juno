// __webpack_public_path__ = window.location
// console.log(window.location)
// import "custom-event-polyfill"
import React from "react"
import Search from "./Search"
import Results from "./Results"
import { searchByIPs, searchByCIDR, search as searchByInput } from "./actions"
import SearchingIndicator from "./img/Loading_Animation.svg"
import cidrRegex from "cidr-regex"
import ipRegex from "ip-regex"
import testData from "./testData"

import { Message, PageHeader, Stack } from "juno-ui-components"

const contentClasses = ({resultsShown}) => {
  return (`
    h-full
    px-6
    
    ${!resultsShown ? `
      pt-40
      items-center 
    `
    : `
      pt-6
    `}
  `)
}

/**
 * This Component implements the event interface and controls
 * the visibility state of the login form.
 * @param {object} props
 */
const App = (props) => {
  const [processing, setProcessing] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [error, setError] = React.useState(null)

  const resultsShown = items !== null

  const search = React.useCallback((term) => {
    if (!term) return
    setItems([])
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
    <div className="whois h-full">
      <PageHeader heading="Whois" />
      <Stack direction="vertical" gap={8} className={`${contentClasses({resultsShown})}`}>
        { !resultsShown &&
          <Stack direction="vertical" gap={1} className="items-center">
            <h1 className="text-2xl">WHOIS Search</h1>
            <p className="text-theme-default text-opacity-70">Find detailed information for IP addresses</p>
          </Stack>
        }
        <Search onChange={(searchTerm) => search(searchTerm)} resultsShown={resultsShown} />
        {processing &&
          <Stack direction="vertical" className="items-center">
            <SearchingIndicator />
            <span>Searching...</span>
          </Stack>
        }
        {error && 
          <Message variant="danger" text={error}/>
        }
        <Results items={items} processing={processing} />
      </Stack>
    </div>
  )
}

export default App
