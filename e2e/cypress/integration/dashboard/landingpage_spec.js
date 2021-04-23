describe("Landing page", () => {
  before(() => {
    cy.visit("/")
  })

  it("loads content", () => {
    // content is loaded if children of root element exists.
    // children are built by React
    cy.get("#root").children().should("exist")
  })

  it("contains login button", () => {
    cy.get("button").contains("Login").should("exist")
  })

  it("contains regions title", () => {
    cy.contains("Converged Cloud Regions").should("exist")
  })

  it("contains the world map", () => {
    cy.get("#world-c").should("exist")
  })
})
