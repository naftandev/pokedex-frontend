import { ITrainerData } from '@interfaces'

export interface IHeaderProps {
  user: ITrainerData
  options: IHeaderOptions[]
}

interface IHeaderOptions {
  id: number
  label: string
  onClick: () => void
}
