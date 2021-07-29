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
        {content.floatingIP && 
          <div className="font-bold">{content.floatingIP}</div>
        }
        {(content.domainName || content.projectName) &&
          <div className="text-theme-disabled">{content.domainName} / {content.projectName}</div>
        }
        {content.region && 
          <div className="text-theme-disabled">{content.region}</div>
        }
      </div>
      <div className={`${rightColumn} p-6 bg-juno-grey-blue-4`}>
        <div className={resultStyles(isExpanded)}>
          <ReactJson 
            src={content}
            iconStyle="square"
            collapsed={3}
            theme={{
              base00: "#1F262D", //bg
              base01: "#292F36", //?
              base02: "#bbb", //Striche und boxen
              base03: "#969696",
              base04: "#969696",
              base05: "#DEDFE0",
              base06: "red",
              base07: "#DEDFE0",
              base08: "#1F262D", //NULL
              base09: "#268FA7",
              base0A: "#1F262D", //NaN
              base0B: "#268FA7", //float -2.757
              base0C: "#F3BC3A", // 0-2
              base0D: "#F3BC3A", //icon
              base0E: "#268FA7", // true/false
              base0F: "#268FA7" // value 0-2
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