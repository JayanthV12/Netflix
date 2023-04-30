import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SliderMovies from '../SliderMovies'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TopRated extends Component {
  state = {
    activeStatus: apiStatus.initial,
    topRatedList: '',
  }

  componentDidMount() {
    this.getTopList()
  }

  getTopList = async () => {
    this.setState({activeStatus: apiStatus.progress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const formattedData = data.results.map(each => ({
      backdropPath: each.backdrop_path,
      id: each.id,
      overview: each.overview,
      posterPath: each.poster_path,
      title: each.title,
    }))
    if (response.ok) {
      this.setState({
        activeStatus: apiStatus.success,
        topRatedList: formattedData,
      })
    } else {
      this.setState({activeStatus: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {topRatedList} = this.state
    return (
      <div className="trending-container">
        <h1 className="trending-heading">Top Rated</h1>

        <SliderMovies movies={topRatedList} />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => {
    const onTry = () => {
      this.getTrendingList()
    }
    return (
      <div>
        <img
          src="https://ik.imagekit.io/aqitzrbrj1/alert-triangle.jpg?updatedAt=1682142619120"
          alt="failure view"
        />
        <p>Something Went Wrong</p>
        <button type="button" className="try-button" onClick={onTry}>
          Try Again
        </button>
      </div>
    )
  }

  renderOutputView = () => {
    const {activeStatus} = this.state

    switch (activeStatus) {
      case apiStatus.progress:
        return this.renderLoadingView()
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderOutputView()
  }
}

export default TopRated
