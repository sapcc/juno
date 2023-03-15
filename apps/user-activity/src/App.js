import useIdleTimer from "./hooks/useIdleTimer"

const App = (props = {}) => {
  useIdleTimer({ timeout: 5, debug: props.debug })

  console.log("app loaded")
  return null
}

export default App
