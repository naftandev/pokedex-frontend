import { ISignupData } from '@interfaces'

export interface ISignupFormProps {
  isLoading?: boolean
  onSubmit: (data: ISignupData) => void
}

export type TSignupFields = 'name' | 'lastname' | 'email' | 'password' | 'confirmPassword' | 'gender' | 'region' | 'city'

export interface ISignupFields extends ISignupData {
  confirmPassword: string
}

export type TGender = 'Male' | 'Female'
