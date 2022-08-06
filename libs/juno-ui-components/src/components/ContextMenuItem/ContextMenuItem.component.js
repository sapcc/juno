import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

const itemStyles = `
	jn-text-sm
`

const iconStyles = `
	jn-mr-1.5
`

export const ContextMenuItem = ({
	label,
	icon,
	children,
	onClick,
	href,
	className,
	...props
}) => {
	
	const icn = icon ? <Icon icon={icon} size="18" className={`${iconStyles}`} /> : null
	const content = label || children
	
	const anchor = (
		<a 
			href={href} 
			className={`juno-contextmenu-item juno-contextmenu-item-anchor ${itemStyles} ${className}`} 
			role="menuitem"
			{ ...props } 
		>
			{icn}
			{content}
		</a>
	)
	
	const button = (
		<button 
			onClick={onClick} 
			className={`juno-contextmenu-item juno-contextmenu-item-button ${itemStyles} ${className}`}
			role="menuitem"
			{ ...props }
		>
			{icn}
			{content}
		</button>
	)
	
	const plain = (
		<div 
			className={`juno-contextmenu-item ${itemStyles} ${className}`} 
			role="menuitem"
			{ ...props } 
		>
			{icn}
			{content}
		</div>
	)
	

	return href ? anchor : onClick ? button : plain

}

ContextMenuItem.propTypes = {
	/** The label of the menu item. Will take precedence over children passed to the component. */
	label: PropTypes.string,
	/** Pass the name of an icon the button should show. Can be any icon included with Juno. */
	icon: PropTypes.oneOf(knownIcons),
	/** Add a className to the menu item */
	className: PropTypes.string,
	/** Children of the mneu item */
	children: PropTypes.node,
	/** Pass an href to the menu item. Will result in the menu item being rendered as an `<a>`. Will take precedence over an onClick prop being passed to the component */
	href: PropTypes.string,
	/** Pass an onClick handler to the menu item. Will result in the menu item being rendered as a `<button>`. */
	onClick: PropTypes.func,
}

ContextMenuItem.defaultProps = {
	label: "",
	className: "",
	icon: null,
	children: null,
	href: "",
	onClick: undefined,
}