import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { Button } from "../Button/index.js"
import { Menu } from "@headlessui/react"
import { knownIcons } from "../Icon/Icon.component.js"

const itemStyles = `
	jn-text-theme-default
	jn-flex
	jn-items-center
	jn-w-full
	jn-pt-[0.6875rem]
	jn-pb-[0.5rem]
	jn-px-[0.875rem]
	cursor-pointer
	bg-clip-padding
	jn-truncate
	jn-text-left
	jn-bg-theme-background-lvl-1
`

const actionableItemStyles = `
	hover:jn-bg-theme-background-lvl-3
`

const iconStyles = `
	jn-mr-1.5
`
/** 
A menu item to be used inside Menu.
Can render `<a>`, `<button>`, or generic elements to hold other interactive elements.
*/
export const MenuItem = ({
	label,
	icon,
	disabled,
	children,
	onClick,
	href,
	className,
	...props
}) => {
	
	const icn = icon ? <Icon icon={icon} size="18" className={`${iconStyles}`} /> : ""
	
	return (
		<Menu.Item disabled={disabled}>
			{/* Render children as is if passed, otherwise render an <a> if href was passed, othwerwise render a button as passed, otherwise render plain text */}
			<div>
				{ children ?
						children 
					:
						href ?
							<>
							{ icon ? <Icon icon={icon} size="18" className="jn-inline-block jn-mr-2" /> : "" }
							<a href={href}>{label}</a>
							</> 
						:
							onClick ?
								<Button onClick={onClick} label={label} size="small" variant="subdued" icon={ icon ? icon : "" } className="jn-w-full" />
							: 
								<>
									{ icon ? <Icon icon={icon} size="18" className="jn-inline-block jn-mr-2" /> : "" }
									{ label }
								</>
				}
			</div>
		</Menu.Item>
	)
	
	// const icn = icon ? <Icon icon={icon} size="18" className={`${iconStyles}`} /> : null
	// const content = label || children
	// 
	// const handleClick = (event) => {
	// 	onClick && onClick(event)
	// }
	// 
	// const anchor = (
	// 	<a 
	// 		href={href} 
	// 		className={`juno-menu-item juno-menu-item-anchor ${itemStyles} ${actionableItemStyles} ${className}`} 
	// 		role="menuitem"
	// 		{ ...props } 
	// 	>
	// 		{icn}
	// 		{content}
	// 	</a>
	// )
	// 
	// const button = (
	// 	<button 
	// 		onClick={handleClick} 
	// 		className={`juno-menu-item juno-menu-item-button ${itemStyles} ${actionableItemStyles} ${className}`}
	// 		role="menuitem"
	// 		{ ...props }
	// 	>
	// 		{icn}
	// 		{content}
	// 	</button>
	// )
	// 
	// const plain = (
	// 	<div 
	// 		className={`juno-menu-item ${itemStyles} ${className}`} 
	// 		role="menuitem"
	// 		{ ...props } 
	// 	>
	// 		{icn}
	// 		{content}
	// 	</div>
	// )
	// 
	// // render an anchor if an href prop was passed, otherwise render a button if onClick was passed, otherwise render non.interactive, plain element:
	// return href ? anchor : onClick ? button : plain

}

MenuItem.propTypes = {
	/** The label of the menu item. Will take precedence over children passed to the component. */
	label: PropTypes.string,
	disabled: PropTypes.bool,
	/** Pass the name of an icon the button should show. Can be any icon included with Juno. */
	icon: PropTypes.oneOf(knownIcons),
	/** Add a className to the menu item */
	className: PropTypes.string,
	/** Children of the menu item */
	children: PropTypes.node,
	/** Pass an href to the menu item. Will result in the menu item being rendered as an `<a>`. Will take precedence over an onClick prop being passed to the component */
	href: PropTypes.string,
	/** Pass an onClick handler to the menu item. Will result in the menu item being rendered as a `<button>`. */
	onClick: PropTypes.func,
}

MenuItem.defaultProps = {
	label: "",
	className: "",
	disabled: false,
	icon: null,
	children: null,
	href: "",
	onClick: undefined,
}