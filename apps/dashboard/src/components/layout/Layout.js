import React from "react"
import PageHead from "./PageHead"
import PageFooter from "./PageFooter"



const Layout = ({ children }) => {
  return (
    <div className="flex flex-col grow">
      <PageHead />
      {children}
      <PageFooter />
    </div>
  )
}

export default Layout
