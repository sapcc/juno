import React, { useMemo, useEffect } from "react"

import { AppShell, AppShellProvider } from "juno-ui-components"
import AppContent from "./AppContent"
import styles from "./styles.scss"
import useAlertmanagerAPI from "./hooks/useAlertmanagerAPI"
import useStore from "./hooks/useStore"
import useCommunication from "./hooks/useCommunication"

function App(props = {}) {
  const setFilterLabels = useStore((state) => state.filters.setLabels)

  const embedded = useMemo(
    () => props.embedded === "true" || props.embedded === true,
    [props.embedded]
  )

  /** TODO:
   * load the values from kubernetes plugin config instead of hardcoding
   * */
  // transfer plugin config to store
  useEffect(() => {
    // load from plugin config
    const filterLabels = [
      "app",
      "cluster",
      "cluster_type",
      "context",
      "job",
      "region",
      "service",
      "severity",
      "status",
      "support_group",
      "tier",
      "type"
    ]

    setFilterLabels(filterLabels)
  }, [])

  useCommunication()
  useAlertmanagerAPI(props.endpoint)

  return (
    <AppShell
      pageHeader="Converged Cloud | Supernova"
      contentHeading="Supernova"
      embedded={embedded}
    >
      <AppContent props={props} />
    </AppShell>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider>
      {/* load appstyles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <App {...props} />
    </AppShellProvider>
  )
}

export default StyledApp
