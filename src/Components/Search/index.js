import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdPlaylistPlay} from 'react-icons/md'
import {BsXCircleFill} from 'react-icons/bs'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Search extends Component {
  state = {
    searchText: '',
    searchResult: '',
    playIcon: false,
    activeStatus: apiStatus.initial,
  }

  onSearchClick = async () => {
    this.setState({activeStatus: apiStatus.progress})
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const searchData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))
      console.log(searchData)
      this.setState({
        activeStatus: apiStatus.success,
        searchResult: searchData,
      })
    } else {
      this.setState({
        activeStatus: apiStatus.failure,
      })
    }
  }

  searchNoResult = () => {
    const {searchText} = this.state
    return (
      <div className="not-found-container1">
        <img
          src="https://ik.imagekit.io/aqitzrbrj1/Group_7394.jpg?updatedAt=1682142494530"
          alt="no movies"
        />
        <p className="not-found-para">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchResult} = this.state

    return searchResult.length === 0 ? (
      this.searchNoResult()
    ) : (
      <ul className="popular-movies-list1">
        {searchResult.map(each => {
          const {id, title, posterPath} = each
          return (
            <li key={id}>
              <Link to={`/movies/${id}`}>
                <img src={posterPath} alt={title} className="popular-image1" />
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
      this.onSearchClick()
    }
    return (
      <div className="failure-container">
        <img
          src="https://ik.imagekit.io/aqitzrbrj1/Background-Complete.jpg?updatedAt=1682142576563"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">
          Something went wrong. Please try again
        </h1>
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

  onSearchChange = event => {
    this.setState({searchText: event.target.value})
  }

  onIconClick = () => {
    this.setState(prevState => ({playIcon: !prevState.playIcon}))
  }

  render() {
    const {playIcon} = this.state
    return (
      <div className="search-page">
        <nav className="nav-container1">
          <div className="logo-container">
            <Link to="/">
              <img
                src="https://ik.imagekit.io/aqitzrbrj1/Group_7399.jpg?updatedAt=1682143542017"
                alt="website logo"
                className="logo-image"
              />
            </Link>
            <ul className="logo-container">
              <li className="route-buttons">
                <Link to="/">
                  <p className="para route-buttons">Home</p>
                </Link>
              </li>

              <li className="route-buttons">
                <Link to="/popular">
                  <p className="para route-buttons">Popular</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="avatar-container">
            <div className="input-search">
              <input
                type="search"
                className="inputEl"
                onChange={this.onSearchChange}
              />
              <button
                type="button"
                className="search"
                testid="searchButton"
                onClick={this.onSearchClick}
              >
                <HiOutlineSearch className="search-icon1" />
              </button>
            </div>

            <Link to="/account">
              <img
                src="https://ik.imagekit.io/aqitzrbrj1/Avatar.jpg?updatedAt=1682142684545"
                alt="profile"
                className="avatar1"
              />
            </Link>
          </div>
        </nav>
        <nav className="mobile-nav1">
          <div className="mobile-nav-container1">
            <Link to="/">
              <img
                src="https://ik.imagekit.io/aqitzrbrj1/Group_7399.jpg?updatedAt=1682143542017"
                alt="website logo"
                className="logo-image1"
              />
            </Link>
            <div>
              <>
                <input
                  type="search"
                  className="input-mobile"
                  onChange={this.onSearchChange}
                />
                <button
                  type="button"
                  className="buttons1"
                  onClick={this.onSearchClick}
                  testid="searchButton"
                >
                  <HiOutlineSearch className="icons" />
                </button>
              </>
              <button
                type="button"
                className="buttons"
                onClick={this.onIconClick}
              >
                <MdPlaylistPlay className="icons" />
              </button>
            </div>
          </div>

          {playIcon && (
            <ul className="logo-container">
              <li className="route-buttons">
                <Link to="/">
                  <p className="para route-buttons">Home</p>
                </Link>
              </li>

              <li className="route-buttons">
                <Link to="/popular">
                  <p className="para route-buttons">Popular</p>
                </Link>
              </li>
              <li className="route-buttons">
                <Link to="/account">
                  <p className="para route-buttons">Account</p>
                </Link>
              </li>
              <button
                type="button"
                className="search"
                onClick={this.onIconClick}
              >
                <BsXCircleFill className="play-icon" />
              </button>
            </ul>
          )}
        </nav>
        <div>{this.renderOutputView()}</div>
      </div>
    )
  }
}

export default Search
