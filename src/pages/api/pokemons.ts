import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosResponse } from 'axios'
import { getPokemonInfo, getPokemonsList } from '@api'
import { Default, IPokemonData, IPokemonInfo } from '@interfaces'

export default async function pokemons(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { limit, offset } = req.query

    try {
      const { data: pokemonsList } = await getPokemonsList(Number(limit), Number(offset))
      const promises = [] as Promise<AxiosResponse<unknown, unknown>>[]
      pokemonsList.results.forEach((pokemon: Default) => promises.push(getPokemonInfo(pokemon.name)))

      const results = await Promise.all(promises)
      const parsedPokemons = parsePokemons(results)

      return res.status(200).json({
        length: pokemonsList.count,
        next: pokemonsList.next,
        prev: pokemonsList.previous,
        data: parsedPokemons
      })
    } catch (error) {
      res.status(500).json({ msg: 'Error to getting pokemons' })
    }
  }

  res.status(400).json({ msg: 'Incorrect request method' })
}

const parsePokemons = (data: AxiosResponse<unknown, unknown>[]) => {
  const pokemons = [] as IPokemonInfo[]

  data.forEach(dataItem => {
    const data = dataItem.data as IPokemonData
    const pokemon = {
      id: data.id,
      picture: data.sprites.front_default || 'https://i.pinimg.com/564x/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.jpg',
      order: data.order,
      height: data.height,
      name: data.name,
      moves: data.moves.map(({ move }) => move.name),
      stats: data.stats.map(({ base_stat, stat }) => ({ name: stat.name, value: base_stat })),
      abilities: data.abilities.map(({ ability }) => ability.name)
    }
    return pokemons.push(pokemon)
  })

  return pokemons
}
