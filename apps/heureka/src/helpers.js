export const parseError = (error) => {
  if (!error || (typeof error === "object" && Object.keys(error).length === 0))
    return "An error occurred. There is no further information"
  let errMsg = JSON.stringify(error)
  if (error?.message) {
    errMsg = error?.message
    try {
      errMsg = JSON.parse(error?.message).msg
    } catch (error) {}
  }
  return errMsg
}

export const usersListToString = (users) => {
  if (!users) users = []
  if (!Array.isArray(users)) users = [users]

  return users.map((user) => user.Name).join(", ")
}

const THREAD_LEVEL_LOW = "low"
const THREAD_LEVEL_MEDIUM = "medium"
const THREAD_LEVEL_HIGH = "high"
const THREAD_LEVEL_CRITICAL = "critical"

export const classifyVulnerabilities = (components = []) => {
  if (!components) components = []
  if (!Array.isArray(components)) components = [components]

  let severities = { low: 0, medium: 0, high: 0, critical: 0 }
  components.forEach((component) => {
    // collect vulnerabilities from one component
    if (component?.Vulnerabilities) {
      const vulnerabilites = component?.Vulnerabilities
      vulnerabilites.forEach((vulnerability) => {
        // use of ThreatLevelOverall to get the index
        switch (vulnerability?.ThreatLevelOverall.toLowerCase()) {
          case THREAD_LEVEL_LOW:
            return (severities.low += 1)
          case THREAD_LEVEL_MEDIUM:
            return (severities.medium += 1)
          case THREAD_LEVEL_HIGH:
            return (severities.high += 1)
          case THREAD_LEVEL_CRITICAL:
            return (severities.critical += 1)
        }
      })
    }
  })
  return severities
}

export const COMPONENT_TYPE_KEPPEL = "KeppelImage"

export const componentTypes = () => {
  return [COMPONENT_TYPE_KEPPEL]
}

export const componentDetailsByType = (componentType) => {
  let detailKeys = []
  switch (componentType) {
    case COMPONENT_TYPE_KEPPEL:
      detailKeys = [
        { key: "PushedAt", label: "Version" },
        { key: "Maintainer", label: "Maintainer" },
        { key: "Region", label: "Region" },
        { key: "SourceRepository", label: "Source Repository" },
      ]
    default:
  }
  return detailKeys
}

export const componentVersionByType = (componentType) => {
  let versionKey = ""
  switch (componentType) {
    case COMPONENT_TYPE_KEPPEL:
      versionKey = "PushedAt"
    default:
  }
  return versionKey
}
