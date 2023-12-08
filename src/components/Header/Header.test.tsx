import { render, screen } from '@testing-library/react'
import { IHeaderProps } from '@interfaces'
import Header from '.'

const mockedOptionOnClick = jest.fn()
const mockedData: IHeaderProps = {
  user: {
    id: 1,
    email: 'test@email.com',
    password: 'SuperSecretPassword!',
    avatar: 'https://static.wikia.nocookie.net/ideas/images/9/9f/Ash_ketchum_render_by_tzblacktd-da9k0wb.png',
    name: 'Ash',
    lastname: 'Ketchum',
    gender: 'Male',
    region: 'Kanto',
    town: 'Paleta',
    captured: 77
  },
  options: [
    { id: 1, label: 'Option 1', onClick: mockedOptionOnClick }
  ]
}

describe('<Header />', () => {
  beforeEach(() => {
    render(<Header user={mockedData.user} options={mockedData.options} />)
  })

  test('should render', () => {
    const header = screen.getByText(/Welcome/)
    expect(header).toBeInTheDocument()
  })
})
