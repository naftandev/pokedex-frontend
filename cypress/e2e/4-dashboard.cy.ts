import { APP_URL, credentials } from '../utils'

const delay = 1000

const login = () => {
  // Type email and password
  const emailInput = cy.get('input[name="email"]')
  const passwordInput = cy.get('input[name="password"]')
  emailInput.type(credentials.email)
  passwordInput.type(credentials.password)

  // Click on login button
  const loginBtn = cy.get('button[type="submit"]')
  loginBtn.click()
}

describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.visit(`${APP_URL}/dashboard`)
  })

  it('should redirect to login page if is not login', () => {
    // Check if button login exists
    const loginBtn = cy.get('button[type="submit"]')
    loginBtn.should('have.text', 'LOG IN')
  })

  it('should redirect to dashboard page when login', () => {
    login()
    cy.wait(delay)

    // Check welcome message
    const welcomeMsg = cy.get('[data-cy="header-trainer-name"]')
    welcomeMsg.should('contain.text', 'Welcome')
  })

  it('should load firt page with 10 pokemons', () => {
    login()
    cy.wait(delay)

    // Count the pokemon cards
    const pokemonsContainer = cy.get('[data-cy="cards-container"]')
    pokemonsContainer.find('[data-cy="pokemon-card"]').should('have.length', 10)
  })

  it('should have 10 navigation buttons', () => {
    login()
    cy.wait(delay)

    // Count the navigation buttons
    const pagination = cy.get('[data-cy="pagination-navigation"]')
    pagination.find('[data-cy="page-btn"]').should('have.length', 10)
  })

  it('should start in page 1', () => {
    login()
    cy.wait(delay)

    // Check if is selected the first page
    const pagination = cy.get('[data-cy="pagination-navigation"]')
    const firstPaginationBtn = pagination.find('[data-cy="page-btn"]').first()
    firstPaginationBtn.should('have.attr', 'aria-current', 'true')
  })

  it('should be able to click another navigation button', () => {
    login()
    cy.wait(delay)

    // Click on navigation button
    const pagination = cy.get('[data-cy="pagination-navigation"]')
    const paginationBtn = pagination.find('[data-cy="page-btn"]').eq(3)  // Button 4
    paginationBtn.click()

    // Check if clicked navigation button is active
    paginationBtn.should('have.attr', 'aria-current', 'true')
  })

  it('should be able to click the right navigation button', () => {
    login()
    cy.wait(delay)

    // Check if is selected the first page
    let pagination = cy.get('[data-cy="pagination-navigation"]')
    let paginationBtn = pagination.find('[data-cy="page-btn"]').first()
    paginationBtn.should('have.attr', 'aria-current', 'true')

    // Click on right nagivation button
    const rightPaginationBtn = cy.get('[data-cy="next-btn"]')
    rightPaginationBtn.click()

    // Check if the next navigation button is active
    pagination = cy.get('[data-cy="pagination-navigation"]')
    paginationBtn = pagination.find('[data-cy="page-btn"]').eq(1)
    paginationBtn.should('have.attr', 'aria-current', 'true')
  })

  it('should be able to click the left navigation button', () => {
    login()
    cy.wait(delay)

    // Click on right navigation button
    const rightPaginationBtn = cy.get('[data-cy="next-btn"]')
    rightPaginationBtn.click()

    // Check if next navigation button is active
    let pagination = cy.get('[data-cy="pagination-navigation"]')
    let paginationBtn = pagination.find('[data-cy="page-btn"]').eq(1)
    paginationBtn.should('have.attr', 'aria-current', 'true')

    cy.wait(delay)

    // Click on left nevigation button
    const leftPaginationBtn = cy.get('[data-cy="prev-btn"]')
    leftPaginationBtn.click()

    // Check if previous navigation button is active
    pagination = cy.get('[data-cy="pagination-navigation"]')
    paginationBtn = pagination.find('[data-cy="page-btn"]').first()
    paginationBtn.should('have.attr', 'aria-current', 'true')
  })

  it('should open avatar menu', () => {
    login()
    cy.wait(delay)

    // Click on avatar
    const avatar = cy.get('[data-cy="avatar"]')
    avatar.click()

    // Click on profile option
    const profileBtn = cy.get('[data-cy="avatar-menuitem-1"]')
    profileBtn.click()

    // Check if redirected to profile page
    const profileTitle = cy.get('[data-cy="profile-title"]')
    profileTitle.should('have.text', 'Hi, trainer!')
  })

  it('should logout', () => {
    login()
    cy.wait(delay)

    // Click on avatar
    const avatar = cy.get('[data-cy="avatar"]')
    avatar.click()

    // Click on logout option
    const logoutBtn = cy.get('[data-cy="avatar-menuitem-2"]')
    logoutBtn.click()

    // Check if redirected to login page
    const loginBtn = cy.get('button[type="submit"]')
    loginBtn.should('have.text', 'LOG IN')
  })
})
