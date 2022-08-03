import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

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
		<a href={href}>
			{icn}
			{content}
		</a>
	)
	
	const button = (
		<button onClick={onClick} >
			{icn}
			{content}
		</button>
	)
	
	const plain = (
		<div className={`${className}`} { ...props } >
			{icn}
			{content}
		</div>
	)
	

	return href ? anchor : onClick ? button : plain

}

ContextMenuItem.propTypes = {
	label: PropTypes.string,
	/** Pass the name of an icon the button should show. Can be any icon included with Juno. */
	icon: PropTypes.oneOf(knownIcons),
	className: PropTypes.string,
	children: PropTypes.node,
	href: PropTypes.string,
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