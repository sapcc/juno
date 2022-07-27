import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const codeBlockBaseStyles = `
	jn-bg-theme-code-block
	jn-rounded
`

const codeContainerStyles = (wrap) => {	

	return `
		jn-p-6
		${wrap ? "jn-break-words jn-break-all jn-whitespace-pre-wrap" : "jn-overflow-x-auto"}
	`
}

const codeContainerSize = (size) => {	

	switch(size) {
		case "small":
			return `
				jn-max-h-64
				jn-overflow-y-auto
			`		
		case "medium":
			return `
				jn-max-h-[32rem]
				jn-overflow-y-auto
			`		
		case "large":
			return `
				jn-max-h-[56rem]
				jn-overflow-y-auto
			`	
		default:
			return ""	
	}
	
}



const codeStyles = `
	jn-text-sm
`

const titleBarStyles = `
	jn-border-b-[1px]
	jn-border-theme-codeblock-bar
`

const tabStyles = `
	jn-font-bold 
	jn-text-sm 
	jn-inline-block 
	jn-px-6 
	jn-py-2
`

const tabStylesActive = `
	jn-border-b-[3px]
`

const bottomBarStyles = `
	jn-flex 
	jn-justify-end 
	jn-px-3
	jn-py-2 
	jn-border-t-[1px]
	jn-border-theme-codeblock-bar
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
	
	const timeoutRef = React.useRef(null)
		
  	React.useEffect(() => {
	  return () => clearTimeout(timeoutRef.current) // clear when component is unmounted
    }, [])
	
	const handleCopyClick = () => {
		navigator.clipboard.writeText(children)
		setIsCopied(true)
		clearTimeout(timeoutRef.current) // clear any possibly existing Refs
		timeoutRef.current = setTimeout(() => setIsCopied(false), 1000)
	}
	
	const codeBlockHeading = (
		<div className={`juno-codeblock-titlebar ${titleBarStyles}`}>
			<span className={`juno-codeblock-tab ${tabStyles} ${tabStylesActive}`}>
				{heading}
			</span>
		</div>
	)
	
	const copy = (
		<div className={`juno-codeblock-bottombar ${bottomBarStyles}`}>
			<span className={`jn-font-bold jn-text-sm jn-mr-4 jn-mt-1`} >{ isCopied ? "Copied!" : "" }</span>
			<Icon icon="contentCopy" onClick={handleCopyClick} />
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