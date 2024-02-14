let windowErrorSpy
let windowWarnSpy

Cypress.on("window:before:load", (win) => {
  windowErrorSpy = cy.spy(win.console, "error")
  windowWarnSpy = cy.spy(win.console, "warn")
})

const DELAY = 1000

const allowedMessagesRegex =
  /^(?!AppShell: The contentHeading prop is obsolete and will be removed in a future version\. In order to render a content heading, use a ContentHeading element as a child in your main content\.$|Please provide a function to get the token$).*/

describe(`Preflight`, () => {
  it(`loads asset and mounts if type is app`, () => {
    const name = Cypress.env("APP_NAME")
    const version = Cypress.env("APP_VERSION")

    cy.log("=== MOUNT TEST for " + name + "@" + version)

    cy.request("/manifest.json").then((response) => {
      let manifest = response.body
      const versions = manifest[name]
      const app = Object.values(versions).find((v) => v.version === version)

      expect(app).to.not.be.undefined
      expect(app).to.have.property("name")
      expect(app.name).to.eq(name)
      cy.request(app.entryFile).should((response) => {
        expect(response.status).to.eq(200)
      })

      if (name === "auth" || app.type !== "app") return

      cy.log("MOUNT")
      let appConf = { name: app.name, version: app.version, props: {} }
      if (app.appProps) {
        // default prop values
        const defaultPropValues = { currentHost: "https://localhost" }

        Object.keys(app.appProps).forEach((key) => {
          if (app.appProps[key]?.type === "required")
            // use default prop vaue or "test"
            appConf.props[key] = defaultPropValues[key] || "test"
        })
      }
      cy.log("mount app: " + JSON.stringify(appConf))
      let encodedAppConf = btoa(JSON.stringify(appConf))

      cy.visit("/mount-test.html?config=" + encodedAppConf)
      cy.wait(DELAY).then(() => {
        cy.get(`[data-juno-app="${app.name}"]`).should("exist") // check if app is mounted)
        cy.wait(DELAY).then(() => {
          expect(windowErrorSpy).to.not.be.called
          expect(windowWarnSpy).to.not.be.calledWithMatch(allowedMessagesRegex)
        })
        cy.log("\x1b[32mSUCCESS\x1b[37m")
      })
    })
  })
})
