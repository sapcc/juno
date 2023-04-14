export const severityToSemanticName = (severity) => {
  switch (severity) {
    case "critical":
      return "danger"
    case "warning":
      return "warning"
    case "info":
      return "info"
    default:
      return severity
  }
}

export const descriptionParsed = (text) => {
  if (!text) return ""
  // urls in descriptions follow the schema: <URL|URL-NAME>
  // Parse description and replace urls with a-tags
  const regexUrl = /<(http[^>|]+)\|([^>]+)>/g
  const urlParsed = text.replace(regexUrl, `<a href="$1">$2</a>`)

  // replace text wrapped in *..* by strong tags
  const regexBold = /\*(.*)\*/g
  const boldParsed = urlParsed.replace(regexBold, `<strong>$1</strong>`)

  const regexCode = /`(.*)`/g
  return boldParsed.replace(regexCode, `<code class="inline-code">$1</code>`)
}

// count alerts and create a map
// {
//   global: { total: number, critical: number, ...},
//   regions: {
//     "eu-de-1": { total: number, critical: {total: number, suppressed: number}, warning: {...}, ...}
//   }, ...
// }
export const countAlerts = (alerts) => {
  const counts = { global: { total: 0 }, regions: {} }

  if (!alerts || alerts.length === 0) return counts

  // run through each alert once and adjust different types of counts as necessary
  alerts.forEach((alert) => {
    // total number of alerts
    counts.global.total += 1
    
    const region = alert.labels?.region
    const severity = alert.labels?.severity
    const state = alert.status?.state

    // global count per severity
    counts.global[severity] = counts.global[severity] || 0 // init
    counts.global[severity] += 1

    // count per region and severity
    counts.regions[region] = counts.regions[region] || {} // init
    counts.regions[region].total = counts.regions[region].total || 0 // init
    counts.regions[region].total += 1

    // total count per region and severity
    counts.regions[region][severity] = counts.regions[region][severity] || {} // init
    counts.regions[region][severity]["total"] = counts.regions[region][severity]?.total || 0 // init
    counts.regions[region][severity]["total"] += 1
    // suppressed per region and severity
    if (state === "suppressed" ) {
      counts.regions[region][severity].suppressed = counts.regions[region][severity]?.suppressed || 0 // init
      counts.regions[region][severity].suppressed += 1
    }

  })

  return counts
}
