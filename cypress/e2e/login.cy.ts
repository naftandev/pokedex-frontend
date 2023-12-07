describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('should be email and password required', () => {
    // Click on login button
    const loginBtn = cy.get('button[type="submit"]')
    loginBtn.click()

    // Check email error message
    let errorMsg = cy.get(':nth-child(1) > p')
    errorMsg.should('have.text', 'The email is required')

    // Check password error message
    errorMsg = cy.get(':nth-child(2) > p')
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
    const errorMsg = cy.get(':nth-child(1) > p')
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

    // Click on clean buttons
    const emailCleanBtn = cy.get(':nth-child(1) > .TextInput__InputContainer-sc-1s3o8e1-1 > .TextInput__IconContainer-sc-1s3o8e1-3 > .TextInput__Icon-sc-1s3o8e1-4')
    emailCleanBtn.click()
    const passwordCleanBtn = cy.get(':nth-child(3) > .TextInput__Icon-sc-1s3o8e1-4')
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
    const viewPasswordBtn = cy.get(':nth-child(2) > .TextInput__Icon-sc-1s3o8e1-4')
    viewPasswordBtn.click()

    // Check if type changed to text
    passwordInput = cy.get('input[type=text]')
    passwordInput.should('exist')
  })

  it('should be correct email and password', () => {
    const email = 'me@naftan.dev'
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
    const email = 'me@naftan.dev'
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
    const welcomeMsg = cy.get('.Header__UserName-sc-8l6c1k-2')
    welcomeMsg.should('contain.text', 'Welcome')
  })
})
