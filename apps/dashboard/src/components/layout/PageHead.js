import tw from "twin.macro"
import { ReactComponent as SAPLogo } from "../../assets/images/SAP_logo.svg"
import { LayoutContainer } from "../shared/StyledComponents"

// import logo from "../../assets/images/SAP_logo.svg"
import UserProfile from "../UserProfile"

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
        <SAPLogo />
        <UserProfile />
      </Container>
    </Head>
  )
}

export default PageHead
