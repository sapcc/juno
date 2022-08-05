import React from "react"
import ReactDOM from "react-dom";
import PropTypes from "prop-types"

export const Portal = ({
	children,
	targetNode
}) => {
	return (
		ReactDOM.createPortal( children, targetNode)
	)
}

Portal.propTypes = {
	children: PropTypes.node,
}

Portal.defaultProps = {
	targetNode: document.body,
}