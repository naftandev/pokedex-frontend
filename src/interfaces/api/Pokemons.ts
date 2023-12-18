export interface IGetPokemonsResponse {
  data: IPokemonInfo[]
  length: number
}

export interface IPokemonInfo {
  key?: number
  id?: number
  picture: string
  order: number
  height: number
  name: string
  moves: string[]
  stats: IStat[]
  abilities: string[]
}

interface IStat {
  name: string
  value: number
}
