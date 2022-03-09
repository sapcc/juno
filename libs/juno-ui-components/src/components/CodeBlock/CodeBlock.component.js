import React from "react"
import PropTypes from "prop-types"

const codeBlockBaseStyles = `
	p-6
	bg-theme-code-block
`

const codeStyles = `
	text-sm
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
		<div className={`juno-codeblock ${codeBlockBaseStyles} ${ !wrap ? nonWrapStyles : ''} ${className}`} {...props} >
			<pre>
				<code className={`${codeStyles}`} >
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