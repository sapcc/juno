import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "."

/**
 * This component renders a link in which the onClick function uses
 * the navigateTo from the router context.
 * @param {object} props, "to" is the path string
 * @returns component
 */
const Link = ({ to, children, options, ...props }) => {
  const { navigateTo } = useRouter()

  return (
    <a
      {...props}
      href="#"
      onClick={(e) => {
        e.preventDefault()
        navigateTo(to, options)
      }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
}

export default Link
