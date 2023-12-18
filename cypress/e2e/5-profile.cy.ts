import { APP_URL, credentials } from '../utils'

const login = () => {
  cy.visit(`${APP_URL}/login`)

  // Type email and password
  const emailInput = cy.get('input[name="email"]')
  const passwordInput = cy.get('input[name="password"]')
  emailInput.type(credentials.email)
  passwordInput.type(credentials.password)

  // Click on login button
  const loginBtn = cy.get('button[type="submit"]')
  loginBtn.click()
}

describe('Profile Page', () => {
  beforeEach(() => {
    login()
    cy.wait(1000)
  })

  it('should detect when trainer not exists', () => {
    cy.visit(`${APP_URL}/profile/000000000000000000000000`)

    // Check title
    const title = cy.get('#swal2-html-container')
    title.should('have.text', 'Trainer not found')
  })

  it('should detect when trainer exists', () => {
    // Click on avatar
    const avatar = cy.get('[data-cy="avatar"]')
    avatar.click()

    // Click on profile option
    const profileBtn = cy.get('[data-cy="avatar-menuitem-1"]')
    profileBtn.click()

    // Check title
    const title = cy.get('[data-cy="profile-title"]')
    title.should('have.text', 'Hi, trainer!')
  })

  it('should redirect to dashboard when clicking on header logo', () => {
    cy.visit(`${APP_URL}/profile/000000000000000000000000`)

    cy.get('.swal2-confirm').click()

    // Check profile URL
    cy.url().should('include', '/profile/')

    // Click on header logo
    const headerLogo = cy.get('[data-cy="logo-link"]')
    headerLogo.click()

    // Check dashboard URL
    cy.url().should('include', '/dashboard')
  })
})
