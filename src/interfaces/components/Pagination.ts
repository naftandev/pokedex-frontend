export interface IPaginationProps {
  total: number
  max: number
  page: number
  isDisabled?: boolean
  setPage: (value: number) => void
}

export interface IPageButton {
  $current?: 'true' | 'false'
}
