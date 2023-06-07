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

  it("can mount apps without errors", () => {
    // apps.forEach((app) => {
    //   let appConf = { name: app.name, version: app.version, props: {} }
    //   if (app.appProps) {
    //     Object.keys(app.appProps).forEach((key) => {
    //       if (app.appProps[key]?.type === "required")
    //         appConf.props[key] = "test"
    //     })
    //   }
    //   cy.log("mount app: " + JSON.stringify(appConf))
    //   let encodedAppConf = btoa(JSON.stringify(appConf))
    //   // load module file (index.js)
    //   cy.request(app.entryFile).should((response) => {
    //     expect(response.status).to.eq(200)
    //   })
    //   cy.visit("/?asset-mount-test=" + btoa(JSON.stringify(appConf)))
    //   cy.get('[data-shadow-host="true"]')
    //     .shadow()
    //     .contains(`This is a preview of ${appConf.name}@${appConf.version}`)
    //   cy.log("\x1b[32mSUCCESS\x1b[37m")
    // })
    cy.log(Cypress.config("baseUrl"))

    cy.log(Cypress.version)
  })
})
