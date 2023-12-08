import { render, screen } from '@testing-library/react'
import Spinner from '.'

describe('<Spinner />', () => {
  test('should render', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })
})
