import { localInstance } from '../instances'
import { ILoginData } from '@interfaces'
import endpoints from './endpoints'

export const login = (data: ILoginData) => localInstance.post(endpoints.login, data)

export const getPokemons = (limit?: number, offset?: number) => {
  const endpoint = endpoints.pokemons.replace('{{limit}}', `${limit}`).replace('{{offset}}', `${offset}`)
  return localInstance.get(endpoint)
}
