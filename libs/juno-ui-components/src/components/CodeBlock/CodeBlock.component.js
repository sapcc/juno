import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const codeBlockBaseStyles = `
	bg-theme-code-block
	rounded
`

const codeContainerStyles = (wrap) => {	

	return `
		p-6
		${wrap ? "break-words break-all whitespace-pre-wrap" : "overflow-x-auto"}
	`
}

const codeContainerSize = (size) => {	

	switch(size) {
		case "small":
			return `
				max-h-64
				overflow-y-auto
			`		
		case "medium":
			return `
				max-h-[32rem]
				overflow-y-auto
			`		
		case "large":
			return `
				max-h-[56rem]
				overflow-y-auto
			`	
		default:
			return ""	
	}
	
}



const codeStyles = `
	text-sm
`

const titleBarStyles = `
	border-b-[1px]
	border-theme-codeblock-titlebar
`

const tabStyles = `
	font-bold 
	text-sm 
	inline-block 
	px-6 
	py-2
`

const tabStylesActive = `
	border-b-[3px]
`

const copyBarStyles = `
	flex 
	justify-end 
	px-4
	pt-2 
	pb-4
`


export const CodeBlock = ({
	wrap,
	heading,
	size,
	copyToClipboard,
	className,
	children,
	...props
}) => {
	
	const [isCopied, setIsCopied] = useState(false)
	
	const copyTextToClipboard = () => {
		navigator.clipboard.writeText(children)
		setIsCopied(true)
		// Start and clear timer for visible feedback:
		const timer = setTimeout( () => setIsCopied(false), 2000 )
		return () => clearTimeout(timer)
	}
	
	const codeBlockHeading = (
		<div className={`juno-codeblock-titlebar ${titleBarStyles}`}>
			<span className={`juno-codeblock-tab ${tabStyles} ${tabStylesActive}`}>
				{heading}
			</span>
		</div>
	)
	
	const copy = (
		<div className={`juno-codeblock-copybar ${copyBarStyles}`}>
			<span className={`font-bold text-sm mr-4 mt-1`} >{ isCopied ? "Copied!" : "" }</span>
			<Icon icon="contentCopy" onClick={copyTextToClipboard} />
		</div>
	)
	
	return (
		<div className={`juno-codeblock ${codeBlockBaseStyles} ${className}`} {...props} >
			{ heading ? codeBlockHeading : null }
			<pre className={`${codeContainerStyles(wrap)} ${codeContainerSize(size)}`} data-testid="juno-codeblock-pre">
				<code className={`${codeStyles}`} >
					{children}
				</code>
			</pre>
			{ copyToClipboard ? copy : null }
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
	/** Optional title */
	heading: PropTypes.string,
	/** Optional size (height). By default height is unrestricted. If specifying a size the CodeBlock will not grow past the given size and get scrollbars if the content is higher */
	size: PropTypes.oneOf(["auto", "small", "medium", "large"]),
	/** Whether to display a 'Copy to Clipboard' button */
	copyToClipboard: PropTypes.bool,
}

CodeBlock.defaultProps  = {
	wrap: true,
	heading: "",
	size: "auto",
	copyToClipboard: true,
	className: "",
}