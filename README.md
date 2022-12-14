<div align="center">
  <img src='https://raw.githubusercontent.com/je0ngyun/react-use-pagination-hook/master/media/logo.png' width="60%" alt='react-use-pagination-hook' />
</div>

<div align="center">
  <em>
    Lightweight headless UI pagination hook
  </em>
</div>

<br/>

<p align="center">
  <a href="https://github.com/je0ngyun/react-use-pagination-hook/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-ff69b4.svg" alt="MIT License">
  </a>
  <a href="https://www.npmjs.com/package/react-use-pagination-hook">
    <img src="https://img.shields.io/npm/v/react-use-pagination-hook.svg">
  </a>
  <img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg" alt="100% coverage">
  <a href="https://bundlephobia.com/package/react-use-pagination-hook@latest">
    <img src="https://badgen.net/bundlephobia/minzip/react-use-pagination-hook@latest">
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-blueviolet.svg" alt="100% coverage">
</p>

# Install

```
$ npm install --save react-use-pagination-hook

or

$ yarn add react-use-pagination-hook
```

# Features

- ⚙️ Completely unstyled, You only need to provide UI controls.
- ✅ Only State hooks & callbacks, compatible with other libraries.
- ✨ Provides several different methods for page navigation, such as section-by-section navigation.

# Demo

[https://je0ngyun.github.io/react-use-pagination-hook](https://je0ngyun.github.io/react-use-pagination-hook)

# Usage

```ts
const App = () => {
  const {
    pagelist,
    goNextSection,
    goBeforeSection,
    goFirstSection,
    goLastSection,
    goNext,
    goBefore,
    setTotalPage,
    setPage,
    currentPage,
  } = usePagination({ numOfPage: 5, totalPage: 15 })

  return (
    <div className="App">
      <main className="container">
        <button onClick={() => goFirstSection()}>{'First'}</button>
        <button onClick={() => goBeforeSection()}>{'<<'}</button>
        <button onClick={() => goBefore()}>{'<'}</button>
        <ul className="pages">
          {pagelist.map((page) => (
            <li
              onClick={() => setPage(page)}
              className={currentPage === page ? 'selected' : ''}
              key={page}
            >
              {page}
            </li>
          ))}
        </ul>
        <button onClick={() => goNext()}>{'>'}</button>
        <button onClick={() => goNextSection()}>{'>>'}</button>
        <button onClick={() => goLastSection()}>{'Last'}</button>
      </main>
    </div>
  )
}

export default App
```

# API

## Props

| Option    | Type                         | Description                                                                                                                                                           |
| --------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| numOfPage | number                       | Number of pages to display at once in the pagination bar if it is greater than the total number of pages, the page list is initialized with the total number of pages |
| totalPage | number?(optional, default:0) | Initial value of total number of pages                                                                                                                                |

## Hook return value

| Name             | Type                        | Description                                                                                                                                  |
| ---------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| pagelist         | number[]                    | An array representing the list of current, returns [1] by default even if the array is empty pages                                           |
| currentPage      | number                      | This is the currently selected page, with an initial value of 1                                                                              |
| setTotalPage     | (tatalPage: number) => void | Set the total number of pages, used when initializing the number of pages in response to the server side                                     |
| setPage          | (page: number) => void      | Change the currently selected page number in the pagelist, if you try to set a value that is not in the page list array, an error is thrown. |
| goBefore         | () => void                  | Go to the before page (currentPage becomes -1)                                                                                               |
| goNext           | () => void                  | Go to the next page (currentPage becomes +1)                                                                                                 |
| goBeforeSection  | () => void                  | Go to the before section, the page list becomes changes                                                                                      |
| goNextSection    | () => void                  | Go to the next section, the page list becomes changes                                                                                        |
| goFirstSection   | () => void                  | Go to the first section, the page list becomes changes                                                                                       |
| goLastSection    | () => void                  | Go to the last section, the page list becomes changes                                                                                        |
| hasNextSection   | boolean                     | Returns whether the next section exists                                                                                                      |
| hasBeforeSection | boolean                     | Returns whether the before section exists                                                                                                    |

# With React-Query

```ts
const numOfPage = 5
const limit = 10

interface FetchPages {
  (page: number): Promise<{ results: { name: string }[]; count: number }>
}

const fetchPages: FetchPages = async (page: number) => {
  try {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`)
    if (!res.ok) throw new Error('Error')
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const LandingPage = () => {
  const {
    pagelist,
    goNextSection,
    goBeforeSection,
    goFirstSection,
    goLastSection,
    goNext,
    goBefore,
    setTotalPage,
    setPage,
    currentPage,
  } = usePagination({ numOfPage })

  const { data } = useQuery(
    ['pagination', currentPage],
    () => fetchPages(currentPage),
    {
      onSuccess: (data) => {
        // Reinitialize the total page state using the server-side response result
        // The API used in the example was calculated because it returns the total number of items.
        setTotalPage(
          data.count % limit ? data.count / limit + 1 : data.count / limit
        )
        // setTotalPage(data.totalPage)
      },
    }
  )

  return (
    <>
      <ul className="items">
        {!data && <li>loading...</li>}
        {data?.results.map(({ name }, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>
      <main className="container">
        <button onClick={() => goFirstSection()}>{'First'}</button>
        <button onClick={() => goBeforeSection()}>{'<<'}</button>
        <button onClick={() => goBefore()}>{'<'}</button>
        <ul className="pages" aria-labelledby="pages">
          {pagelist.map((page) => (
            <li
              onClick={() => setPage(page)}
              className={currentPage === page ? 'selected' : ''}
              key={page}
            >
              {page}
            </li>
          ))}
        </ul>
        <button onClick={() => goNext()}>{'>'}</button>
        <button onClick={() => goNextSection()}>{'>>'}</button>
        <button onClick={() => goLastSection()}>{'Last'}</button>
      </main>
    </>
  )
}

export default LandingPage
```

### Result

<div>
  <img src='https://raw.githubusercontent.com/je0ngyun/react-use-pagination-hook/master/media/using-react-query.gif' width="60%" alt='react-use-pagination-hook' />
</div>

# License

Copyright © 2022 [jeongyun <jeongyunniim@gmail.com>](https://github.com/je0ngyun).
This project is [MIT](https://github.com/je0ngyun/react-use-pagination-hook/blob/master/LICENSE) licensed.

# Bug reporting

Please use [issue](https://github.com/je0ngyun/react-use-pagination-hook/issues) to report bugs
