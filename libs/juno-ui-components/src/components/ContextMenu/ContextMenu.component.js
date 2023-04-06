import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { Menu } from "../Menu/index.js"

/*
TODO:

* close on [ESC] (prop?)
* close on click outside (prop?)
* keyboard navigation: arrow up/down moves focus
* for toggle styles (hover, active, etc.) -> expand icon (interactive) component or handle here (aka are these styles generically useful or specific to this component?)
* a11y
* docstrings
* fix stories
* don't ALWAYS render button!?!
*/

const toggleStyles = `
	hover:jn-text-theme-accent
	active:jn-text-theme-accent
`

const toggleOpenStyle = `
	jn-text-theme-accent
`

// TODO: add 	jn-absolute jn-top-0 jn-left-0 ?
const menuStyles = `
	jn-w-[11.25rem]
`

/** A context menu with a toggle. */

export const ContextMenu = ({ icon, className, children, open, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (event) => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const menu = (
    <Menu className={`juno-contextmenu-menu ${menuStyles}`} variant="small">
      {children}
    </Menu>
  )

  return (
    <>
      <Icon
        icon="moreVert"
        className={`juno-contextmenu-toggle ${toggleStyles} ${
          isOpen ? toggleOpenStyle : ""
        }`}
        onClick={handleClick}
      />
      {isOpen ? menu : null}
    </>
  )
}

ContextMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  open: PropTypes.bool,
  portal: PropTypes.bool,
  targetSelector: PropTypes.string,
}

ContextMenu.defaultProps = {
  className: "",
  children: null,
  open: false,
  portal: false,
  targetSelector: "",
}
