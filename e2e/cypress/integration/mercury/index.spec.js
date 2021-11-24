describe("mercury", () => {
  it("api is reachable", () => {
    cy.request("/").should((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
