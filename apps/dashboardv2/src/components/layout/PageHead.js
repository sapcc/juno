import React from "react"
import tw from "twin.macro"
import SAPLogo from "../../images/SAP_logo.svg"
import { LayoutContainer } from "../shared/StyledComponents"

// import logo from "../../assets/images/SAP_logo.svg"
import UserProfile from "./UserProfile"
import { Link } from "gatsby"

const Head = tw.div`
  bg-black
  bg-opacity-60
`

const Container = tw(LayoutContainer)`
  flex
  justify-between
  items-center
  py-6
`

const PageHead = () => {
  return (
    <Head>
      <Container>
        <Link to="/">
          <SAPLogo />
        </Link>

        <UserProfile />
      </Container>
    </Head>
  )
}

export default PageHead
