interface Params {
  numOfPage: number
  totalPage: number
}

declare const usePagenation: ({ numOfPage, totalPage }: Params) => {
  pagelist: number[]
  goNextSection: () => void
  goBeforeSection: () => void
  goFirstSection: () => void
  goLastSection: () => void
  goNext: () => void
  goBefore: () => void
  setTotalPage: (tatalPage: number) => void
  setPage: (page: number) => void
  hasNextSection: boolean
  hasBeforeSection: boolean
  currentPage: number
}

export default usePagenation
