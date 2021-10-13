import React from "react"
import PropTypes from "prop-types"

export const DataGridHead = ({
	className,
	children,
	props
}) => {
	return (
		<thead classname={className} {...props}>
			{children}
		</thead>
	)
}

DataGridHead.propTypes = {
	/** Children to render in the DataGridHead */
	children: PropTypes.node,
}

DataGridHead.defaultProps = {
	className: "",
	children: null,
}