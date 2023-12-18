import tw, { styled } from 'twin.macro'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { IPageButton, IPaginationProps } from '@interfaces'
import { usePagination } from '@hooks'

export default function Pagination({ totalResults, maxPages, currentPage, setPage, isDisabled }: IPaginationProps) {
  const paginationButtons = usePagination({ maxPages, currentPage, setPage, Component: PageButton, isDisabled })

  return (
    <Container>
      <PaginationInfoBasic>{currentPage}/{maxPages} - {totalResults} results</PaginationInfoBasic>
      <PaginationInfoDetailed>
        Showing <PaginationInfoSpan>{currentPage}</PaginationInfoSpan> to <PaginationInfoSpan>{maxPages}</PaginationInfoSpan> of{' '}
        <PaginationInfoSpan>{totalResults}</PaginationInfoSpan> results
      </PaginationInfoDetailed>
      <Navigation data-cy='pagination-navigation' aria-label='Pagination'>
        <NavigationButton
          data-cy='prev-btn'
          title='Previous'
          tw='rounded-l-md'
          onClick={() => !isDisabled && setPage(currentPage > 1 ? currentPage - 1 : currentPage)}
        >
          <ChevronLeftIcon tw='h-5 w-5' aria-hidden='true' />
        </NavigationButton>
        <PageButtonsContainer>
          {paginationButtons}
        </PageButtonsContainer>
        <NavigationButton
          data-cy='next-btn'
          title='Next'
          tw='rounded-r-md'
          onClick={() => !isDisabled && setPage(currentPage < maxPages ? currentPage + 1 : currentPage)}
        >
          <ChevronRightIcon tw='h-5 w-5' aria-hidden='true' />
        </NavigationButton>
      </Navigation>
    </Container>
  )
}

const Container = tw.div`
  flex
  px-4
  py-3
  justify-between
  items-center
`

const PaginationInfoBasic = tw.p`
  text-sm
  text-primary-color
  lg:hidden
`

const PaginationInfoDetailed = tw.p`
  hidden
  text-sm
  text-primary-color
  lg:block
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

const PageButtonsContainer = tw.div`
  hidden
  lg:block
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
  $current && tw`
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
