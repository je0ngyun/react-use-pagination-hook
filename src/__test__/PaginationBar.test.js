/**
 * Behavior Test
 */

import { render, screen, fireEvent } from '@testing-library/react'
import PaginationBar from '../components/PaginationBar'

const renderTestComponent = (props) => {
  const { rerender: rerenderFunc } = render(
    <PaginationBar {...props} onChange={jest.fn} />
  )
  const goLastButton = screen.getByRole('button', { name: /last/i })
  const nextSectionButton = screen.getByRole('button', { name: /\>\>/i })
  const goNextPageButton = screen.getByRole('button', { name: /^\>$/i })

  const rerender = (props) => {
    rerenderFunc(<PaginationBar {...props} onChange={jest.fn} />)
  }

  return {
    rerender,
    get pageList() {
      return screen.getAllByRole('listitem')
    },
    get pageListValueArray() {
      return screen.getAllByRole('listitem').map((item) => +item.textContent)
    },
    get selectedPageNum() {
      return Number(screen.getByTestId('selected').textContent)
    },
    goLastButton,
    nextSectionButton,
    goNextPageButton,
  }
}

describe('<PaginationBar />', () => {
  it('Hook의 numOfPage 파라미터에 따라 페이지 리스트가 올바르게 표시되어야 한다.', () => {
    const helper = renderTestComponent({
      numOfPage: 5,
      totalPage: 15,
    })
    expect(helper.pageListValueArray).toStrictEqual([1, 2, 3, 4, 5])
    helper.rerender({ numOfPage: 3, totalPage: 15 })
    expect(helper.pageListValueArray).toStrictEqual([1, 2, 3])
  })
  it('마지막 Section의 페이지 리스트 아이템들의 값은 totalPage - numOfPage - 1 부터 numOfPage 사이즈만큼 순차적으로 커져야한다', () => {
    const helper = renderTestComponent({
      numOfPage: 5,
      totalPage: 15,
    })
    fireEvent.click(helper.goLastButton)
    expect(helper.pageListValueArray).toStrictEqual([11, 12, 13, 14, 15])
    helper.rerender({
      numOfPage: 3,
      totalPage: 9,
    })
    expect(helper.pageListValueArray).toStrictEqual([7, 8, 9])
  })
  it('totalPage % numOfPage !== 0 일때 마지막 Section의 페이지 리스트 사이즈는 totalPage % numOfPage와 같아야한다.', () => {
    const helper = renderTestComponent({
      numOfPage: 5,
      totalPage: 13,
    })
    fireEvent.click(helper.goLastButton)
    expect(helper.pageList.length).toBe(13 % 5)
  })
  it('다음 section으로 이동할때마다 리스트 아이템들의 값은 이전페이지의 각 아이템 + numOfPage 만큼 커져야한다.', () => {
    const initPages = [1, 2, 3, 4, 5]
    const helper = renderTestComponent({
      numOfPage: 5,
      totalPage: 15,
    })
    for (let i = 1; i < 3; i++) {
      fireEvent.click(helper.nextSectionButton)
      expect(helper.pageListValueArray).toStrictEqual(
        initPages.map((pageNum) => pageNum + i * 5)
      )
    }
  })
  it('다음 페이지 이동 호출시 현재 페이지는 이전 값 + 1 이 되어야 한다.', () => {
    const helper = renderTestComponent({
      numOfPage: 5,
      totalPage: 15,
    })
    for (let i = 1; i < 16; i++) {
      expect(helper.selectedPageNum).toBe(i)
      fireEvent.click(helper.goNextPageButton)
    }
  })
  it('rerender시 totalPage props가 변경했을 경우 그에따라 hook이 바뀐 상태를 가지는지 테스트', () => {
    const helper = renderTestComponent({
      numOfPage: 5,
      totalPage: 15,
    })
    expect(helper.pageListValueArray).toStrictEqual([1, 2, 3, 4, 5])
    helper.rerender({ numOfPage: 5, totalPage: 1 })
    expect(helper.pageListValueArray).toStrictEqual([1])
  })
})
