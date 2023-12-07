import { IUserData } from '@interfaces'

export interface IHeaderProps {
  user: IUserData
  options: IHeaderOptions[]
}

interface IHeaderOptions {
  id: number
  label: string
  onClick: () => void
}
