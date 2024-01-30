import { useState, useEffect } from "react"
import { registerConsumer } from "url-state-provider"
import { useActions, useTabIndex } from "../components/StoreProvider"

const DEFAULT_KEY = "heureka"
const TAB_INDEX = "t"

const useUrlState = (key) => {
  const [isURLRead, setIsURLRead] = useState(false)
  // it is possible to have two apps instances on the same page
  // int his case the key should be different per app
  const urlStateManager = registerConsumer(key || DEFAULT_KEY)

  const { setTabIndex } = useActions()
  const tabIndex = useTabIndex()

  // Set initial state from URL (on login)
  useEffect(() => {
    if (isURLRead) return
    console.log(
      `HEUREKA: (${key || DEFAULT_KEY}) setting up state from url:`,
      urlStateManager.currentState()
    )

    // READ the url state and set the state
    const newTabIndex = urlStateManager.currentState()?.[TAB_INDEX]
    // SAVE the state
    if (newTabIndex) setTabIndex(newTabIndex)
    setIsURLRead(true)
  }, [isURLRead, setTabIndex])

  // SYNC states to URL state
  useEffect(() => {
    if (!isURLRead) return
    urlStateManager.push({
      [TAB_INDEX]: tabIndex,
    })
  }, [isURLRead, tabIndex])
}

export default useUrlState
