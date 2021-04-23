describe("Designate page", () => {
  before(() => {
    cy.visit("/designate")
  })

  it("loads content", () => {
    // content is loaded if children of root element exists.
    // children are built by React
    cy.get("#root").children().should("exist")
  })
})
