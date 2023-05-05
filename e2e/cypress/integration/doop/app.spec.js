describe("doop app", () => {
  it("app is reachable", () => {
    cy.request("/").should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it("loads app content", () => {
    // content is loaded if children of root element exists.
    // children are built by
    cy.visit("/")
    cy.get('[data-juno-app="doop"]')
      .get('[data-shadow-host="true"]')
      .shadow()
      .children()
      .should("exist")
  })
})
