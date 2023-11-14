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

const filterAndSortConfigByType = (config, navtype) => {
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

// if no active app already set will set the app (no mng apps) with the lowest weight
const findActiveAppId = (appConfig) => {
  if (!appConfig || appConfig.length === 0) return null

  // if there is no active app, then from appsConfig, get the app id of the app with the lowest weight and set it as active
  const minWeightApp = appConfig.reduce((previous, current) => {
    return current.weight < previous.weight ? current : previous
  })

  return [minWeightApp.id]
}

const Plugin = (store) => {
  return {
    active: () => store((s) => s.apps.active),
    config: () => store((s) => s.apps.config),
    appConfig: () => store((s) => s.apps.appConfig),
    mngConfig: () => store((s) => s.apps.mngConfig),
    isFetching: () => store((s) => s.apps.isFetching),
    error: () => store((s) => s.apps.error),
    updatedAt: () => store((s) => s.apps.updatedAt),
    actions: () => store((s) => s.apps.actions),
    saveConfig: () => {
      const saveConfig = store((s) => s.apps.actions.receiveConfig)
      const saveAppConfig = store((s) => s.apps.actions.setAppConfig)
      const saveMngConfig = store((s) => s.apps.actions.setMngConfig)
      const setActive = store((s) => s.apps.actions.setActive)
      const activeApps = store((s) => s.apps.active)
      return (config) => {
        // save all configs
        saveConfig(config)
        // save configs splitted in mng and apps
        const appConfig = filterAndSortConfigByType(config, NAV_TYPES.APP)
        saveAppConfig(appConfig)
        saveMngConfig(filterAndSortConfigByType(config, NAV_TYPES.MNG))
        // if no config found in the active apps set a new one but from the apps and not mng
        if (
          Object.keys(config).filter((key) => activeApps.includes(key))
            .length === 0
        ) {
          const newActiveApp = findActiveAppId(appConfig)
          setActive(newActiveApp)
        }
      }
    },
    navTypes: NAV_TYPES,
  }
}

export default Plugin
