describe("Landing page", () => {
  before(() => {
    cy.visit("/")
  })

  it("loads content", () => {
    // content is loaded if children of root element exists.
    // children are built by
    cy.get('[data-juno-app="dashboard"]')
      .get('[data-shadow-host="true"]')
      .shadow("div")
      .children()
      .should("exist")
  })

  it("contains login button", () => {
    cy.contains("button", "Log in")
  })

  it("contains regions title", () => {
    cy.contains("Converged Cloud")
  })
})
