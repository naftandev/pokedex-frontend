import { pokeInstance } from '../instances'

export const getPokemonsList = (limit: number, offset: number) => pokeInstance.get(`/pokemon?limit=${limit}&offset=${offset}`)

export const getPokemonInfo = (name: string) => pokeInstance.get(`/pokemon/${name}`)
