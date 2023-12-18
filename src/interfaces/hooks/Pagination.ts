import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { IStyledComponent } from 'styled-components'
import { Substitute } from 'styled-components/dist/types'
import { IPageButton } from '@interfaces'


export interface IUsePaginationParams {
  maxPages: number
  currentPage: number
  setPage: (value: number) => void
  Component: IStyledComponent<'web', Substitute<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, IPageButton>>
  isDisabled?: boolean
}
