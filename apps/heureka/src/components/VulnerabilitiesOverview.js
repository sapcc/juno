import React from "react"
import { Icon, Badge } from "juno-ui-components"

const badgeCss = `
  mr-2
`

const badgeContainerCss = `
  flex
  items-center
  min-w-[2.3rem]
`

const vulnerabilityText = `
  text-center
  w-full
`

const VulnerabilitiesOverview = ({ vulnerabilities }) => {
  return (
    <div className="flex">
      <Badge className={badgeCss}>
        <div className={badgeContainerCss}>
          <div className="flex">
            <Icon className="mr-1" size="16" icon="severityLow" />
          </div>
          <span className={vulnerabilityText}>{vulnerabilities.low}</span>
        </div>
      </Badge>
      <Badge variant="warning" className={badgeCss}>
        <div className={badgeContainerCss}>
          <div className="flex">
            <Icon className="mr-1" size="16" icon="severityMedium" />
          </div>
          <span className={vulnerabilityText}>{vulnerabilities.medium}</span>
        </div>
      </Badge>
      <Badge variant="danger" className={badgeCss}>
        <div className={badgeContainerCss}>
          <div className="flex">
            <Icon className="mr-1" size="16" icon="severityHigh" />
          </div>
          <span className={vulnerabilityText}>{vulnerabilities.high}</span>
        </div>
      </Badge>
      <Badge variant="critical" className={badgeCss}>
        <div className={badgeContainerCss}>
          <div className="flex">
            <Icon className="mr-1" size="16" icon="severityCritical" />
          </div>
          <span className={vulnerabilityText}>{vulnerabilities.critical}</span>
        </div>
      </Badge>
    </div>
  )
}

export default VulnerabilitiesOverview
