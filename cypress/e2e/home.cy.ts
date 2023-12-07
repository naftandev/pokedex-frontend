describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should exist start button', () => {
    // Check if start button exists
    const startButton = cy.get('.Button__ButtonComponent-sc-1ab2hka-0')
    startButton.should('have.text', 'Catch them now!')
  })

  it('should redirect to login/dashboard page', () => {
    // Click on start button
    let button = cy.get('.Button__ButtonComponent-sc-1ab2hka-0')
    button.click()

    // Check if redirected to login page and login button exits
    button = cy.get('.Button__ButtonComponent-sc-1ab2hka-0')
    button.should('have.text', 'LOGIN')
  })
})
