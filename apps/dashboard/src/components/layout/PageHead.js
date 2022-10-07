import React, { useCallback } from "react"

import useStore from "../../store"
import { buildDashboardLink } from "../../lib/utils"

import { Button, Icon, PageHeader } from "juno-ui-components"

const PageHead = () => {
  const showLoginOverlay = useStore(useCallback((state) => state.showLoginOverlay))
  const selectedDomain   = useStore(useCallback((state) => state.domain))
  const selectedRegion   = useStore(useCallback((state) => state.region))
  const prodMode         = useStore(useCallback((state) => state.prodMode))

  const handleLoginButtonClick = () => {
    if (selectedRegion && selectedDomain) {
      window.location.href = buildDashboardLink(selectedRegion, selectedDomain, prodMode)
    } else {
      showLoginOverlay()
    }
  }

  return (
    <PageHeader>
      
      <div className="ml-auto">
        <Button variant="primary" size="small" icon="manageAccounts" title="Log in" onClick={handleLoginButtonClick}>
          Log in
        </Button>
      </div>
    </PageHeader>
  )
}

export default PageHead
