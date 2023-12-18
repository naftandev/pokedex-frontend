import React, { FC, ReactElement, useState } from 'react'
import { IUsePaginationParams } from '@interfaces'

const usePagination: FC<IUsePaginationParams> = ({ currentPage, maxPages, Component, setPage, isDisabled }) => {
  const [section, setSection] = useState(1)
  const BUTTONS_LIMIT = maxPages >= 10 ? 10 : maxPages

  const buttons = [] as ReactElement[]
  const pagesInit = (section === 1 ? section : (section - 1) * BUTTONS_LIMIT) - (currentPage < BUTTONS_LIMIT ? 0 : 1)
  const pagesLimit = BUTTONS_LIMIT * section

  if (currentPage < maxPages && currentPage >= pagesLimit) setSection(prevState => ++prevState)
  if (section > 1 && currentPage <= pagesInit) setSection(prevState => --prevState)

  for (let index = pagesInit; index <= pagesLimit; index++) {
    const pageNumber = (section === 1 ? index < pagesLimit : ![pagesInit, pagesLimit].includes(index))
      ? index
      : '...'

    const isCurrent = pageNumber === currentPage

    buttons.push(
      <Component
        key={index}
        data-cy='page-btn'
        aria-current={isCurrent}
        $current={isCurrent}
        onClick={() => typeof pageNumber === 'number' && !isDisabled && setPage(pageNumber)}
      >
        {pageNumber}
      </Component>
    )
  }

  return buttons
}

export default usePagination
