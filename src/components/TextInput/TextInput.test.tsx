import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextInput from '.'
import { TTextInputType } from '@interfaces'

const user = userEvent.setup()

const mockedOnChange = jest.fn()
const mockedData = {
  name: 'test',
  placeholder: 'Test placeholder',
  onChange: mockedOnChange
}

const renderTextInput = (type: TTextInputType, value: string, errorMsg?: string) => render(
  <TextInput
    type={type}
    name={mockedData.name}
    placeholder={mockedData.placeholder}
    value={value}
    errorMsg={errorMsg}
    onChange={mockedData.onChange}
  />
)

describe('<TextInput />', () => {
  beforeEach(() => {
    mockedOnChange.mockReset()
  })

  test('should render', () => {
    renderTextInput('text', '')
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  test('should show error message', () => {
    const testErrorMsg = 'Test error message'
    renderTextInput('text', '', testErrorMsg)
    const errorMsg = screen.getByText(testErrorMsg)
    expect(errorMsg).toBeInTheDocument()
  })

  test('should return a value', async () => {
    renderTextInput('text', '')

    const testValue = 'T'
    const input = screen.getByRole('textbox')
    await user.type(input, testValue)
    expect(mockedOnChange).toHaveBeenLastCalledWith(testValue)
    expect(mockedOnChange).toHaveBeenCalledTimes(1)
  })

  test('should show password by changing input type', async () => {
    renderTextInput('password', '')

    const input = screen.getByPlaceholderText(mockedData.placeholder)
    expect(input).toHaveAttribute('type', 'password')

    const viewPasswordBtn = screen.getAllByRole('button')[0]
    await user.click(viewPasswordBtn)
    expect(input).toHaveAttribute('type', 'text')
  })

  test('should clean value clicking on clean button', async () => {
    renderTextInput('text', 'T')

    const cleanBtn = screen.getAllByRole('button')[0]
    await user.click(cleanBtn)
    expect(mockedOnChange).toHaveBeenLastCalledWith('')
    expect(mockedOnChange).toHaveBeenCalledTimes(1)
  })
})
