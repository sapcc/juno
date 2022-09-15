import React from "react"
import PropTypes from "prop-types"
import { Stack } from "../Stack"

const buttonrowstyles = `
	jn-flex
	jn-flex-row
	jn-justify-end
	jn-gap-2
`

/** A container to hold one or multiple buttons and space and align them. */
export const ButtonRow = ({
	children,
	className,
	...props
}) => {
	return (
		<Stack gap="2" className={`juno-button-row ${className}`} {...props} >
			{children}
		</Stack>
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