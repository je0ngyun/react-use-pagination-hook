import { useState, useMemo, useEffect, useRef } from 'react'

const usePagination = ({
  numOfPage,
  totalPage = 0,
  initialPage = 1,
  onPageChange,
}) => {
  const mountedFlag = useRef(false)

  const initialSection = Math.ceil(initialPage / numOfPage)
  const initialListRefIndex = initialPage - (initialSection - 1) * numOfPage - 1

  const [currentListRefIndex, setCurrentListRefIndex] =
    useState(initialListRefIndex)
  const [currentSection, setCurrentSection] = useState(initialSection)
  const [currentTotalPage, setCurrentTotalPage] = useState(totalPage)

  const section = Math.floor(currentTotalPage / numOfPage)
  const rest = currentTotalPage % numOfPage
  const maxSection = rest ? section + 1 : section
  const listRefIndex = currentTotalPage ? currentListRefIndex : 0

  const pageList = useMemo(() => {
    if (currentSection === maxSection && rest)
      return Array.from(
        { length: rest },
        (_, idx) => idx + numOfPage * (currentSection - 1) + 1
      )

    if (currentTotalPage === 0) return [initialPage]

    return Array.from(
      { length: numOfPage },
      (_, idx) => idx + numOfPage * (currentSection - 1) + 1
    )
  }, [currentSection, maxSection, rest, currentTotalPage])

  const hasNextSection = () => !(currentSection === maxSection)

  const hasBeforeSection = () => !(currentSection === 1)

  const goNextSection = () => {
    if (!hasNextSection()) return
    setCurrentSection((prev) => prev + 1)
    setCurrentListRefIndex(0)
  }

  const goBeforeSection = () => {
    if (!hasBeforeSection()) return
    setCurrentSection((prev) => prev - 1)
    setCurrentListRefIndex(0)
  }

  const goFirstSection = () => {
    if (!hasBeforeSection()) return
    setCurrentSection(1)
    setCurrentListRefIndex(0)
  }

  const goLastSection = () => {
    if (!hasNextSection()) return
    setCurrentSection(maxSection)
    setCurrentListRefIndex(0)
  }

  const hasNext = () => !(listRefIndex === pageList.length - 1)

  const hasBefore = () => !(listRefIndex === 0)

  const goNext = () => {
    if (!hasNext() && !hasNextSection()) {
      return
    }
    if (!hasNext() && hasNextSection()) {
      goNextSection()
      setCurrentListRefIndex(0)
    } else {
      setCurrentListRefIndex((prev) => prev + 1)
    }
  }

  const goBefore = () => {
    if (!hasBefore() && !hasBeforeSection()) {
      return
    }
    if (!hasBefore() && hasBeforeSection()) {
      goBeforeSection()
      setCurrentListRefIndex(numOfPage - 1)
    } else {
      setCurrentListRefIndex((prev) => prev - 1)
    }
  }

  const setPage = (pageNum) => {
    if (pageNum < pageList[0] || pageNum > pageList[pageList.length - 1]) {
      throw new Error(
        `You cannot set a page to a value that is not in the pageList`
      )
    }
    setCurrentListRefIndex((pageNum - 1) % numOfPage)
  }

  useEffect(() => {
    setCurrentTotalPage(totalPage)
  }, [totalPage])

  useEffect(() => {
    setCurrentSection(initialSection)
    setCurrentListRefIndex(initialListRefIndex)
  }, [initialPage])

  useEffect(() => {
    if (mountedFlag.current) onPageChange?.(pageList[listRefIndex])
    mountedFlag.current = true
  }, [pageList[listRefIndex]])

  return {
    pageList,
    goNextSection,
    goBeforeSection,
    goFirstSection,
    goLastSection,
    goNext,
    goBefore,
    setTotalPage: setCurrentTotalPage,
    setPage,
    get hasNextSection() {
      return hasNextSection()
    },
    get hasBeforeSection() {
      return hasBeforeSection()
    },
    get currentPage() {
      return pageList[listRefIndex]
    },
  }
}

export default usePagination
