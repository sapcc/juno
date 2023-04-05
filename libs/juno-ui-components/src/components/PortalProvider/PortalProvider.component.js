import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import PropTypes from "prop-types"
import { createPortal } from "react-dom"

const PortalContext = createContext()

export const Portal = ({ children }) => {
  const ref = useContext(PortalContext)
  const [_, setInitialized] = useState(ref.current)

  useEffect(() => {
    if (ref.current) setInitialized(true)
  }, [ref.current])

  return ref.current ? createPortal(children, ref.current) : null
}

Portal.propTypes = {}

/**
 * This provider acts as a container for portals. All portals within a Juno app should be added as children to this.
 * The PortalProvider itself needs to be placed inside the Juno StyleProvider, otherwise styles might not be applied correctly on children of portals.
 */
export const PortalProvider = ({ className, id, children }) => {
  const ref = useRef()

  return (
    <PortalContext.Provider value={ref}>
      {children}
      <div data-juno-portal-container className={className} id={id} ref={ref} />
    </PortalContext.Provider>
  )
}
// bind Portal to PortalProvider
PortalProvider.Portal = Portal

PortalProvider.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
}

// define default values
PortalProvider.defaultProps = {
  className: undefined,
  id: undefined,
}
