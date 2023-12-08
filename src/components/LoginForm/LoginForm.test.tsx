import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '.'

const user = userEvent.setup()

const mockedOnClick = jest.fn()

describe('Name of the group', () => {
  beforeEach(() => {
    render(<LoginForm onClick={mockedOnClick} />)
  })

  test('should render', () => {
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })

  test('should be required email and password', async () => {
    const loginBtn = screen.getByRole('button', { name: /LOGIN/ })
    await user.click(loginBtn)

    const emailErrorMsg = screen.getByText(/The email is required/)
    const passwordErrorMsg = screen.getByText(/The password is required/)
    expect(emailErrorMsg).toBeInTheDocument()
    expect(passwordErrorMsg).toBeInTheDocument()
  })

  test('should be valid email', async () => {
    const emailInput = screen.getByPlaceholderText('Email')
    await user.type(emailInput, 'me@naftan')

    const loginBtn = screen.getByRole('button', { name: /LOGIN/ })
    await user.click(loginBtn)

    const emailErrorMsg = screen.getByText(/The email is invalid/)
    expect(emailErrorMsg).toBeInTheDocument()
  })

  test('should click on login button', async () => {
    const mock = {
      email: 'test@email.com',
      password: 'SuperSecretPassword!'
    }
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    await user.type(emailInput, mock.email)
    await user.type(passwordInput, mock.password)

    const loginBtn = screen.getByRole('button', { name: /LOGIN/ })
    await user.click(loginBtn)
    expect(mockedOnClick).toHaveBeenCalledWith(mock)
  })
})
