import React from "react"
import PropTypes from "prop-types"

export const CodeBlock = ({
	className
}) => {
	return (
		<pre>
			<code>
			</code>
		</pre>
	)
}

CodeBlock.propTypes = {
	/** Add a custom class name */
	className: PropTypes.string,
}

CodeBlock.defaultProps  = {
	className: "",
}