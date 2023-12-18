import { APP_URL } from '../utils'

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit(APP_URL)
  })

  it('should exist start button', () => {
    // Check if start button exists
    const startButton = cy.get('button[type="button"]')
    startButton.should('have.text', 'Catch them now!')
  })

  it('should redirect to login/dashboard page', () => {
    // Click on start button
    let button = cy.get('button[type="button"]')
    button.click()

    // Check if redirected to login page and login button exits
    button = cy.get('button[type="submit"]')
    button.should('have.text', 'LOG IN')
  })
})
