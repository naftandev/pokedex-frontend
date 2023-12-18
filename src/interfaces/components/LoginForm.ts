export interface ILoginFormProps {
  isLoading?: boolean
  onSubmit: (data: ILoginFields) => void
}

export type TLoginFields = 'email' | 'password'

export interface ILoginFields {
  email: string
  password: string
}
