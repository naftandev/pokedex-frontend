import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupForm from '.'

const user = userEvent.setup()

const mockedOnSubmit = jest.fn()

describe('<SignupForm />', () => {
  beforeEach(() => {
    render(<SignupForm onSubmit={mockedOnSubmit} />)
  })

  test('should render', () => {
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })

  test('should be required all fields', async () => {
    const signupBtn = screen.getByRole('button', { name: /SIGN UP/ })
    await user.click(signupBtn)

    const nameErrorMsg = screen.getByText(/The name is required/)
    const lastnameErrorMsg = screen.getByText(/The last name is required/)
    const emailErrorMsg = screen.getByText(/The email is required/)
    const passwordErrorMsg = screen.getByText(/The password is required/)
    const genderErrorMsg = screen.getByText(/The gender is required/)
    const regionErrorMsg = screen.getByText(/The region is required/)
    const cityErrorMsg = screen.getByText(/The city is required/)
    expect(nameErrorMsg).toBeInTheDocument()
    expect(lastnameErrorMsg).toBeInTheDocument()
    expect(emailErrorMsg).toBeInTheDocument()
    expect(passwordErrorMsg).toBeInTheDocument()
    expect(genderErrorMsg).toBeInTheDocument()
    expect(regionErrorMsg).toBeInTheDocument()
    expect(cityErrorMsg).toBeInTheDocument()
  })

  test('should be valid email', async () => {
    const emailInput = screen.getByPlaceholderText('Email')
    const signupBtn = screen.getByRole('button', { name: /SIGN UP/ })
    await user.type(emailInput, 'invalid@email')
    await user.click(signupBtn)

    const emailErrorMsg = screen.getByText(/The email is invalid/)
    expect(emailErrorMsg).toBeInTheDocument()
  })

  test('should match passwords', async () => {
    const signupBtn = screen.getByRole('button', { name: /SIGN UP/ })
    await user.click(signupBtn)

    const confirmPasswordErrorMsg = screen.getByText(/The passwords do not match/)
    expect(confirmPasswordErrorMsg).toBeInTheDocument()
  })

  test('should click on signup button', async () => {
    const mock = {
      name: 'Ash',
      lastname: 'Ketchum',
      email: 'ash@pokedex.com',
      password: 'SuperSecretPassword!',
      gender: 'Male',
      region: 'Kanto',
      city: 'Paleta'
    }

    const nameInput = screen.getByPlaceholderText('Name')
    const lastnameInput = screen.getByPlaceholderText('Last name')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password')
    const regionInput = screen.getByPlaceholderText('Region')
    const cityInput = screen.getByPlaceholderText('City')
    await user.type(nameInput, mock.name)
    await user.type(lastnameInput, mock.lastname)
    await user.type(emailInput, mock.email)
    await user.type(passwordInput, mock.password)
    await user.type(confirmPasswordInput, mock.password)
    await user.type(regionInput, mock.region)
    await user.type(cityInput, mock.city)

    const genderSelector = screen.getByRole('button', { name: /Gender/ })
    await user.click(genderSelector)
    const genderOption = screen.getAllByRole('option')[0]
    await user.click(genderOption)

    const signupBtn = screen.getByRole('button', { name: /SIGN UP/ })
    await user.click(signupBtn)

    expect(mockedOnSubmit).toHaveBeenCalledWith(mock)
  })
})
