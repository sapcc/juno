import { useEffect, useState, useMemo } from "react"

const DEFAULT_TIMEOUT = 1800 // 30 min

const useIdleTimer = ({ timeout, onTimeout, onActive }) => {
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

  useEffect(() => {
    if (isActive) {
      if (onActive) onActive()
      console.log("Active")
    } else {
      if (onTimeout) onTimeout
      console.log("NOT active")
    }
  }, [isActive])

  // track user activity by adding event listeners
  const trackActivity = () => {
    window.addEventListener("mousemove", activity)
    window.addEventListener("scroll", activity)
    window.addEventListener("keydown", activity)
    window.addEventListener("keydown", focus)
  }

  // cleanup all events
  const cleanUp = () => {
    clearInterval(intervalChecker)
    window.removeEventListener("mousemove", activity)
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

  console.log("test: ", timeout, isActive, counter)

  return { isActive: isActive, inActiveSince: counter }
}

export default useIdleTimer
