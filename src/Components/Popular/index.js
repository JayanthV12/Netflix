import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    activeStatus: apiStatus.initial,
    popularList: '',
  }

  componentDidMount() {
    this.getPopularList()
  }

  getPopularList = async () => {
    this.setState({activeStatus: apiStatus.progress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
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
    console.log(response)
    if (response.ok) {
      this.setState({
        activeStatus: apiStatus.success,
        popularList: formattedData,
      })
    } else {
      this.setState({activeStatus: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {popularList} = this.state
    return (
      <ul className="popular-movies-list">
        {popularList.map(each => {
          const {id} = each
          return (
            <li key={each.id} className="list-popular">
              <Link to={`movies/${id}`}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="popular-image"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => {
    const onTry = () => {
      this.getPopularList()
    }
    return (
      <div className="failure-container">
        <img
          src="https://ik.imagekit.io/aqitzrbrj1/Background-Complete.jpg?updatedAt=1682142576563"
          alt="failure view"
          className="failure-image"
        />
        <p className="failure-heading">
          Something went wrong. Please try again
        </p>
        <button type="button" onClick={onTry} className="failure-button">
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
    return (
      <div className="popular-container">
        <Header />
        {this.renderOutputView()}
        <Footer />
      </div>
    )
  }
}

export default Popular
