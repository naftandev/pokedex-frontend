import { APP_URL } from '../utils'

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit(`${APP_URL}/login`)
  })

  it('should be email and password required', () => {
    // Click on login button
    const loginBtn = cy.get('button[type="submit"]')
    loginBtn.click()

    // Check email error message
    let errorMsg = cy.get('[data-cy="error-msg-email"]')
    errorMsg.should('have.text', 'The email is required')

    // Check password error message
    errorMsg = cy.get('[data-cy="error-msg-password"]')
    errorMsg.should('have.text', 'The password is required')
  })

  it('should be valid email', () => {
    // Type email and password
    const emailInput = cy.get('input[type=email]')
    const passwordInput = cy.get('input[type=password]')
    emailInput.type('email@invalid')
    passwordInput.type('SecretPassword')

    // Click on login button
    const loginBtn = cy.get('button[type=submit]')
    loginBtn.click()

    // Check email error message
    const errorMsg = cy.get('[data-cy="error-msg-email"]')
    errorMsg.should('have.text', 'The email is invalid')
  })

  it('should be clear values', () => {
    const email = 'test@email.com'
    const password = 'SecretPassword'

    // Type email and password and check if values are not empty
    let emailInput = cy.get('input[type=email]')
    emailInput.type(email)
    emailInput.should('have.value', email)
    let passwordInput = cy.get('input[type=password]')
    passwordInput.type(password)
    passwordInput.should('have.value', password)

    // Click on clean button
    const emailCleanBtn = cy.get('[data-cy="clean-btn-email"]')
    emailCleanBtn.click()
    const passwordCleanBtn = cy.get('[data-cy="clean-btn-password"]')
    passwordCleanBtn.click()

    // Check if values are empty
    emailInput = cy.get('input[type=email]')
    emailInput.should('have.value', '')
    passwordInput = cy.get('input[type=password]')
    passwordInput.should('have.value', '')
  })

  it('should be visible password', () => {
    // Check if password input exist with password type
    let passwordInput = cy.get('input[type=password]')
    passwordInput.type('SecretPassword')
    passwordInput.should('exist')

    // Click on view password button
    const viewPasswordBtn = cy.get('[data-cy="toggle-type-btn"]')
    viewPasswordBtn.click()

    // Check if type changed to text
    passwordInput = cy.get('input[type=text]')
    passwordInput.should('exist')
  })

  it('should be correct email and password', () => {
    const email = 'test@email.com'
    const password = 'SuperSecretPassword'

    // Type email and password
    const emailInput = cy.get('input[type=email]')
    const passwordInput = cy.get('input[type=password]')
    emailInput.type(email)
    passwordInput.type(password)

    // Click on login button
    const loginBtn = cy.get('button[type=submit]')
    loginBtn.click()

    // Check modal error message (from backend)
    const modalErrorText = cy.get('#swal2-html-container')
    modalErrorText.should('have.text', 'The email or password is incorrect')
  })

  it('should login and redirect to dashboard', () => {
    const email = 'test@email.com'
    const password = 'SuperSecretPassword!'

    // Type email and password
    const emailInput = cy.get('input[type=email]')
    const passwordInput = cy.get('input[type=password]')
    emailInput.type(email)
    passwordInput.type(password)

    // Click on login button
    const loginBtn = cy.get('button[type=submit]')
    loginBtn.click()

    // Check welcome message from dashboard
    const welcomeMsg = cy.get('[data-cy="header-user-name"]')
    welcomeMsg.should('contain.text', 'Welcome')
  })
})
