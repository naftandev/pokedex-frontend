import { ISignupData, ILoginData } from '@interfaces'
import instance from './instance'
import endpoints from './endpoints'

export const signup = (data: ISignupData) => instance.post(endpoints.signup, data)

export const login = (data: ILoginData) => instance.post(endpoints.login, data)

export const getPokemons = (limit?: number, offset?: number) => {
  const endpoint = endpoints.pokemons.replace('{{limit}}', `${limit}`).replace('{{offset}}', `${offset}`)
  return instance.get(endpoint)
}

export const getTrainer = (id: string) => instance.get(endpoints.trainerById.replace(':id', id))
