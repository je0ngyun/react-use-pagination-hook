import * as React from 'react'

interface Props {
  /**
   * The number of pages to be displayed on the pagination bar
   * If the number of pages to display at once in the pagination bar is greater than the total number of pages,
   * the page list will be initialized with the total number of pages.
   */
  numOfPage: number
  /**
   * The initial value of the total number of pages.
   * Optional (default 0)
   */
  totalPage?: number
  /**
   * The initial value of the current page.
   * Optional (default 1)
   */
  initialPage?: number
  /**
   * Callback that is triggered every time a page is changed.
   * Optional
   */
  onPageChange?: (page: number) => void
}

export interface usePaginationReturn {
  /**
   * The array that represents the current page bar,
   * If the total number of pages is 0, [initialPage] is returned.
   */
  pageList: number[]
  /**
   * Go to the next section, and the page list will change.
   */
  goNextSection: () => void
  /**
   * Go to the previous section, and the page list will change.
   */
  goBeforeSection: () => void
  /**
   * Go to the first section, and the page list will change.
   */
  goFirstSection: () => void
  /**
   * Go to the last section, and the page list will change.
   */
  goLastSection: () => void
  /**
   * Go to the next page. (currentPage increases by +1)
   */
  goNext: () => void
  /**
   * Go to the previous page (currentPage decreases by -1).
   */
  goBefore: () => void
  /**
   * Set the total number of pages to be used when initializing the page count in response to the server side.
   */
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
  /**
   * Update the currently selected page number in the pageList.
   * If you try to set a value that is not in the page list array, an error is thrown.
   */
  setPage: (page: number) => void
  /**
   * Returns whether the next section exists
   */
  hasNextSection: boolean
  /**
   * Returns whether the before section exists
   */
  hasBeforeSection: boolean
  /**
   * This is the currently selected page, with the initial value of the initial page props.
   * If the total number of pages is 0, initialPage is returned.
   */
  currentPage: number
}

declare const usePagination: ({
  numOfPage,
  totalPage,
  initialPage,
  onPageChange,
}: Props) => usePaginationReturn

export default usePagination
