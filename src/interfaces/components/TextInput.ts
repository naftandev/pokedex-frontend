export interface ITextInputProps {
  type: TTextInputType
  placeholder?: string
  value: string
  errorMsg?: string
  onChange: (value: string) => void
}

export type TTextInputType = 'text' | 'email' | 'password'
