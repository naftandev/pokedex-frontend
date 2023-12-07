import { IUserData, ILoginFields } from '@interfaces'

export interface IAuthStore {
  user?: IUserData
  login: (value: ILoginFields) => Promise<void>,
  logout: () => void
}
