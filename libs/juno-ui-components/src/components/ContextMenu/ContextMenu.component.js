import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { Menu } from "../Menu/index.js"
import { Portal } from "../Portal/index.js"

/*
TODO:
* use Portal
* close on [ESC]
* keyboard navigation: arrow up/down moves focus
* build generic Menu component and use it
* build generic MenuItem component (rename/refactor ContextMenuItem)
* create MenuSection (with divider, optional title) component
* comfortably find targetNode for Portal (should be in StyleProvider?)
* for toggle styles (hover, active, etc.) -> expand icon (interactive) component or handle here (aka are these styles generically useful or specific to this component?)
* a11y
* docstrings
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
	
	const handleClick = (event) => {
		setIsOpen(!isOpen)
	}
	
	useEffect(() => {
		setIsOpen(open)
	}, [open])
	
	return (
		<>
			<Icon icon="moreVert" className={`juno-contextmenu-toggle ${toggleStyles}`} onClick={handleClick} />
			{ isOpen ?
				/* <Portal targetNode={document.getElementById("root")} >*/
				
					<Menu className={`juno-contextmenu-menu ${menuStyles}`}>
						{ children }
					</Menu>
					
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