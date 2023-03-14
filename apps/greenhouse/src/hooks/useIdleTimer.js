import { useEffect, useState, useMemo } from "react"
import useStore from "./useStore"

const DEFAULT_TIMEOUT = 1800 // 30 min

// TODO: should we return the counter?
const useIdleTimer = ({ timeout, onTimeout, onActive }) => {
  const userActivity = useStore((state) => state.userActivity)
  const [intervalChecker, setIntervalChecker] = useState(null)
  const [counter, setCounter] = useState(0)
  const [isActive, setIsActive] = useState(true) // default to true so it is not starting inactive

  // set a default timeout
  timeout = useMemo(() => {
    if (!timeout) return DEFAULT_TIMEOUT
    return timeout
  }, [timeout])

  // on load bind events and reset on timeout changes
  useEffect(() => {
    trackActivity()
    startInterval()
    return () => cleanUp()
  }, [timeout])

  // dispatch callbacks and save state into the store
  useEffect(() => {
    // save into the store
    userActivity?.setIsActive(isActive)
    // send callbacks
    if (isActive) {
      if (onActive) onActive()
    } else {
      if (onTimeout) onTimeout()
    }
  }, [isActive])

  console.log("IDLETIMMER HOOK: ", isActive, counter)

  // track user activity by adding event listeners
  const trackActivity = () => {
    window.addEventListener("mousemove", activity)
    window.addEventListener("click", activity)
    window.addEventListener("scroll", activity)
    window.addEventListener("keydown", activity)
    window.addEventListener("keydown", focus)
  }

  // cleanup all events
  const cleanUp = () => {
    clearInterval(intervalChecker)
    window.removeEventListener("mousemove", activity)
    window.removeEventListener("click", activity)
    window.removeEventListener("scroll", activity)
    window.removeEventListener("keydown", activity)
    window.removeEventListener("focus", activity)
  }

  // set the expire time by reducing noise
  const activity = () => {
    setIsActive(true)
    setCounter(0)
  }

  // check in regular periods if we still active
  const startInterval = () => {
    setIntervalChecker(
      setInterval(() => {
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
    )
  }

  return { isActive: isActive, inActiveSince: counter }
}

export default useIdleTimer
