import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {getYear, format, minutesToHours} from 'date-fns'
import Header from '../Header'

import Footer from '../Footer'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    activeStatus: apiStatus.initial,
    movieDetailsList: '',
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({activeStatus: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const movieDetails = {
      adult: data.movie_details.adult,
      backdropPath: data.movie_details.backdrop_path,
      budget: data.movie_details.budget,
      id: data.movie_details.id,
      overview: data.movie_details.overview,
      posterPath: data.movie_details.poster_path,
      releaseDate: data.movie_details.release_date,
      runtime: data.movie_details.runtime,
      voteAverage: data.movie_details.vote_average,
      voteCount: data.movie_details.vote_count,
      title: data.movie_details.title,
      genres: data.movie_details.genres,
      languages: data.movie_details.spoken_languages.map(each => ({
        englishName: each.english_name,
        id: each.id,
      })),
      similar: data.movie_details.similar_movies.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      })),
    }

    if (response.ok) {
      this.setState({
        activeStatus: apiStatus.success,
        movieDetailsList: movieDetails,
      })
    } else {
      this.setState({activeStatus: apiStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetailsList} = this.state
    const {
      adult,
      backdropPath,
      budget,
      overview,

      runtime,
      releaseDate,
      voteAverage,
      voteCount,
      genres,
      languages,
      similar,
      title,
    } = movieDetailsList
    const date = format(new Date(releaseDate), 'do MMMM yyyy')
    const year = getYear(new Date(releaseDate))
    const hours = minutesToHours(runtime)
    const minutes = runtime - hours * 60

    return (
      <div className="movie-detail-container">
        <div
          style={{backgroundImage: `url(${backdropPath})`}}
          className="random-movie"
        >
          <Header />
          <div className="title-random">
            <h1 className="title">{title}</h1>
            <div className="runtime-container">
              <p className="overview">
                {hours}h {minutes}m
              </p>
              {adult ? (
                <button className="adult" type="button">
                  A
                </button>
              ) : (
                <button className="adult" type="button">
                  U/A
                </button>
              )}
              <p className="overview">{year}</p>
            </div>
            <p className="overview">{overview}</p>
            <button type="button" className="play">
              Play
            </button>
          </div>
        </div>
        <div className="detailed-info">
          <ul>
            <h1 className="genre-heading">Genres</h1>
            {genres.map(each => (
              <li key={each.id} className="genre">
                {each.name}
              </li>
            ))}
          </ul>
          <ul>
            <h1 className="genre-heading">Audio Available</h1>
            {languages.map(each => (
              <li key={each.id} className="genre">
                {each.englishName}
              </li>
            ))}
          </ul>
          <div className="ratings-container">
            <ul>
              <h1 className="genre-heading">Rating Count</h1>
              <li className="genre">{voteCount}</li>
            </ul>
            <ul>
              <h1 className="genre-heading">Rating Average</h1>
              <li className="genre">{voteAverage}</li>
            </ul>
          </div>
          <div className="ratings-container">
            <ul>
              <h1 className="genre-heading">Budget</h1>
              <li className="genre">{budget}</li>
            </ul>
            <ul>
              <h1 className="genre-heading">Release Date</h1>
              <li className="genre">{date}</li>
            </ul>
          </div>
        </div>
        <div>
          <h1 className="title-one">More Like This</h1>
          <ul className="popular-movies-list">
            {similar.map(each => (
              <li key={each.id}>
                <img
                  src={each.backdropPath}
                  alt={each.title}
                  className="popular-image"
                />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

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
    return <>{this.renderOutputView()}</>
  }
}

export default MovieDetails
