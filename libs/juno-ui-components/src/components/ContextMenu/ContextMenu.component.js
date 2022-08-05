import React, { useState } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { Portal } from "../Portal/index.js"

/*
TODO:
* close on [ESC]
* build generic Menu component and use it?
* comfortably find tragetNode for Portal (should be in StyleProvider?)
* a11y
* docstrings
* Rename Portal API: "InPortal" -> "Portal"
*/

const toggleStyles = `

`

const menuStyles = `
	jn-text-sm
	jn-w-auto
	jn-w-[11.25rem]
	jn-flex-col
`

export const ContextMenu = ({
	icon,
	className,
	children,
	open,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false)
	
	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}
	
	return (
		<>
			<Icon icon="moreVert" className={`juno-contextmenu-toggle ${toggleStyles}`} onClick={toggleOpen} />
			{ isOpen ?
				/* <Portal targetNode={document.getElementById("root")} >*/
				
					<div className={`juno-contextmenu-menu ${menuStyles}`} role="menu">
						{ children }
					</div>
					
				/* </Portal> */
			:
				null	
			}
		</>
	)
}

ContextMenu.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	open: PropTypes.bool,
}

ContextMenu.defaultProps = {
	className: "",
	children: null,
	open: false,
}