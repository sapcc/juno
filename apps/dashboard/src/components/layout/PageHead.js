import React from "react"

import { Button, Icon, PageHeader } from "juno-ui-components"

// import { Link } from "react-router-dom"


const PageHead = () => {
  return (
    <PageHeader>
      
      <div className="ml-auto">
        <Button variant="primary" title="Log in">
          <Icon icon="manageAccounts" color="text-white" className="mr-3" />
          Log in
        </Button>
      </div>
    </PageHeader>
  )
}

export default PageHead
