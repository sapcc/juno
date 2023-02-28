import React from "react"
import useAppLoader from "../hooks/useAppLoader"
import useStore from "../hooks/useStore"

const App = ({ name, active }) => {
  const [mounted, setMounted] = React.useState(false)
  const { mount } = useAppLoader()
  const ref = React.createRef()
  const config = useStore((state) => state.apps.config)

  React.useEffect(() => {
    if (!mount || !config[name] || !active || mounted) return

    const app = mount(ref.current, config[name])
    if (app) app.then(() => setMounted(true))
  }, [active, mounted, setMounted, mount, config[name]])
  return <div ref={ref} style={{ display: active ? "block" : "none" }}></div>
}

export default App
