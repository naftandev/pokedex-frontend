import  { render, screen } from '@testing-library/react'
import PokemonCard from '.'

const mockedData = {
  picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  order: 35,
  height: 4,
  name: 'Pikachu',
  moves: ['Mega-Punch', 'Pay-Day'],
  stats: [
    { name: 'hp', value: 35 },
    { name: 'attack', value: 55 }
  ],
  abilities: ['Static', 'Lightning-Rod']
}

describe('<PokemonCard />', () => {
  beforeEach(() => {
    render(
      <PokemonCard
        picture={mockedData.picture}
        order={mockedData.order}
        height={mockedData.height}
        name={mockedData.name}
        moves={mockedData.moves}
        stats={mockedData.stats}
        abilities={mockedData.abilities}
      />
    )
  })

  test('should render', () => {
    const name = screen.getByText(/Pikachu/)
    expect(name).toBeInTheDocument()
  })
})
