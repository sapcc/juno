import { useMemo } from "react"
import useIdleTimer from "./hooks/useIdleTimer"
import useCommunication from "./hooks/useCommunication"

const App = (props = {}) => {
  const propEvents = useMemo(() => {
    if (!props.events || typeof props.events !== "string") return
    return props.events.split(",")
  }, [props.events])

  const { isActive } = useIdleTimer({
    timeout: 5,
    events: propEvents,
    debug: props.debug,
  })

  useCommunication(isActive, { debug: props.debug })
  return null
}

export default App
