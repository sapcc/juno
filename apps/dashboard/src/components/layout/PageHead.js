import React, { useCallback } from "react"

import useStore from "../../store"

import { Button, Icon, PageHeader } from "juno-ui-components"

// import { Link } from "react-router-dom"

const PageHead = () => {
  const toggleLoginOverlay = useStore(useCallback((state) => state.toggleLoginOverlay))

  return (
    <PageHeader>
      
      <div className="ml-auto">
        <Button variant="primary" size="small" icon="manageAccounts" title="Log in" onClick={() => toggleLoginOverlay()}>
          Log in
        </Button>
      </div>
    </PageHeader>
  )
}

export default PageHead
