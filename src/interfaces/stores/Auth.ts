import { ITrainerData, ILoginFields } from '@interfaces'

export interface IAuthStore {
  user?: ITrainerData
  login: (value: ILoginFields) => Promise<void>,
  logout: () => void
}
