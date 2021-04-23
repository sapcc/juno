describe("manifest", () => {
  before(() => {
    cy.visit("/")
    cy.request("cdn/manifest.json").as("manifest")
  })

  it("manifest.json is reachable", () => {
    cy.get("@manifest").should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  // auth
  it("contains auth", () => {
    cy.request("cdn/manifest.json").then((response) => {
      expect(response.body).to.have.property("auth")
    })
  })

  it("contains latest version of auth", () => {
    cy.request("cdn/manifest.json").then((response) => {
      expect(response.body.auth.indexOf("0_1_5") >= 0).to.eq(true)
    })
  })

  // designate
  it("contains designate", () => {
    cy.request("cdn/manifest.json").then((response) => {
      expect(response.body).to.have.property("designate")
    })
  })

  // widget-loader
  it("contains widget-loader", () => {
    cy.request("cdn/manifest.json").then((response) => {
      expect(response.body).to.have.property("widget-loader")
    })
  })
})
