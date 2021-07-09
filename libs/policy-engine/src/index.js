const PolicyEngine = require("./engine")

const engineModule = (module.exports = (config) => new PolicyEngine(config))
engineModule.PolicyEngine = PolicyEngine
