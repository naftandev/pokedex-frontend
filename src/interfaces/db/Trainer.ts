export interface ITrainerData {
  _id: string
  email: string
  avatar: string
  name: string
  lastname: string
  gender: TTrainerGender
  region: string
  city: string
  captured: number
}

type TTrainerGender = 'Male' | 'Female'
