import { DateTime } from "luxon"

export const parseError = (error) => {
  if (!error || (typeof error === "object" && Object.keys(error).length === 0))
    return "An error occurred. There is no further information"
  let errMsg = JSON.stringify(error)
  if (error?.message) {
    errMsg = error?.message
    try {
      const msgJson = JSON.parse(error?.message)
      if (msgJson.error) errMsg = msgJson.error
      if (msgJson.msg) errMsg = msgJson.msg
    } catch (error) {}
  }
  return errMsg
}

export const usersListToString = (users) => {
  if (!users) users = []
  if (!Array.isArray(users)) users = [users]

  return users.map((user) => user.Name).join(", ")
}

export const THREAD_LEVEL_LOW = "low"
export const THREAD_LEVEL_MEDIUM = "medium"
export const THREAD_LEVEL_HIGH = "high"
export const THREAD_LEVEL_CRITICAL = "critical"

export const threadLevelToWeight = (level) => {
  switch (level.toLowerCase()) {
    case THREAD_LEVEL_LOW:
      return 3
    case THREAD_LEVEL_MEDIUM:
      return 5
    case THREAD_LEVEL_HIGH:
      return 8
    case THREAD_LEVEL_CRITICAL:
      return 10
  }
}

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

export const componentDetailsByType = (component) => {
  let detailKeys = []
  switch (component.Type) {
    case COMPONENT_TYPE_KEPPEL:
      detailKeys = [
        {
          label: "Version",
          value: componentVersionByType(component),
        },
        {
          label: "Maintainer",
          value: component?.Details?.Maintainer,
        },
        {
          label: "Region",
          value: component?.Details?.Region,
        },
        {
          label: "Source Repository",
          value: component?.Details?.SourceRepository,
        },
      ]
    default:
  }
  return detailKeys
}

export const componentVersionByType = (component) => {
  let version = ""
  switch (component.Type) {
    case COMPONENT_TYPE_KEPPEL:
      if (component?.Details?.PushedAt) {
        version = DateTime.fromSeconds(
          component?.Details?.PushedAt
        ).toLocaleString(DateTime.DATETIME_FULL)
      }
    default:
  }
  return version
}
