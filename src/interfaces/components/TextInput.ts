export interface ITextInputProps {
  type: TTextInputType
  placeholder?: string
  value: string
  errorMsg: string
  onChange: (value: string) => void
}

type TTextInputType = 'text' | 'email' | 'password'
