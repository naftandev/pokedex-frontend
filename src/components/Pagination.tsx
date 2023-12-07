import { ReactElement, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { IPageButton, IPaginationProps } from '@interfaces'

export default function Pagination({ total, max, page, isDisabled, setPage }: IPaginationProps) {
  const [section, setSection] = useState(1)
  const BUTTONS_LIMIT = max >= 10 ? 10 : max

  const getPaginationButtons = () => {
    const buttons = [] as ReactElement[]
    const pagesInit = (section === 1 ? section : (section - 1) * BUTTONS_LIMIT) - (page < BUTTONS_LIMIT ? 0 : 1)
    const pagesLimit = BUTTONS_LIMIT * section

    if (page < max && page >= pagesLimit) setSection(prevState => ++prevState)
    if (section > 1 && page <= pagesInit) setSection(prevState => --prevState)

    for (let index = pagesInit; index <= pagesLimit; index++) {
      const pageNumber = (section === 1 ? index < pagesLimit : ![pagesInit, pagesLimit].includes(index))
        ? index
        : '...'

      buttons.push(
        <PageButton
          key={index}
          $current={pageNumber === page ? 'true' : 'false'}
          onClick={() => typeof pageNumber === 'number' && !isDisabled && setPage(pageNumber)}
        >
          {pageNumber}
        </PageButton>
      )
    }

    return buttons
  }

  return (
    <Container>
      <PaginationInfo>
        Showing <PaginationInfoSpan>{page}</PaginationInfoSpan> to <PaginationInfoSpan>{max}</PaginationInfoSpan> of{' '}
        <PaginationInfoSpan>{total}</PaginationInfoSpan> results
      </PaginationInfo>
      <Navigation aria-label='Pagination'>
        <NavigationButton
          tw='rounded-l-md'
          onClick={() => !isDisabled && setPage(page > 1 ? page - 1 : page)}
        >
          <NavigationButtonSpan>Previous</NavigationButtonSpan>
          <ChevronLeftIcon tw='h-5 w-5' aria-hidden='true' />
        </NavigationButton>
        {getPaginationButtons()}
        <NavigationButton
          tw='rounded-r-md'
          onClick={() => !isDisabled && setPage(page < max ? page + 1 : page)}
        >
          <NavigationButtonSpan>Next</NavigationButtonSpan>
          <ChevronRightIcon tw='h-5 w-5' aria-hidden='true' />
        </NavigationButton>
      </Navigation>
    </Container>
  )
}

const Container = tw.div`
  px-4
  py-3
  sm:flex
  sm:flex-1
  sm:items-center
  sm:justify-between
`

const PaginationInfo = tw.p`
  text-sm
  text-primary-color
`

const PaginationInfoSpan = tw.span`
  font-medium
`

const Navigation = tw.nav`
  isolate
  inline-flex
  -space-x-px
  rounded-md
  shadow-sm
`

const NavigationButton = tw.button`
  relative
  inline-flex
  items-center
  px-2 py-2
  text-primary-color
  ring-1
  ring-inset
  ring-gray-300
  hover:bg-gray-50
  focus:z-20
  focus:outline-offset-0
`

const NavigationButtonSpan = tw.span`
  sr-only
`

const PageButton = styled.button<IPageButton>(({ $current }) => [
  tw`
    relative
    inline-flex
    items-center
    px-4
    py-2
    text-sm
    font-semibold
    text-primary-color
    ring-1
    ring-inset
    ring-gray-300
    hover:bg-gray-50
    focus:z-20
    focus:outline-offset-0
  `,
  $current === 'true' && tw`
    z-10
    text-secondary-color
    bg-teal-700
    hover:bg-teal-700
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-teal-700
  `
])
