import { render, screen } from '@testing-library/react'
import { IHeaderProps } from '@interfaces'
import Header from '.'

const mockedOptionOnClick = jest.fn()
const mockedData: IHeaderProps = {
  trainer: {
    _id: '000000000000000000000000',
    email: 'test@email.com',
    avatar: 'https://static.wikia.nocookie.net/ideas/images/9/9f/Ash_ketchum_render_by_tzblacktd-da9k0wb.png',
    name: 'Ash',
    lastname: 'Ketchum',
    gender: 'Male',
    region: 'Kanto',
    city: 'Paleta',
    captured: 77
  },
  options: [
    { id: 1, label: 'Option 1', onClick: mockedOptionOnClick }
  ]
}

describe('<Header />', () => {
  beforeEach(() => {
    render(<Header trainer={mockedData.trainer} options={mockedData.options} />)
  })

  test('should render', () => {
    const header = screen.getByText(/Welcome/)
    expect(header).toBeInTheDocument()
  })
})
