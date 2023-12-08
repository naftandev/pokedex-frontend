export interface IButtonProps {
  type: TButtonType
  text: string
  isLoading?: boolean
  onClick?: () => void
}

export type TButtonType = 'button' | 'reset' | 'submit'
