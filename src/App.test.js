import { render, screen, within } from '@testing-library/react'
import PagenationBar from './components/PagenationBar'

describe('<PagenationBar />', () => {
  const getPageList = () => {
    return screen.getAllByRole('listitem')
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
})
