import React from "react"
import ReactDOM from "react-dom";
import PropTypes from "prop-types"

export const Portal = ({
	children,
	targetNode,
	targetSelector,
}) => {
	
	// render in targetNode if exists, otherwise in an element matching targetSelector if such an element exists, otherwise render to document.body:
	const target = 	targetNode ?
						targetNode
					:  
						targetSelector && document.querySelector(targetSelector) ? 
							document.querySelector(targetSelector) 
						: 
							document.body
	return (
		ReactDOM.createPortal( children, target )
	)
}

Portal.propTypes = {
	/** The children to render in the Portal */
	children: PropTypes.node,
	/** Any valid ReactDOM node in the document to render the Portal in. This is currently not tested nor in storybook! */
	targetNode: PropTypes.node,
	/** A valid CSS selector of an element to render the Portal in */
	targetSelector: PropTypes.string,
}

Portal.defaultProps = {
	children: null,
	targetNode: null,
	targetSelector: "",
}