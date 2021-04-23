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

  // widget-loader
  it("contains latest version of auth", () => {
    cy.request("cdn/widget-loader/0_0_1/app.js").then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
