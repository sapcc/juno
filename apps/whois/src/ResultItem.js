import React, { useState } from "react"
import ReactJson from 'react-json-view'
import { Icon, Stack } from "juno-ui-components"

const leftColumn = `
  w-1/6
`

const rightColumn = `
  w-5/6
`

const resultStyles = (isExpanded) => {
  return (
    `
    overflow-hidden
    transition-max-height
    duration-700
    ease-in-out

    ${isExpanded ? `
      max-h-full
    ` : `
      max-h-96
      fade
    `}
    `
  )
}

const ResultItem = ({ content, expand }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  React.useEffect(() => {
    setIsExpanded(expand)
  }, [expand])

  return (
    <Stack>
      <div className={leftColumn}>
        {content.floatingIP ? 
          <div className="font-bold">{content.floatingIP}</div>
        :
          content.fixedIP &&
            <div className="font-bold">{content.fixedIP}</div>
        }
        {(content.domainName || content.projectName) &&
          <div className="text-theme-disabled">{content.domainName} / {content.projectName}</div>
        }
        {content.region && 
          <div className="text-theme-disabled">{content.region}</div>
        }
      </div>
      <div className={`${rightColumn} p-6 bg-juno-grey-blue-4`}>
        { isExpanded &&
          <Stack gap={3} className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="ml-auto">{isExpanded ? "Collapse" : "Expand"} result </div>
            <Icon icon={isExpanded ? "expandLess" : "expandMore"} />
          </Stack>
        }

        <div className={resultStyles(isExpanded)}>
          <ReactJson 
            src={content}
            iconStyle="square"
            collapsed={3}
            theme={{
              base00: "var(--color-syntax-highlight-base00)", //bg
              base01: "var(--color-syntax-highlight-base01)", //?
              base02: "var(--color-syntax-highlight-base02)", //lines and boxes
              base03: "var(--color-syntax-highlight-base03)",
              base04: "var(--color-syntax-highlight-base04)",
              base05: "var(--color-syntax-highlight-base05)",
              base06: "var(--color-syntax-highlight-base06)",
              base07: "var(--color-syntax-highlight-base07)",
              base08: "var(--color-syntax-highlight-base08)", // NULL
              base09: "var(--color-syntax-highlight-base09)", // String value
              base0A: "var(--color-syntax-highlight-base0A)", // NaN
              base0B: "var(--color-syntax-highlight-base0B)", // float value
              base0C: "var(--color-syntax-highlight-base0C)", // index
              base0D: "var(--color-syntax-highlight-base0D)", // expanded icon
              base0E: "var(--color-syntax-highlight-base0E)", // bool + collapsed icon
              base0F: "var(--color-syntax-highlight-base0F)" // integer value
            }}
          />
        </div>

        <Stack gap={3} className="cursor-pointer mt-4" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="ml-auto">{isExpanded ? "Collapse" : "Expand"} result </div>
          <Icon icon={isExpanded ? "expandLess" : "expandMore"} />
        </Stack>
          
      </div>
    </Stack>
  )
}

export default ResultItem