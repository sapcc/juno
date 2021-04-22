// import tw from "twin.macro"
import { Link } from "react-router-dom"
import { LayoutContainer } from "../shared/StyledComponents"

const PageFooter = () => {
  return (
    <LayoutContainer>
      <div>
        Footer <Link to="/">Home</Link> | <Link to="/designate">Designate</Link>
      </div>
    </LayoutContainer>
  )
}

export default PageFooter
