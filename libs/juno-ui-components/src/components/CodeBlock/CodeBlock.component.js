import React from "react"
import PropTypes from "prop-types"
import { Code } from "../Code/index.js"
import { Icon } from "../Icon/index.js"

const preStyles = (wrap) => {
  return `
    jn-bg-theme-code-block
    jn-rounded
    jn-p-6
    ${wrap ? "jn-break-words jn-break-all jn-whitespace-pre-wrap" : "jn-overflow-x-auto"}
  `
}

const sizeStyles = (size) => {
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
      return ``
  }
}

/**  */
export const CodeBlock = ({
  content,
  children,
  wrap,
  size,
  copy, // TODO
  lang, // TODO: JSON View
  className,
  ...props
}) => {
  return (
    <pre 
      className={`juno-code-block ${ lang ? `juno-code-block-lang-${lang}` : "" } ${preStyles(wrap)} ${sizeStyles(size)} ${className}`}
      data-lang={lang}
      {...props}
    >
      <Code>
        { content || children }
      </Code>
    </pre>
  )
}

CodeBlock.propTypes = {
  content: PropTypes.string,
  children: PropTypes.node,
  wrap: PropTypes.bool,
  size: PropTypes.oneOf(["auto", "small", "medium", "large"]),
  copy: PropTypes.bool,
  lang: PropTypes.string,
  className: PropTypes.string,
}

CodeBlock.defaultProps = {
  content: "",
  children: null,
  wrap: true,
  size: "auto",
  copy: true,
  lang: "",
  className: "",
}