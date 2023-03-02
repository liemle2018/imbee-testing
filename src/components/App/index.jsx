import { useSelector } from 'react-redux'

import '../../styles/App.scss'

import Search from '../Search'
import TrendingTags from '../TrendingTags'
import Questions from '../Questions'
import Loading from '../Loading'

function App() {
  const isLoading = useSelector((state) => state.app.isLoading)

  return (
    <div className="app-container">
      {isLoading && <Loading />}
      <div className="sticky">
        <Search />
        <TrendingTags />
      </div>
      <Questions />
    </div>
  )
}

export default App
