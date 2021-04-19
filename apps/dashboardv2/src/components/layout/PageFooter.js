// import tw from "twin.macro"
import React from "react"
import { Link } from "gatsby"
import { LayoutContainer } from "../shared/StyledComponents"

const PageFooter = () => {
  return (
    <LayoutContainer>
      <div>
        Footer | <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </div>
    </LayoutContainer>
  )
}

export default PageFooter
