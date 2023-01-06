describe("manifest", () => {
  before(() => {
    cy.visit("/")
    cy.request("manifest.json").as("manifest")
  })

  it("manifest.json is reachable", () => {
    cy.get("@manifest").should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  describe("assets", () => {
    const assets = {
      app: [
        "assets-overview",
        "dashboard",
        "exampleapp",
        "heureka",
        "maintenance",
        "requests",
        "volta",
        "whois",
        "widget-loader",
      ],
      lib: [
        "communicator",
        "juno-ui-components",
        "oauth",
        "policy-engine",
        "url-state-provider",
        "url-state-router",
      ],
    }

    for (let assetType in assets) {
      for (let asset of assets[assetType]) {
        // contains latest assets
        it(`contains ${asset}@latest`, () => {
          cy.request("manifest.json").then((response) => {
            expect(response.body)
              .to.have.property(asset)
              .to.have.property("latest")
          })
        })
        it(`entry file is reachable`, () => {
          cy.request("manifest.json").then((response) => {
            const json = response.body
            const entryFile = json[asset]["latest"]["entryFile"]
            cy.request(entryFile).should((response) => {
              expect(response.status).to.eq(200)
            })
          })
        })

        it(`type is ${assetType}`, () => {
          cy.request("manifest.json").then((response) => {
            const json = response.body
            expect(json[asset]["latest"]["type"]).equal(assetType)
          })
        })
      }
    }
  })
})
