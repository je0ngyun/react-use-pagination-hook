import React, { useState, useEffect } from 'react'

const usePagenation = (showPages, totalPageParam) => {
  const [listRefIndex, setListRefIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState(1)
  const [totalPage, setTotalPage] = useState(totalPageParam)
  const section = Math.floor(totalPage / showPages)
  const rest = totalPage % 5
  const maxSection = rest ? section + 1 : section

  let pagelist

  if (currentSection === maxSection && rest) {
    pagelist = Array.from(
      { length: rest },
      (_, idx) => idx + showPages * (currentSection - 1) + 1
    )
  } else {
    if (totalPage === 0) {
      pagelist = [1]
    } else {
      pagelist = Array.from(
        { length: showPages },
        (_, idx) => idx + showPages * (currentSection - 1) + 1
      )
    }
  }

  const hasNextSection = () => {
    return !(currentSection === maxSection)
  }
  const hasBeforeSection = () => {
    return !(currentSection === 1)
  }
  const goNextSection = () => {
    if (!hasNextSection()) return
    setCurrentSection((prev) => prev + 1)
    setListRefIndex(0)
  }
  const goBeforeSection = () => {
    if (!hasBeforeSection()) return
    setCurrentSection((prev) => prev - 1)
    setListRefIndex(0)
  }
  const goFirstSection = () => {
    setCurrentSection(1)
  }

  const goLastSection = () => {
    setCurrentSection(maxSection)
  }

  const hasNext = () => {
    return !(listRefIndex === pagelist.length - 1)
  }

  const hasBefore = () => {
    return !(listRefIndex === 0)
  }

  const goNext = () => {
    if (!hasNext() && !hasNextSection()) {
      return
    }
    if (!hasNext() && hasNextSection()) {
      goNextSection()
      setListRefIndex(0)
    } else {
      setListRefIndex((prev) => prev + 1)
    }
  }

  const goBefore = () => {
    if (!hasBefore() && !hasBeforeSection()) {
      return
    }
    if (!hasBefore() && hasBeforeSection()) {
      goBeforeSection()
      setListRefIndex(showPages - 1)
    } else {
      setListRefIndex((prev) => prev - 1)
    }
  }

  const setPage = (pageNum) => {
    setListRefIndex((pageNum - 1) % 5)
  }

  return {
    pagelist,
    goNextSection,
    goBeforeSection,
    goFirstSection,
    goLastSection,
    goNext,
    goBefore,
    setTotalPage,
    setPage,
    get hasNextSection() {
      return hasNextSection()
    },
    get hasBeforeSection() {
      return hasBeforeSection()
    },
    get currentPage() {
      return pagelist[listRefIndex]
    },
  }
}

export default usePagenation
