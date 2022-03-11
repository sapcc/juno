import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ClickableIcon } from "../ClickableIcon/index"

const panelClasses = (isOpen) => {
  return `
      absolute
      right-0
      transition-transform
      ease-in-out
      duration-300
      inset-y-0
      z-10
      grid
      grid-rows-[auto_1fr]
      bg-theme-background-lvl-0
      backdrop-blur
      bg-opacity-70
      w-[45%]
			${!isOpen && `translate-x-[100%]`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const panelHeaderClasses = `
  flex
  items-center
  py-4
  px-8
`

const panelTitleClasses = `
  text-theme-high
  text-lg
  font-bold
`



/** A slide-in panel for the Content Area.  */
export const Panel = ({
  heading,
  className,
  opened,
  onClose,
  children,
  ...props
}) => {

  const [isOpen, setIsOpen] = useState(opened)
	
	useEffect(() => {
		setIsOpen(opened)
	}, [opened])

  const handleClose = (event) => {
    setIsOpen(false)
    // call passed onClose event handler (if any)
    onClose && onClose(event)
  }

  return (
    <div 
      className={`juno-panel ${panelClasses(isOpen)} ${className}`}
      role="dialog"
      aria-labelledby="juno-panel-title"
      {...props} >
      <div className={`juno-panel-header ${panelHeaderClasses}`}>
        <div className={`juno-panel-title ${panelTitleClasses}`} id="juno-panel-title">{heading}</div>
        <ClickableIcon icon="close" onClick={handleClose} className="juno-panel-close ml-auto" />
      </div>
      {children}
    </div>
  )
}

Panel.propTypes = {
  /** Pass a Panel heading/title. */
  heading: PropTypes.string,
  /**  Pass open state  */
	opened: PropTypes.bool,
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
  onClose: undefined,
  className: "",
}
