import React from "react"
import ReactDOM from "react-dom";
import PropTypes from "prop-types"

export const InPortal = ({
	children,
	targetNode
}) => {
	return (
		ReactDOM.createPortal( children, targetNode)
	)
}

InPortal.propTypes = {
	children: PropTypes.node,
}

InPortal.defaultProps = {
	targetNode: document.body,
}