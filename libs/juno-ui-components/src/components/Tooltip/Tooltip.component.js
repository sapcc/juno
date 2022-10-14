import React, { useState } from "react"
import PropTypes from "prop-types"
import { autoUpdate, useFloating, shift, offset, flip, size } from '@floating-ui/react-dom-interactions';
import { Icon } from "../Icon/index.js"

/* Styles */
const popoverStyles = `
	jn-bg-theme-background-lvl-1
	jn-text-theme-high 
	jn-inline-flex	
	jn-items-start
	jn-p-2
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

/**
A ToolTip component. Renders a non-semantic version by default, and can render 'Info', 'Warning', 'Error', 'Danger', and 'Success' semantic variants.
*/

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
	const [isOpen, setIsOpen] = useState(true)
	// middleware: [offset(10), flip(), shift()],
	const {x, y, reference, floating, strategy, context} = useFloating({ isOpen, onOpenChange: setIsOpen, whileElementsMounted: autoUpdate});
	
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
				ref={reference}
			/>
			{ isOpen ?
				<div 
					className={`juno-tooltip-popover juno-tooltip-popover-${variant} ${popoverStyles}`}
					ref={floating}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
					}}
					>
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
