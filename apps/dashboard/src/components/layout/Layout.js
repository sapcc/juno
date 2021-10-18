import React from "react"
import PageHead from "./PageHead"
import PageFooter from "./PageFooter"



const Layout = ({ children }) => {
  return (
    <div>
      <PageHead />
      {children}
      <PageFooter />
    </div>
  )
}

export default Layout
