import { ITrainerData, ISignupData, ILoginFields } from '@interfaces'

export interface IAuthStore {
  trainer?: ITrainerData
  signup: (value: ISignupData) => Promise<void>,
  login: (value: ILoginFields) => Promise<void>,
  logout: () => void
}
