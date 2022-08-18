import React, { useState } from "react"
import ReactDOM from "react-dom";
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

/* Styles */
const popover = `
	jn-p-2
	jn-rounded
	jn-text-xs
	jn-inline-block
	jn-absolute
	jn-bg-theme-tooltip-popover
	jn-text-theme-tooltip-popover
`

const popoverStyles = `
	jn-bg-theme-background-lvl-1
	jn-text-theme-high 
	jn-inline-flex	
	jn-items-start
	jn-p-2
	jn-mb-8
	jn-rounded
`

const popoverTextStyles = `
	jn-mx-4
	jn-max-w-full
`

const popoverIconStyles = `
	jn-shrink-0
`

const getIcon = (variant) => {
	switch (variant) {
		case "error":
			return "dangerous"
		default:
			return variant
	}
}

export const Tooltip = ({
	variant,
	children,
	text,
	className,
	disabled,
	open,
	onClick,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false)
	
	React.useEffect(() => {
		setIsOpen(open)
	}, [open])
	
	const handleClick = (event) => {
		setIsOpen(!isOpen)
		onClick && onClick(event)
	}
	
	return (		
		<span className={`juno-tooltip`} {...props}>
			<Icon 
				onClick={handleClick} 
				className={`${className}`} 
				disabled={disabled}
			/>
			{ isOpen ?
				<div className={`juno-tooltip-popover juno-tooltip-popover-${variant} ${popoverStyles}`}>
					{ variant ? 
						<Icon 
							icon={getIcon(variant)}
							color={"jn-text-theme-" + variant}
							className={`juno-tooltip-popover-icon ${popoverIconStyles}`}
						/>
					:
						null
					}
					<p className={`${popoverTextStyles}`}>
						{ children || text }
					</p>
				</div>
			:
				null
			}
		</span>
	)
}

Tooltip.propTypes = {
	/** The semantic variant of the tooltip, or `plain` */
	variant: PropTypes.oneOf(["info", "warning", "danger", "error", "success"]),
	/** Pass child nodes to display in the tooltip */
	children: PropTypes.node,
	/** Text to display in the tooltip */
	text: PropTypes.node,
	/** Pass a className to render to the icon button*/
	className: PropTypes.string,
	/** Disable the tooltip */
	disabled: PropTypes.bool,
	/** Whether the Tooltip is open */
	open: PropTypes.bool,
}

Tooltip.defaultProps = {
	variant: null,
	children: null,
	text: "",
	className: "",
	disabled: null,
	open: false,
}
