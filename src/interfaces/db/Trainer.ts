export interface ITrainerData {
  id: number
  email: string
  password: string
  avatar: string
  name: string
  lastname: string
  gender: TTrainerGender
  region: string
  town: string
  captured: number
}

type TTrainerGender = 'Male' | 'Female'
