import { useEffect } from "react"
import PropTypes from "prop-types"
import { useRouter } from "./RouterContext"

/**
 * Redirect uses the redirectTo from the router context and
 * calls it as soon as the component has been mounted.
 * @param {object} props
 * @returns
 */
const Redirect = ({ to }) => {
  const { redirectTo } = useRouter()

  useEffect(() => {
    redirectTo(to)
  }, [])
  return null
}

Redirect.propTypes = {
  to: PropTypes.string.isRequired,
}

export default Redirect
