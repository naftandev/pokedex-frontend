import { APP_URL, credentials } from '../utils'

const fillAndSendForm = () => {
  // Text inputs
  const nameInput = cy.get('input[name="name"]')
  const lastnameInput = cy.get('input[name="lastname"]')
  const emailInput = cy.get('input[name="email"]')
  const passwordInput = cy.get('input[name="password"]')
  const confirmPasswordInput = cy.get('input[name="confirmPassword"]')
  const regionInput = cy.get('input[name="region"]')
  const cityInput = cy.get('input[name="city"]')
  nameInput.type('Ash')
  lastnameInput.type('Ketchum')
  emailInput.type(credentials.email)
  passwordInput.type(credentials.password)
  confirmPasswordInput.type(credentials.password)
  regionInput.type('Kanto')
  cityInput.type('Paleta')

  // Selector
  const genderSelector = cy.get('[data-cy="selector-btn"]')
  genderSelector.click()
  const genderSelectorOption = cy.get('[data-cy="selector-option-male"]')
  genderSelectorOption.click()

  // Click on signup button
  const signupBtn = cy.get('button[type="submit"]')
  signupBtn.click()
}

describe('Sign Up Page', () => {
  beforeEach(() => {
    cy.visit(`${APP_URL}/signup`)
  })

  it('should be all fields required', () => {
    // Click on signup button
    const signupBtn = cy.get('button[type="submit"]')
    signupBtn.click()

    // Check name error message
    let errorMsg = cy.get('[data-cy="error-msg-name"]')
    errorMsg.should('have.text', 'The name is required')

    // Check last name error message
    errorMsg = cy.get('[data-cy="error-msg-lastname"]')
    errorMsg.should('have.text', 'The last name is required')

    // Check email error message
    errorMsg = cy.get('[data-cy="error-msg-email"]')
    errorMsg.should('have.text', 'The email is required')

    // Check password error message
    errorMsg = cy.get('[data-cy="error-msg-password"]')
    errorMsg.should('have.text', 'The password is required')

    // Check gender error message
    errorMsg = cy.get('[data-cy="error-msg-selector"]')
    errorMsg.should('have.text', 'The gender is required')

    // Check region error message
    errorMsg = cy.get('[data-cy="error-msg-region"]')
    errorMsg.should('have.text', 'The region is required')

    // Check city error message
    errorMsg = cy.get('[data-cy="error-msg-city"]')
    errorMsg.should('have.text', 'The city is required')
  })

  it('should be valid email', () => {
    // Type email
    const emailInput = cy.get('input[name="email"]')
    emailInput.type('email@invalid')

    // Click on signup button
    const signupBtn = cy.get('button[type="submit"]')
    signupBtn.click()

    // Check email error message
    const errorMsg = cy.get('[data-cy="error-msg-email"]')
    errorMsg.should('have.text', 'The email is invalid')
  })

  it('should be match passwords', () => {
    // Click on signup button
    const signupBtn = cy.get('button[type="submit"]')
    signupBtn.click()

    // Check confirm password error message
    const errorMsg = cy.get('[data-cy="error-msg-confirmPassword"]')
    errorMsg.should('have.text', 'The passwords do not match')
  })

  it('should signup and redirect to dashboard', () => {
    fillAndSendForm()

    cy.wait(1000)

    // Check welcome message from dashboard
    const welcomeMsg = cy.get('[data-cy="header-trainer-name"]')
    welcomeMsg.should('contain.text', 'Welcome')
  })

  it('should check if email exists', () => {
    fillAndSendForm()

    cy.wait(1000)

    // Check error message
    const errorMsg = cy.get('#swal2-html-container')
    errorMsg.should('have.text', 'The entered email is not available')
  })
})
