import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '.'

const user = userEvent.setup()

const mockedSetPage = jest.fn()
const mockedData = {
  total: 100,
  max: 10,
  page: 1,
  setPage: mockedSetPage
}

describe('Name of the group', () => {
  beforeEach(() => {
    render(
      <Pagination
        total={mockedData.total}
        max={mockedData.max}
        page={mockedData.page}
        setPage={mockedData.setPage}
      />
    )
  })

  test('should render', () => {
    const navigation = screen.getByRole('navigation')
    expect(navigation).toBeInTheDocument()
  })

  test('should have 10 navigation buttons', () => {
    const navigationBtns = screen.getAllByRole('button')
    expect(navigationBtns).toHaveLength(12) // Include Previous and Next buttons
  })

  test('should start in page 1', () => {
    const currentPageBtn = screen.getByRole('button', { current: true })
    expect(currentPageBtn).toHaveTextContent(/1/)
  })

  test('should be able to click another navigation button', async () => {
    const pageBtn = screen.getAllByRole('button')[3] // Button 3
    await user.click(pageBtn)
    expect(mockedSetPage).toHaveBeenCalledTimes(1)
  })

  test('should be able to click the right navigation button', async () => {
    const prevBtn = screen.getByTitle('Previous')
    await user.click(prevBtn)
    expect(mockedSetPage).toHaveBeenCalledTimes(2)
  })

  test('should be able to click the leeft navigation button', async () => {
    const nextBtn = screen.getByTitle('Next')
    await user.click(nextBtn)
    expect(mockedSetPage).toHaveBeenCalledTimes(3)
  })
})
