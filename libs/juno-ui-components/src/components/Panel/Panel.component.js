import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon"

const panelClasses = (isOpen, isTransitioning) => {
  return `
      jn-absolute
      jn-right-0
      jn-transition-transform
      jn-ease-out
      jn-duration-300
      jn-inset-y-0
      jn-z-10
      jn-grid
      jn-grid-rows-[auto_1fr]
      jn-bg-theme-panel
      jn-backdrop-blur
      jn-backdrop-saturate-150     
      jn-w-[45%]
      jn-shadow-md
			${!isOpen ? `jn-translate-x-[100%]` : ""}
			${!isOpen && !isTransitioning ? `jn-invisible` : ""}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const panelHeaderClasses = `
  jn-flex
  jn-items-center
  jn-py-4
  jn-px-8
`

const panelTitleClasses = `
  jn-text-theme-high
  jn-text-lg
  jn-font-bold
`

/** A slide-in panel for the Content Area.  */
export const Panel = ({
  heading,
  className,
  opened,
  closeable,
  onClose,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(opened)
  const [isCloseable, setIsCloseable] = useState(closeable)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // ensure we notice if the opened parameter is changed from the outside
  useEffect(() => {
    setIsOpen(opened)
  }, [opened])

  // ensure we notice if the cloeseable parameter is changed from the outside
  useEffect(() => {
    setIsCloseable(closeable)
  }, [closeable])

  // ----- Timeout stuff -------
  // necessary because we want to set the panel to invisible only after the closing transition has finished
  // the invisible panel is to ensure that the panel can't be tab targeted when closed
  const timeoutRef = React.useRef(null)

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current) // clear when component is unmounted
  }, [])

  // if isOpen state changes to false set the transitioning state to true for 500ms
  useEffect(() => {
    if (!isOpen) {
      setIsTransitioning(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setIsTransitioning(false), 500)
    }
  }, [isOpen])

  const handleClose = (event) => {
    setIsOpen(false)

    // call passed onClose event handler (if any)
    onClose && onClose(event)
  }

  return (
    <div
      className={`juno-panel ${panelClasses(
        isOpen,
        isTransitioning
      )} ${className}`}
      role="dialog"
      aria-labelledby="juno-panel-title"
      {...props}
    >
      <div className={`juno-panel-header ${panelHeaderClasses}`}>
        <div
          className={`juno-panel-title ${panelTitleClasses}`}
          id="juno-panel-title"
        >
          {heading}
        </div>
        { isCloseable &&
            <Icon
            icon="close"
            onClick={handleClose}
            className="juno-panel-close jn-ml-auto"
          />
        }
      </div>
      {children}
    </div>
  )
}

Panel.propTypes = {
  /** Pass a Panel heading/title. */
  heading: PropTypes.node,
  /**  Pass open state  */
  opened: PropTypes.bool,
  /**  Pass whethe panel should be closeable via a close button or not. If false, the close button will not be rendered. The panel can still be closed by setting "opened" to false.  */
  closeable: PropTypes.bool,
  /** Pass a handler that will be called when the close button is clicked */
  onClose: PropTypes.func,
  /** Pass an optional className */
  className: PropTypes.string,
  /** Pass child nodes to be rendered in the main body of the Panel */
  children: PropTypes.node,
}

Panel.defaultProps = {
  heading: "",
  opened: false,
  closeable: true,
  onClose: undefined,
  className: "",
}
