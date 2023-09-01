import React, { Fragment, useContext } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"
import { Button } from "../Button/index.js"
import { Menu } from "@headlessui/react"
import { MenuContext } from "../Menu/Menu.component.js"
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

const smallStyles = `
	jn-text-sm
`

const normalStyles = `
	jn-text-base
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
	
	const handleClick = (event) => {
		onClick && onClick(event)
	}
	
	const menuContext = useContext(MenuContext)
	const {
		variant: variant,
	} = menuContext || {}
	
	return (
		<Menu.Item 
			disabled={disabled}
			as={ href ? "a" : "button"}
			href={href}
			onClick={ handleClick }
			className={`
				juno-menu-item 
				${ href ? "juno-menu-item-anchor" : "juno-menu-item-button"} 
				${ itemStyles } 
				${ variant === "small" ? smallStyles : normalStyles }
				${ className }
			`}
		>
			{/* Render children as is if passed, otherwise render an <a> if href was passed, othwerwise render a button as passed, otherwise render plain text */}

				{/* { children ?
						children 
					:
						href ?
							<>
							{ icon ? <Icon icon={icon} size="18" className="jn-inline-block jn-mr-2" /> : "" }
							<a href={href}>{label}</a>
							</> 
						:
							onClick ?
								<Button onClick={handleClick} label={label} size="small" variant="subdued" icon={ icon ? icon : "" } className="jn-w-full" />
							: 
								<>
									{ icon ? <Icon icon={icon} size="18" className="jn-inline-block jn-mr-2" /> : "" }
									{ label }
								</>
				} */}
				{ icon ?
					<Icon icon={icon} size="18" className="jn-inline-block jn-mr-2" /> : ""
				}
				{ children || label }
		</Menu.Item>
	)

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
	href: undefined,
	onClick: undefined,
}