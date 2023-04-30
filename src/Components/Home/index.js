import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SliderMovies from '../SliderMovies'
import Header from '../Header'
import Footer from '../Footer'
import Trending from '../Trending'
import TopRated from '../TopRated'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    activeStatus: apiStatus.initial,
    originalList: '',
  }

  componentDidMount() {
    this.getOriginalList()
  }

  getOriginalList = async () => {
    this.setState({activeStatus: apiStatus.progress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
        originalList: formattedData,
      })
    } else {
      this.setState({activeStatus: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {originalList} = this.state
    return (
      <div className="trending-container">
        <h1 className="trending-heading">Originals</h1>

        <SliderMovies movies={originalList} />
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
      this.getOriginalList()
    }
    return (
      <div>
        <img
          src="https://ik.imagekit.io/aqitzrbrj1/alert-triangle.jpg?updatedAt=1682142619120"
          alt="failure view"
        />
        <p>Something Went Wrong. Please try again</p>
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
    const {originalList} = this.state
    const randomNumber = Math.ceil(Math.random() * originalList.length)

    const randomPoster = originalList[randomNumber]
    const image = {...randomPoster}
    const {backdropPath, title, overview} = image

    return (
      <>
        <div
          style={{backgroundImage: `url(${backdropPath})`}}
          className="random"
        >
          <Header />
          <div className="title-random">
            <h1 className="title">{title}</h1>
            <h1 className="overview">{overview}</h1>
            <button type="button" className="play">
              Play
            </button>
          </div>
        </div>

        <Trending />
        {this.renderOutputView()}
        <TopRated />
        <Footer />
      </>
    )
  }
}
export default Home
