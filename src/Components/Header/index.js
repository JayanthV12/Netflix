import {Link} from 'react-router-dom'
import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdPlaylistPlay} from 'react-icons/md'
import {BsXCircleFill} from 'react-icons/bs'
import './index.css'

class Header extends Component {
  state = {
    playIcon: false,
  }

  onIconClick = () => {
    this.setState(prevState => ({playIcon: !prevState.playIcon}))
  }

  render() {
    const {playIcon} = this.state
    return (
      <>
        <nav className="nav-container">
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
            <Link to="/search">
              <button type="button" testid="searchButton" className="search">
                <HiOutlineSearch className="search-icon" />
              </button>
            </Link>
            <Link to="/account">
              <img
                src="https://ik.imagekit.io/aqitzrbrj1/Avatar.jpg?updatedAt=1682142684545"
                alt="profile"
                className="avatar"
              />
            </Link>
          </div>
        </nav>
        <nav className="mobile-nav">
          <div className="mobile-nav-container">
            <Link to="/">
              <img
                src="https://ik.imagekit.io/aqitzrbrj1/Group_7399.jpg?updatedAt=1682143542017"
                alt="website logo"
                className="logo-image"
              />
            </Link>
            <div className="mobile-search">
              <Link to="/search">
                <button type="button" testid="searchButton" className="search">
                  <HiOutlineSearch className="search-icon" />
                </button>
              </Link>
              <button
                type="button"
                className="search"
                onClick={this.onIconClick}
              >
                <MdPlaylistPlay className="play-icon" />
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
      </>
    )
  }
}
export default Header
