import React from "react"
import PropTypes from "prop-types"
import { ClickableIcon } from "../ClickableIcon/index.js"

export const OverflowMenu = ({
	disabled
}) => {
	return (
		<ClickableIcon disabled={disabled} />
	)
}

OverflowMenu.propTypes = {
	/** Whether the menu is disabled */
	disabled: PropTypes.bool,
}

OverflowMenu.defaultProps = {
	disabled: false,
}