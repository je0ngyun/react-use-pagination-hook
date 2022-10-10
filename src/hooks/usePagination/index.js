import { useState, useMemo } from 'react'

const usePagination = ({ numOfPage, totalPage = 0 }) => {
  const [listRefIndex, setListRefIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState(1)
  const [currentTotalPage, setCurrentTotalPage] = useState(totalPage)
  const section = Math.floor(currentTotalPage / numOfPage)
  const rest = currentTotalPage % numOfPage
  const maxSection = rest ? section + 1 : section

  const pagelist = useMemo(() => {
    if (currentSection === maxSection && rest) {
      return Array.from(
        { length: rest },
        (_, idx) => idx + numOfPage * (currentSection - 1) + 1
      )
    } else {
      if (currentTotalPage === 0) {
        return [1]
      } else {
        return Array.from(
          { length: numOfPage },
          (_, idx) => idx + numOfPage * (currentSection - 1) + 1
        )
      }
    }
  }, [currentSection, maxSection, rest, currentTotalPage])

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
    if (!hasBeforeSection()) return
    setCurrentSection(1)
    setListRefIndex(0)
  }

  const goLastSection = () => {
    if (!hasNextSection()) return
    setCurrentSection(maxSection)
    setListRefIndex(0)
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
      setListRefIndex(numOfPage - 1)
    } else {
      setListRefIndex((prev) => prev - 1)
    }
  }

  const setPage = (pageNum) => {
    setListRefIndex((pageNum - 1) % numOfPage)
  }

  return {
    pagelist,
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
      return pagelist[listRefIndex]
    },
  }
}

export default usePagination
