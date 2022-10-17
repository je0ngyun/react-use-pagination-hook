/**
 * Implementation Test
 */

import { renderHook, act } from '@testing-library/react'
import usePagination from '../hooks/usePagination'

const DEFAULT_PROPS = {
  numOfPage: 5,
  totalPage: 15,
}

const PROPS_WHEN_REMAINDER_OCCURS = {
  numOfPage: 5,
  totalPage: 13,
}

const PROPS_WHEN_WITHOUT_TOTALPAGE = {
  numOfPage: 5,
}

describe('usePagination', () => {
  it('커스텀 훅의 상태가 올바르게 초기화 되는지 테스트', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    expect(result.current.pagelist).toStrictEqual([1, 2, 3, 4, 5])
    expect(result.current.currentPage).toBe(1)
    expect(result.current.hasBeforeSection).toBe(false)
    expect(result.current.hasNextSection).toBe(true)
  })

  it('goNext 호출시 currentPage는 currentPage + 1 이 되어야 한다', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goNext())
    expect(result.current.currentPage).toBe(2)
  })

  it('goBefore 호출시 currentPage는 currentPage - 1 이 되어야 한다', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goNext())
    act(() => result.current.goBefore())
    expect(result.current.currentPage).toBe(1)
  })

  it('goLastSection 호출시의 pagelist, currentPage 상태 테스트', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goLastSection())
    expect(result.current.pagelist).toStrictEqual([11, 12, 13, 14, 15])
    expect(result.current.currentPage).toBe(11)
  })

  it('goFirstSection 호출시의 pagelist, currentPage 상태 테스트', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goLastSection())
    act(() => result.current.goFirstSection())
    expect(result.current.pagelist).toStrictEqual([1, 2, 3, 4, 5])
    expect(result.current.currentPage).toBe(1)
  })

  it('setPage 호출시 현재 pagelist 배열에 존재한다면 currentPage는 setPage에 넘긴 인수로 바뀌어야한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.setPage(3))
    expect(result.current.currentPage).toBe(3)
  })

  it('setPage 호출시 현재 pagelist 배열에 존재하지 않는다면 예외를 던져야 한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    expect(() => result.current.setPage(100)).toThrow(Error)
  })

  it('hasNextSection이 false이고 currentPage가 pagelist의 맨 마지막 아이템이라면 goNext 호출 시 변화가 없어야한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goLastSection())
    act(() => result.current.setPage(15))
    act(() => result.current.goNext())
    expect(result.current.hasNextSection).toBe(false)
    expect(result.current.currentPage).toBe(15)
  })

  it('hasBeforeSection이 false이고 currentPage가 pagelist의 맨 첫번째 아이템이라면 goBefore 호출 시 변화가 없어야한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goFirstSection())
    act(() => result.current.setPage(1))
    act(() => result.current.goBefore())
    expect(result.current.hasBeforeSection).toBe(false)
    expect(result.current.currentPage).toBe(1)
  })

  it('hasBeforeSection이 false이고 currentPage가 pagelist의 맨 첫번째 아이템이라면 goBefore 호출 시 변화가 없어야한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goFirstSection())
    act(() => result.current.setPage(1))
    act(() => result.current.goBefore())
    expect(result.current.hasBeforeSection).toBe(false)
    expect(result.current.currentPage).toBe(1)
  })

  it('goNextSection 호출시 pagilist 배열의 아이템들은 이전페이지의 각 아이템 + numOfPage 만큼 커져야한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goNextSection())
    expect(result.current.pagelist).toStrictEqual([6, 7, 8, 9, 10])
    act(() => result.current.goNextSection())
    expect(result.current.pagelist).toStrictEqual([11, 12, 13, 14, 15])
  })

  it('goBeforeSection 호출시 pagilist 배열의 아이템들은 이전페이지의 각 아이템 - numOfPage 만큼 작아져야한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goLastSection())
    act(() => result.current.goBeforeSection())
    expect(result.current.pagelist).toStrictEqual([6, 7, 8, 9, 10])
    act(() => result.current.goBeforeSection())
    expect(result.current.pagelist).toStrictEqual([1, 2, 3, 4, 5])
  })

  it('goNextSection 호출시 currentPage는 바뀐 pagilist 배열의 가장 첫번째 아이템이어야 한다', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.setPage(3))
    act(() => result.current.goNextSection())
    expect(result.current.currentPage).toBe(6)
    act(() => result.current.setPage(8))
    act(() => result.current.goNextSection())
    expect(result.current.currentPage).toBe(11)
  })

  it('hasNestSection이 false일때 goNextSection를 호출하더라도 currentPage값은 변화가 없어야 한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goLastSection())
    act(() => result.current.setPage(13))
    act(() => result.current.goNextSection())
    expect(result.current.currentPage).toBe(13)
  })

  it('hasBeforeSection이 false일때 goBeforeSection를 호출하더라도 currentPage값은 변화가 없어야 한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goFirstSection())
    act(() => result.current.setPage(3))
    act(() => result.current.goBeforeSection())
    expect(result.current.currentPage).toBe(3)
  })

  it('hasNestSection이 false일때 goLastSection를 호출하더라도 currentPage값은 변화가 없어야 한다.', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goLastSection())
    act(() => result.current.setPage(13))
    act(() => result.current.goLastSection())
    expect(result.current.currentPage).toBe(13)
  })

  it('현재 totalPage % numOfPage !== 0 이라면 마지막 section의 길이는 totalPage % numOfPage 이어야 한다.', () => {
    const { result } = renderHook(() =>
      usePagination(PROPS_WHEN_REMAINDER_OCCURS)
    )
    act(() => result.current.goLastSection())
    expect(result.current.pagelist.length).toBe(
      PROPS_WHEN_REMAINDER_OCCURS.totalPage %
        PROPS_WHEN_REMAINDER_OCCURS.numOfPage
    )
  })

  // totalPage 값을 서버 응답데이터를 이용해서 초기화할 경우 그 전에 hook을 렌더링할 수 있어야 하므로 필요
  it('totalPage 값이 주어지지 않은 경우에도 currentPage는 1로 초기화되어야 한다', () => {
    const { result } = renderHook(() =>
      usePagination(PROPS_WHEN_WITHOUT_TOTALPAGE)
    )
    expect(result.current.currentPage).toBe(1)
    expect(result.current.pagelist).toStrictEqual([1])
  })

  // goNext, goBefore 메소드의 section간 자동 이동을 위함
  it('currentPage가 pagilist의 마지막 아이템일때 goNext 호출시 다음 section으로의 이동 테스트', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.setPage(5))
    act(() => result.current.goNext())
    expect(result.current.currentPage).toBe(6)
  })

  it('currentPage가 pagilist의 첫번째 아이템일때 goBefore 호출시 전 section으로의 이동 테스트', () => {
    const { result } = renderHook(() => usePagination(DEFAULT_PROPS))
    act(() => result.current.goNextSection())
    act(() => result.current.goBefore())
    expect(result.current.currentPage).toBe(5)
  })
})
