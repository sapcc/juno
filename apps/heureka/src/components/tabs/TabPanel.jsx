import React, { useMemo, useRef, useEffect } from "react"
import { useActiveTab } from "../StoreProvider"

const TabPanel = ({ value, children }) => {
  const activeTab = useActiveTab()

  // ATENTION!! compare with == since tabindex is int and value is string
  const displayChildren = useMemo(() => activeTab == value, [activeTab, value])

  return (
    <div style={{ display: displayChildren ? "inline" : "none" }}>
      {children}
    </div>
  )
}

export default TabPanel
