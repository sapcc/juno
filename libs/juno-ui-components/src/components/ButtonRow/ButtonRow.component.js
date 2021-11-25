import React from "react"
import PropTypes from "prop-types"

const buttonrowstyles = `
	flex
	flex-row
	justify-end
	gap-2
`

export const ButtonRow = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={`juno-button-row ${buttonrowstyles} ${className}`} {...props} >
			{children}
		</div>
	)
}

ButtonRow.propTypes = {
	/** Add a class to the ButtonRow */
	className: PropTypes.string,
	/** Children to render in the ButtonRow */
	children: PropTypes.node,
}

ButtonRow.defaultProps = {
	children: null,
	className: "",
}