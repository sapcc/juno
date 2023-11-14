const NAV_TYPES = {
  APP: "app",
  MNG: "management",
}

const pluginConfig = {
  id: "",
  name: "",
  displayName: "",
  version: "latest",
  url: null,
  weight: 0,
  navType: NAV_TYPES.APP,
  navigable: true,
  props: {
    id: "",
  },
}

export const createPluginConfig = (config) => {
  // check required attrs
  if (!config?.id || !config?.name) {
    console.warn(
      `[greenhouse]::createPluginConfig: id and name are required. Skipping config: ${config}`
    )
    return null
  }

  // clone default pluginConfig
  const newConfig = { ...pluginConfig }
  // update just known attrs
  Object.keys(newConfig).forEach((key) => {
    // check agains type to update falsy booleans
    if (typeof config?.[key] !== "undefined") newConfig[key] = config?.[key]
  })
  // check displayName
  if (!newConfig?.displayName) newConfig.displayName = newConfig.name
  // update id to the props attr
  newConfig.props = { ...newConfig.props, id: newConfig.id }

  return newConfig
}

const getSortedConfig = (config, navtype) => {
  if (typeof config !== "object" || config === null) return []
  return Object.values(config)
    .filter((a) => a.navigable)
    .filter((a) => a.navType === navtype)
    .sort((a, b) => {
      // sort by weight, then by name
      // if weight is not defined, app is sorted to the end
      const w1 = a.weight === undefined ? Infinity : a.weight
      const w2 = b.weight === undefined ? Infinity : b.weight
      let weightSort = w1 - w2
      weightSort = weightSort > 0 ? 1 : weightSort < 0 ? -1 : 0
      return weightSort || a.displayName.localeCompare(b.displayName)
    })
}

const Plugin = (store) => {
  return {
    active: () => store((s) => s.apps.active),
    config: () => store((s) => s.apps.config),
    appConfig: () => {
      const config = store((s) => s.apps.config)
      return getSortedConfig(config, NAV_TYPES.APP)
    },
    mngConfig: () => {
      const config = store((s) => s.apps.config)
      return getSortedConfig(config, NAV_TYPES.MNG)
    },
    isFetching: () => store((s) => s.apps.isFetching),
    error: () => store((s) => s.apps.error),
    updatedAt: () => store((s) => s.apps.updatedAt),
    actions: () => store((s) => s.apps.actions),
    navTypes: NAV_TYPES,
  }
}

export default Plugin
