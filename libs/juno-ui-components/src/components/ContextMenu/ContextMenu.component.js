import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { Menu } from "../Menu/index.js"
import { Portal } from "../Portal/index.js"

/*
TODO:
* use Portal (prop?)
* close on [ESC] (prop?)
* close on click outside (prop?)
* keyboard navigation: arrow up/down moves focus
* comfortably find targetNode for Portal (should be in StyleProvider?)
* for toggle styles (hover, active, etc.) -> expand icon (interactive) component or handle here (aka are these styles generically useful or specific to this component?)
* a11y
* docstrings
* fix stories
* don't ALWAYS render button!?!
*/

const toggleStyles = `
	hover:jn-text-theme-accent
	hover:jn-bg-theme-contextmenu-toggle-hover-active
`

const toggleOpenStyle = `
	jn-text-theme-accent
	jn-bg-theme-contextmenu-toggle-hover-active
`

const menuStyles = `
	jn-w-[11.25rem]
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
			<Icon 
				icon="moreVert" 
				className={`juno-contextmenu-toggle ${toggleStyles} ${ isOpen ? toggleOpenStyle : "" }`} 
				onClick={handleClick}
			/>
			{ isOpen ?
				/* <Portal targetNode={document.getElementById("root")} >*/
				
					<Menu className={`juno-contextmenu-menu ${menuStyles}`} variant="small" >
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