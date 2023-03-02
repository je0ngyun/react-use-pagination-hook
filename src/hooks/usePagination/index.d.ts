import * as React from 'react'

interface Props {
  /**
   * Number of pages to display at once in the pagination bar if it is greater than the total number of pages, the page list is initialized with the total number of pages
   */
  numOfPage: number
  /**
   * Initial value of total number of pages,
   * Optional (default 0)
   */
  totalPage?: number
}

export interface usePaginationReturn {
  /**
   * Number of pages to display at once in the pagination bar if it is greater than the total number of pages, the page list is initialized with the total number of pages
   */
  pageList: number[]
  /**
   * Go to the next section, the page list becomes changes
   */
  goNextSection: () => void
  /**
   * Go to the before section, the page list becomes changes
   */
  goBeforeSection: () => void
  /**
   * Go to the first section, the page list becomes changes
   */
  goFirstSection: () => void
  /**
   * Go to the last section, the page list becomes changes
   */
  goLastSection: () => void
  /**
   * Go to the next page (currentPage becomes +1)
   */
  goNext: () => void
  /**
   * Go to the before page (currentPage becomes -1)
   */
  goBefore: () => void
  /**
   * Set the total number of pages, used when initializing the number of pages in response to the server side
   */
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
  /**
   * Change the currently selected page number in the pageList
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
   * This is the currently selected page, with an initial value of 1
   */
  currentPage: number
}

declare const usePagination: ({
  numOfPage,
  totalPage,
}: Props) => usePaginationReturn

export default usePagination
