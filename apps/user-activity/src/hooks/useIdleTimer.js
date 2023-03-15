import { useEffect, useState, useMemo, useCallback } from "react"

const DEFAULT_TIMEOUT = 1800 // 30 min
const DEFAULT_EVENTS = ["mousemove", "click", "scroll", "keydown", "focus"]

// TODO: should we return the counter?
const useIdleTimer = ({ timeout, events, onTimeout, onActive, debug }) => {
  const [counter, setCounter] = useState(0)
  const [isActive, setIsActive] = useState(true) // default to true so it is not starting inactive

  if (debug === true || debug === "true")
    console.log(
      "useIdleTimmer hook. isActive: ",
      isActive,
      " Counter: ",
      counter
    )

  // set a default timeout
  timeout = useMemo(() => {
    if (!timeout) return DEFAULT_TIMEOUT
    return timeout
  }, [timeout])

  // set default events
  events = useMemo(() => {
    if (!events) return DEFAULT_EVENTS
    if (!Array.isArray(events)) events = [events]
    return events
  }, [events])

  // on load bind events and reset on timeout changes
  useEffect(() => {
    if (!timeout || !events) return
    // track user activity by adding event listeners
    events.forEach((e) => window.addEventListener(e, activity))
    // init interval to check the timeout
    const interval = startInterval()
    return () => {
      // cleanup all events
      events.forEach((e) => window.removeEventListener(e, activity))
      // clear the interval
      clearInterval(interval)
    }
  }, [timeout, events])

  // dispatch callbacks and save state into the store
  useEffect(() => {
    // send callbacks
    if (isActive) {
      if (onActive) onActive()
    } else {
      if (onTimeout) onTimeout()
    }
  }, [isActive])

  // set the expire time by reducing noise
  const activity = () => {
    setIsActive(true)
    setCounter(0)
  }

  const startInterval = () => {
    return setInterval(() => {
      // use functional updates since interval will be created once
      // but we need to read the updated counter
      setCounter((prevCounter) => {
        const newCount = prevCounter + 1
        if (newCount > timeout) {
          setIsActive(false)
        }
        return newCount
      })
    }, 1000)
  }

  return { isActive }
}

export default useIdleTimer
