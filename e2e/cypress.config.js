const { defineConfig } = require("cypress")
const { cloudPlugin } = require("cypress-cloud/plugin")

module.exports = defineConfig({
  // projectId: "juno",
  defaultCommandTimeout: 30000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  includeShadowDom: true,
  chromeWebSecurity: false,

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message)

          return null
        },
      })
      return cloudPlugin(on, config)
    },
    supportFile: "cypress/support/index.js", // Path to file to load before spec files load. This file is compiled and bundled. (Pass false to disable)
    specPattern: "cypress/integration/**/*.{js,jsx}", // A String or Array of glob patterns of the test files to load.
  },
})
