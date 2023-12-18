import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Selector from '.'

const user = userEvent.setup()

const mockedOnChange = jest.fn()
const mockedData = {
  value: '',
  options: [
    { name: 'Option 1', value: 'option1' }
  ],
  onChange: mockedOnChange
}

const renderSelector = (errorMsg?: string) => render(
  <Selector
    value={mockedData.value}
    options={mockedData.options}
    errorMsg={errorMsg}
    onChange={mockedData.onChange}
  />
)

describe('<Selector />', () => {
  test('should render', () => {
    renderSelector()
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  test('should open options', async () => {
    renderSelector()
    const button = screen.getByRole('button')

    let options = screen.queryByRole('listbox')
    expect(options).not.toBeInTheDocument()

    await user.click(button)

    options = screen.getByRole('listbox')
    expect(options).toBeInTheDocument()
  })

  test('should select an option', async () => {
    renderSelector()
    const button = screen.getByRole('button')
    await user.click(button)

    const option = screen.getAllByRole('option')[0]
    await user.click(option)

    const options = screen.queryByRole('listbox')
    expect(options).not.toBeInTheDocument()
    expect(mockedOnChange).toHaveBeenCalledWith(mockedData.options[0])
  })

  test('should show error message', () => {
    const msg = 'Test error message'
    renderSelector(msg)
    const errorMsg = screen.getByText(msg)
    expect(errorMsg).toBeInTheDocument()
  })
})
