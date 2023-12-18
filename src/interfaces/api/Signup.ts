import { TGender } from '@interfaces'

export interface ISignupData {
  name: string
  lastname: string
  email: string
  password: string
  gender: TGender
  region: string
  city: string
}
