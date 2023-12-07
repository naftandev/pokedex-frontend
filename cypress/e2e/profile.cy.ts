describe('Profile Page', () => {
  const login = () => {
    const email = 'me@naftan.dev'
    const password = 'SuperSecretPassword!'
    cy.visit('http://localhost:3000/login')

    // Type email and password
    const emailInput = cy.get('input[type=email]')
    const passwordInput = cy.get('input[type=password]')
    emailInput.type(email)
    passwordInput.type(password)

    // Click on login button
    const loginBtn = cy.get('button[type=submit]')
    loginBtn.click()
  }

  beforeEach(() => {
    login()
    cy.wait(1000)
  })

  it('should detect when trainer not exists', () => {
    cy.visit('http://localhost:3000/profile/2')

    // Check title
    const title = cy.get('.id__Title-sc-28d1ww-2')
    title.should('have.text', 'Trainer not found')
  })

  it('should detect when trainer exists', () => {
    // Click on avatar
    const avatar = cy.get('.AvatarMenu__Avatar-sc-17mkgd5-2')
    avatar.click()

    // Click on profile option
    const profileBtn = cy.get(':nth-child(1) > .AvatarMenu__MenuItemText-sc-17mkgd5-5')
    profileBtn.click()

    // Check title
    const title = cy.get('.id__Title-sc-28d1ww-2')
    title.should('have.text', 'Hi, trainer!')
  })

  it('should redirect to dashboard when clicking on header logo', () => {
    cy.visit('http://localhost:3000/profile/2')

    // Check profile URL
    cy.url().should('include', '/profile/')

    // Click on header logo
    const headerLogo = cy.get('.Pokeball__IconContainer-sc-1ot8lhx-0')
    headerLogo.click()

    // Check dashboard URL
    cy.url().should('include', '/dashboard')
  })
})
