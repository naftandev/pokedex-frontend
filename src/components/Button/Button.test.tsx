import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TButtonType } from '@interfaces'
import Button from '.'

const user = userEvent.setup()

const mockedOnClick = jest.fn()
const mockedData = {
  type: 'button',
  text: 'Button',
  isLoading: false
}

const renderButton = (isLoading?: boolean) => render(
  <Button
    type={mockedData.type as TButtonType}
    text={mockedData.text}
    isLoading={isLoading || mockedData.isLoading}
    onClick={mockedOnClick}
  />
)

describe('<Button />', () => {
  test('should render', () => {
    renderButton()
    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
  })

  test('should contain a text', () => {
    renderButton()
    const btn = screen.getByRole('button')
    expect(btn).toHaveTextContent('Button')
  })

  test('should click', async () => {
    renderButton()
    const btn = screen.getByRole('button')
    await user.click(btn)
    expect(mockedOnClick).toHaveBeenCalledTimes(1)
  })

  test('should appear spinner when is loading', () => {
    renderButton(true)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })
})
