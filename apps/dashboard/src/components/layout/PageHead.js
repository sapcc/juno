import React from "react"

import useStore from "../../store"

import { Button, Icon, PageHeader } from "juno-ui-components"

// import { Link } from "react-router-dom"


const PageHead = () => {
  const toggleLoginOverlay = useStore((state) => state.toggleLoginOverlay)

  return (
    <PageHeader>
      
      <div className="ml-auto">
        <Button variant="primary" title="Log in" onClick={() => toggleLoginOverlay()}>
          <Icon icon="manageAccounts" color="text-white" className="mr-3" />
          Log in
        </Button>
      </div>
    </PageHeader>
  )
}

export default PageHead
