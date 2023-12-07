export interface ILoginFormProps {
  isLoading?: boolean
  onClick: (data: ILoginFields) => void
}

export type TLoginFields = 'email' | 'password'

export interface ILoginFields {
  email: string
  password: string
}
