import { ITrainerData } from '@interfaces'

export interface IHeaderProps {
  trainer: ITrainerData
  options: IHeaderOptions[]
}

interface IHeaderOptions {
  id: number
  label: string
  onClick: () => void
}
