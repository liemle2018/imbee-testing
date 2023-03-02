import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { loaderToggle } from '../App/appSlice'
import { addTags, setTagSelected } from './tagsSlice'

const TrendingTags = () => {
  const tags = useSelector((state) => state.trendingTags.tags)
  const tagSelected = useSelector((state) => state.trendingTags.tagSelected)
  const keyword = useSelector((state) => state.search.keyword)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loaderToggle(true))

    axios
      .get(
        '/api/tags?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=1&pagesize=10&order=desc&sort=popular&filter=default'
      )
      .then((res) => {
        if (res.data.items) {
          dispatch(addTags(res.data.items))
          dispatch(loaderToggle(false))
        }
      })
      .catch((error) => {
        console.log(error.message)
        dispatch(loaderToggle(false))
      })
  }, [])

  useEffect(() => {
    dispatch(loaderToggle(true))

    axios
      .get(
        `/api/tags?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=1&pagesize=10&order=desc&sort=popular${
          keyword.length > 0 ? `&inname=${keyword}` : ''
        }&filter=default`
      )
      .then((res) => {
        if (res.data.items) {
          dispatch(addTags(res.data.items))
          dispatch(setTagSelected(0))
          dispatch(loaderToggle(false))
        }
      })
      .catch((error) => console.log(error.message))
  }, [keyword])

  return (
    <div className="trending-tags">
      <h2 className="heading">Trending</h2>

      {tags.length > 0 && (
        <ul className="list">
          {tags.map((tag, index) => (
            <li
              className={index === tagSelected ? 'active' : ''}
              onClick={() => dispatch(setTagSelected(index))}
              key={`${tag.name}-${index}`}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TrendingTags
