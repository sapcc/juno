import React from "react"
import ReactDOM from "react-dom";
import PropTypes from "prop-types"

/*
TODO:
* allow targetSelector
* allow TargetRef
*/


export const Portal = ({
	children,
	targetNode,
	targetSelector,
}) => {
	
	const target = targetNode || targetSelector && targetSelector.length ? document.querySelector(targetSelector) : document.body
	
	return (
		ReactDOM.createPortal( children, target )
	)
}

Portal.propTypes = {
	children: PropTypes.node,
	targetNode: PropTypes.node,
	targetSelector: PropTypes.string,
}

Portal.defaultProps = {
	children: null,
	targetNode: null,
	targetSelector: "",
}