import useIdleTimer from "./hooks/useIdleTimer"

const App = (props = {}) => {
  const { isActive } = useIdleTimer({ timeout: 5, debug: props.debug })

  console.log("app loaded: ", isActive)
  return null
}

export default App
