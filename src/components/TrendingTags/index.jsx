import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as axios from '../../utils/axios-orders'
import { loaderToggle } from '../App/appSlice'
import { addTags, setTagSelected } from './tagsSlice'

const TrendingTags = () => {
  const tags = useSelector((state) => state.trendingTags.tags)
  const tagSelected = useSelector((state) => state.trendingTags.tagSelected)
  const keyword = useSelector((state) => state.search.keyword)

  const dispatch = useDispatch()

  useEffect(() => {
    const url =
      '/api/tags?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=1&pagesize=10&order=desc&sort=popular&filter=default'

    getDataHandle(url)
  }, [])

  useEffect(() => {
    const url = `/api/tags?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=1&pagesize=10&order=desc&sort=popular${
      keyword.length > 0 ? `&inname=${keyword}` : ''
    }&filter=default`

    getDataHandle(url, true)
  }, [keyword])

  async function getDataHandle(url, isResetTagSelected = false) {
    dispatch(loaderToggle(true))

    const data = await axios.getData(url)

    if (data) {
      dispatch(loaderToggle(false))

      if (data.items) {
        dispatch(addTags(data.items))
        if (isResetTagSelected) {
          dispatch(setTagSelected(0))
        }
      }
    }
  }

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
