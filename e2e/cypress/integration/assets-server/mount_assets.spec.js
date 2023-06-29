let windowErrorSpy
let windowWarnSpy

Cypress.on("window:before:load", (win) => {
  windowErrorSpy = cy.spy(win.console, "error")
  windowWarnSpy = cy.spy(win.console, "warn")
})

const DELAY = 1000

describe("mount app", () => {
  let apps
  before(() => {
    // navigate to root path
    cy.visit("/")

    // load manifest and get apps
    cy.request("manifest.json").then((response) => {
      let manifest = response.body
      apps = Object.values(manifest)
        .reduce((array, entry) => {
          return array.concat(Object.values(entry))
        }, [])
        .filter((app) => app.type === "app" && app.name !== "assets-overview")
    })
  })

  afterEach(() => {
    cy.wait(DELAY * apps.length).then(() => {
      expect(windowErrorSpy).to.not.be.called
      expect(windowWarnSpy).to.not.be.called
    })
  })

  it("can mount apps without errors", () => {
    apps.forEach(async (app) => {
      let appConf = { name: app.name, version: app.version, props: {} }

      // if (appConf.name === "dashboard") appConf.name = "blablabla"
      if (app.appProps) {
        Object.keys(app.appProps).forEach((key) => {
          if (app.appProps[key]?.type === "required")
            appConf.props[key] = "test"
        })
      }
      cy.log("mount app: " + JSON.stringify(appConf))
      let encodedAppConf = btoa(JSON.stringify(appConf))
      // load module file (index.js)
      cy.request(app.entryFile).should((response) => {
        expect(response.status).to.eq(200)
      })
      cy.visit("/mount-test.html?config=" + encodedAppConf)
      cy.get(`[data-juno-app="${app.name}"]`).should("exist") // check if app is mounted)
      cy.log("\x1b[32mSUCCESS\x1b[37m")
    })
  })
})
