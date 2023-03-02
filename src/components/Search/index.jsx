import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addKeyword } from './searchSlice'

const Search = () => {
  const [searchText, setSearchText] = useState('')

  const dispatch = useDispatch()

  function onSubmitHandle(e) {
    e.preventDefault()
    dispatch(addKeyword(searchText))
  }

  return (
    <form id="search-tags" onSubmit={onSubmitHandle}>
      <div className="search">
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Tag"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  )
}

export default Search
