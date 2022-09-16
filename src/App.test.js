import { render, screen, fireEvent } from '@testing-library/react'
import PagenationBar from './components/PagenationBar'

describe('<PagenationBar />', () => {
  const getPageList = () => {
    return screen.getAllByRole('listitem')
  }
  const getGoLastButton = () => {
    return screen.getByText('last')
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
})
