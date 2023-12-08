import { render, screen } from '@testing-library/react'
import { ILogoProps } from '@interfaces'
import Logo from '.'

const mockedData: ILogoProps = {
  direction: 'row',
  theme: 'light'
}

const renderLogo = ({ direction, theme }: ILogoProps) => {
  render(<Logo direction={direction} theme={theme} />)
}

describe('<Logo />', () => {
  test('should render', () => {
    renderLogo({ direction: mockedData.direction, theme: mockedData.theme })
    const logoText = screen.getByText(/POKEDEX/)
    expect(logoText).toBeInTheDocument()
  })

  test('should change orientation and theme', () => {
    renderLogo({ direction: 'column', theme: 'dark' })

    const logoContainer = screen.getByRole('group')
    expect(logoContainer).toHaveClass('bDHfYz')

    const logoText = screen.getByText(/POKEDEX/)
    expect(logoText).toHaveClass('ikbZXi')
  })
})
