import React from "react"
import { Icon } from "juno-ui-components"

const vulnerabilityCss = `
  mr-4
`

// Pass the vulnerabilities allready classified. Use of the helper method `classifyVulnerabilities`
const VulnerabilitiesOverview = ({ vulnerabilities }) => {
  return (
    <>
      <div className={vulnerabilityCss}>
        <Icon className="mr-1" color="text-theme-success" icon="severityLow" />
        <span>{vulnerabilities.low}</span>
      </div>
      <div className={vulnerabilityCss}>
        <div>
          <Icon
            className="mr-1"
            color="text-theme-warning"
            icon="severityMedium"
          />
          <span>{vulnerabilities.medium}</span>
        </div>
      </div>
      <div className={vulnerabilityCss}>
        <Icon className="mr-1" color="text-theme-danger" icon="severityHigh" />
        <span>{vulnerabilities.high}</span>
      </div>
      <div>
        <Icon
          className="mr-1"
          color="text-theme-danger"
          icon="severityCritical"
        />
        <span>{vulnerabilities.critical}</span>
      </div>
    </>
  )
}

export default VulnerabilitiesOverview
