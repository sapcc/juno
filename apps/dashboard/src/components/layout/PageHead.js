import tw from "twin.macro"
import { ReactComponent as SAPLogo } from "../../assets/images/SAP_logo.svg"
import { LayoutContainer } from "../shared/StyledComponents"

// import logo from "../../assets/images/SAP_logo.svg"
import UserProfile from "../UserProfile"
import { Link } from "react-router-dom"

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
        {/* <div>
          <Link to="/">Home</Link> | <Link to="/designate">Designate</Link>
        </div> */}
        <UserProfile />
      </Container>
    </Head>
  )
}

export default PageHead
