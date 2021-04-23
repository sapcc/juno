describe("apps", () => {
  before(() => {
    cy.visit("/")
  })

  // auth
  it("auth is reachable", () => {
    cy.request("cdn/auth/0_1_5/widget.js").should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  // designate
  it("auth is reachable", () => {
    cy.request("cdn/designate/0_0_1/widget.js").should((response) => {
      expect(response.status).to.eq(200)
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
