import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AvatarMenu from '.'

const user = userEvent.setup()

const mockedOptionOnClick = jest.fn()
const mockedData = {
  name: 'Trainer',
  avatar: 'https://static.wikia.nocookie.net/ideas/images/9/9f/Ash_ketchum_render_by_tzblacktd-da9k0wb.png',
  options: [
    { id: 1, label: 'Option 1', onClick: mockedOptionOnClick }
  ]
}

describe('<AvatarMenu />', () => {
  beforeEach(() => {
    render(<AvatarMenu name={mockedData.name} avatar={mockedData.avatar} options={mockedData.options} />)
  })

  test('should render', () => {
    const avatarImg = screen.getByAltText(/Trainer/)
    expect(avatarImg).toBeInTheDocument()
  })

  test('should open options', async () => {
    const avatar = screen.getByRole('button')
    await user.click(avatar)

    const optionsMenu = screen.getByRole('menu')
    expect(optionsMenu).toBeInTheDocument()
  })

  test('should click an option', async () => {
    const avatar = screen.getByRole('button')
    await user.click(avatar)

    const menuItem = screen.getByRole('menuitem')
    await user.click(menuItem)
    expect(mockedOptionOnClick).toHaveBeenCalledTimes(1)
  })
})
