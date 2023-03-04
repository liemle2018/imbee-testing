import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as axios from '../../utils/axios-orders'
import { loaderToggle } from '../App/appSlice'
import { loadQuestions, loadMoreQuestions } from './questionsSlice'

const Questions = (props) => {
  const [page, setPage] = useState(1)
  const [isLoadMore, setIsLoadMore] = useState(false)

  const tags = useSelector((state) => state.trendingTags.tags)
  const tagSelected = useSelector((state) => state.trendingTags.tagSelected)
  const questions = useSelector((state) => state.questions.questions)

  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (tags[tagSelected]) {
      window.scrollTo(0, 0)
      setPage(1)
      getData(loadQuestions)
    }
  }, [tags, tagSelected])

  useEffect(() => {
    if (isLoadMore) {
      setPage((prevPage) => prevPage + 1)
      setIsLoadMore(false)
    }
  }, [isLoadMore])

  useEffect(() => {
    if (page > 1) {
      getData(loadMoreQuestions)
    }
  }, [page])

  function handleScroll() {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isLoadMore
    ) {
      return
    }

    setIsLoadMore(true)
  }

  async function getData(callback) {
    const url = `/api/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=${page}&pagesize=20&order=desc&sort=activity&tagged=${tags[tagSelected].name}&filter=default`

    dispatch(loaderToggle(true))

    const data = await axios.getData(url)

    if (data) {
      dispatch(loaderToggle(false))

      if (data.items) {
        dispatch(callback(data.items))
      }
    }
  }

  return (
    <>
      {questions.length > 0 && (
        <ul className="questions">
          {questions.map((question) => (
            <li key={`${tagSelected}-${question.question_id}`}>
              <div className="information">
                <a href={question.link} target="_blank" className="question">
                  {question.title}
                </a>
                <ul className="details">
                  <li>
                    <div className="label">Score</div>
                    <div className={`value ${question.score < 0 && 'red'}`}>
                      {question.score}
                    </div>
                  </li>
                  <li>
                    <div className="label">Answers</div>
                    <div
                      className={`value ${
                        question.answer_count > 0 && 'highlight'
                      } ${question.is_answered && 'accepted'}`}
                    >
                      {question.answer_count}
                    </div>
                  </li>
                  <li>
                    <div className="label">Viewed</div>
                    <div className="value">{question.view_count}</div>
                  </li>
                </ul>
              </div>
              <div className="user">
                <div className="avatar">
                  <a href={question.owner.link} target="_blank">
                    <img src={question.owner.profile_image} />
                  </a>
                </div>
                <div className="user-name">
                  <a href={question.owner.link} target="_blank">
                    {question.owner.display_name}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Questions
