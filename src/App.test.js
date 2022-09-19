import { render, screen, fireEvent } from '@testing-library/react'
import PagenationBar from './components/PagenationBar'

describe('<PagenationBar />', () => {
  const getPageList = () => {
    return screen.getAllByRole('listitem')
  }
  const getGoLastButton = () => {
    return screen.getByRole('button', { name: /last/i })
  }
  const getNextSectionButton = () => {
    return screen.getByRole('button', { name: /\>\>/i })
  }
  const getGoNextPageButton = () => {
    return screen.getByRole('button', { name: /^\>$/i })
  }
  const getSelectedPageNum = () => {
    return Number(screen.getByTestId('selected').textContent)
  }
  it('Hook의 numOfPage 파라미터에 따라 페이지 리스트가 올바르게 표시되는지 테스트', () => {
    const { rerender } = render(<PagenationBar numOfPage={5} totalPage={15} />)
    expect(getPageList().map((item) => +item.textContent)).toStrictEqual([
      1, 2, 3, 4, 5,
    ])
    rerender(<PagenationBar numOfPage={3} totalPage={15} />)
    expect(getPageList().map((item) => +item.textContent)).toStrictEqual([
      1, 2, 3,
    ])
  })
  it('마지막 Section의 페이지 리스트 아이템들의 값 테스트', () => {
    const { rerender } = render(<PagenationBar numOfPage={5} totalPage={15} />)
    fireEvent.click(getGoLastButton())
    expect(getPageList().map((item) => +item.textContent)).toStrictEqual([
      11, 12, 13, 14, 15,
    ])
    rerender(<PagenationBar numOfPage={3} totalPage={9} />)
    expect(getPageList().map((item) => +item.textContent)).toStrictEqual([
      7, 8, 9,
    ])
  })
  it('totalPage % numOfPage !== 0 일때 마지막 Section의 페이지 리스트 사이즈는 나머지와 같아야한다.', () => {
    render(<PagenationBar numOfPage={5} totalPage={13} />)
    fireEvent.click(getGoLastButton())
    expect(getPageList().length).toBe(13 % 5)
  })
  it('section 이동버튼 클릭시의 리스트 아이템들의 값 및 선택처리된 값 테스트', () => {
    const initPages = [1, 2, 3, 4, 5]
    render(<PagenationBar numOfPage={5} totalPage={15} />)
    for (let i = 1; i < 3; i++) {
      fireEvent.click(getNextSectionButton())
      expect(getPageList().map((item) => +item.textContent)).toStrictEqual(
        initPages.map((pageNum) => pageNum + i * 5)
      )
    }
  })
  it('페이지 이동 엑션에 따른 현재 페이지 번호 테스트', () => {
    render(<PagenationBar numOfPage={5} totalPage={15} />)
    for (let i = 1; i < 16; i++) {
      expect(getSelectedPageNum()).toBe(i)
      fireEvent.click(getGoNextPageButton())
    }
  })
})
