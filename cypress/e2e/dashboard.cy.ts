describe('Dashboard Page', () => {
  const delay = 1500

  const login = () => {
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
  }

  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard')
  })

  it('should redirect to login page if is not login', () => {
    // Check if button login exists
    const loginBtn = cy.get('button[type=submit]')
    loginBtn.should('have.text', 'LOGIN')
  })

  it('should redirect to dashboard page when login', () => {
    login()

    // Check welcome message
    const welcomeMsg = cy.get('.Header__UserName-sc-8l6c1k-2')
    welcomeMsg.should('contain.text', 'Welcome')
  })

  it('should load firt page with 10 pokemons', () => {
    login()

    // Count the pokemon cards
    const pokemonsContainer = cy.get('.dashboard__CardsContainer-sc-1460e03-1')
    pokemonsContainer.find('.PokemonCard__Container-sc-1gk3ur4-0').should('have.length', 10)
  })

  it('should have 10 navigation buttons', () => {
    login()

    // Count the navigation buttons
    const pagination = cy.get('.Pagination__Navigation-sc-fg1noi-3')
    pagination.find('.Pagination__PageButton-sc-fg1noi-8').should('have.length', 10)
  })

  it('should start in page 1', () => {
    login()

    // Check if is selected the first page
    const pagination = cy.get('.Pagination__Navigation-sc-fg1noi-3')
    const firstPaginationBtn = pagination.find('.Pagination__PageButton-sc-fg1noi-8').first()
    firstPaginationBtn.should('have.class', 'buNKgX')
  })

  it('should be able to click another navigation button', () => {
    login()

    // Click on navigation button
    const pagination = cy.get('.Pagination__Navigation-sc-fg1noi-3')
    const paginationBtn = pagination.find('.Pagination__PageButton-sc-fg1noi-8').eq(3)  // Button 4
    paginationBtn.click()

    // Check if clicked navigation button is active
    paginationBtn.should('have.class', 'buNKgX')
  })

  it('should be able to click the right navigation button', () => {
    login()

    // Check if is selected the first page
    let pagination = cy.get('.Pagination__Navigation-sc-fg1noi-3')
    let paginationBtn = pagination.find('.Pagination__PageButton-sc-fg1noi-8').first()
    paginationBtn.should('have.class', 'buNKgX')

    // Click on right nagivation button
    const rightPaginationBtn = cy.get('.Pagination___StyledNavigationButton2-sc-fg1noi-5')
    rightPaginationBtn.click()

    // Check if the next navigation button is active
    pagination = cy.get('.Pagination__Navigation-sc-fg1noi-3')
    paginationBtn = pagination.find('.Pagination__PageButton-sc-fg1noi-8').eq(1)
    paginationBtn.should('have.class', 'buNKgX')
  })

  it('should be able to click the leeft navigation button', () => {
    login()

    cy.wait(delay)

    // Click on right navigation button
    const rightPaginationBtn = cy.get('.Pagination___StyledNavigationButton2-sc-fg1noi-5')
    rightPaginationBtn.click()

    // Check if next navigation button is active
    let pagination = cy.get('.Pagination__Navigation-sc-fg1noi-3')
    let paginationBtn = pagination.find('.Pagination__PageButton-sc-fg1noi-8').eq(1)
    paginationBtn.should('have.class', 'buNKgX')

    cy.wait(delay)

    // Click on left nevigation button
    const leftPaginationBtn = cy.get('.Pagination___StyledNavigationButton-sc-fg1noi-6')
    leftPaginationBtn.click()

    // Check if previous navigation button is active
    pagination = cy.get('.Pagination__Navigation-sc-fg1noi-3')
    paginationBtn = pagination.find('.Pagination__PageButton-sc-fg1noi-8').first()
    paginationBtn.should('have.class', 'buNKgX')
  })

  it('should open avatar menu', () => {
    login()

    // Click on avatar
    const avatar = cy.get('.AvatarMenu__Avatar-sc-17mkgd5-2')
    avatar.click()

    // Click on profile option
    const profileBtn = cy.get(':nth-child(1) > .AvatarMenu__MenuItemText-sc-17mkgd5-5')
    profileBtn.click()

    // Check if redirected to profile page
    const profileTitle = cy.get('.id__Title-sc-28d1ww-2')
    profileTitle.should('have.text', 'Hi, trainer!')
  })

  it('should logout', () => {
    login()

    // Click on avatar
    const avatar = cy.get('.AvatarMenu__Avatar-sc-17mkgd5-2')
    avatar.click()

    // Click on logout option
    const logoutBtn = cy.get(':nth-child(2) > .AvatarMenu__MenuItemText-sc-17mkgd5-5')
    logoutBtn.click()

    // Check if redirected to login page
    const loginBtn = cy.get('button[type=submit]')
    loginBtn.should('have.text', 'LOGIN')
  })
})
