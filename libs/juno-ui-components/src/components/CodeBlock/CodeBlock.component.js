import React from "react"
import PropTypes from "prop-types"

const codeBlockBaseStyles = `
	text-sm
	p-6
	bg-theme-code-block
`

const nonWrapStyles = `
	overflow-x-auto
`

export const CodeBlock = ({
	wrap,
	className,
	children,
	...props
}) => {
	return (
		<div className={`juno-codeblock ${codeBlockBaseStyles} ${ !wrap ? nonWrapStyles : ''} `} >
			<pre>
				<code>
					{children}
				</code>
			</pre>
		</div>
	)
}

CodeBlock.propTypes = {
	/** Add a custom class name */
	className: PropTypes.string,
	/** The children/content to render in a codeblock */
	children: PropTypes.node,
	/** Whether the content should wrap */
	wrap: PropTypes.bool,
}

CodeBlock.defaultProps  = {
	wrap: true,
	className: "",
}