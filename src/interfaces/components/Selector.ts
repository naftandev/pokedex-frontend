export interface ISelectorProps {
  value?: string
  placeholder?: string
  options: IOption[]
  errorMsg?: string
  onChange: (value: IOption) => void
}

export interface IOption {
  name: string
  value: string
}

export interface ITextProps {
  $isEmpty?: boolean
}

export interface IIconProps {
  $up?: boolean
}
