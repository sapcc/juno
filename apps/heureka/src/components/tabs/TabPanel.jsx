import React, { useMemo, useRef, useEffect } from "react"
import { useTabIndex } from "../StoreProvider"

const TabPanel = ({ value, children }) => {
  const tabIndex = useTabIndex()

  // ATENTION!! compare with == since tabindex is int and value is string
  const displayChildren = useMemo(() => tabIndex == value, [tabIndex, value])

  return (
    <div style={{ display: displayChildren ? "inline" : "none" }}>
      {children}
    </div>
  )
}

export default TabPanel
