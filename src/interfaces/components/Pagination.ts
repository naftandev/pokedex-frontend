export interface IPaginationProps {
  totalResults: number
  maxPages: number
  currentPage: number
  setPage: (value: number) => void
  isDisabled?: boolean
}

export interface IPageButton {
  $current?: boolean
}
