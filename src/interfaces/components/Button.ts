export interface IButtonProps {
  type: TButtonType
  text: string
  isLoading?: boolean
  onClick?: () => void
}

type TButtonType = 'button' | 'reset' | 'submit'
