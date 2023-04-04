import PolicyEngine from "./engine"

const init = (config) => new PolicyEngine(config)
export { init as default, PolicyEngine }
