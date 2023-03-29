import React from "react"
import PropTypes from "prop-types"

/**
 * This provider acts as a container for portals. All portals within a Juno app should be added as children to this. 
 * The PortalProvider itself needs to be placed inside the Juno StyleProvider, otherwise styles might not be applied correctly on children of portals.
 */
export const PortalProvider = ({  }) => {
  return (
    <>
      {children}
    </>
  )
}

PortalProvider.propTypes = {

}

// define default values
PortalProvider.defaultProps = {

}
