import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import './index.css'

const Header = () => (
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
        <Link to="/">
          <li className="route-buttons">
            <p className="para">Home</p>
          </li>
        </Link>
        <Link to="/popular">
          <li className="route-buttons">
            <p className="para">Popular</p>
          </li>
        </Link>
      </ul>
    </div>
    <div className="avatar-container">
      <Link to="/search">
        <AiOutlineSearch className="search-icon" />
      </Link>
      <Link to="/account">
        <img
          src="https://ik.imagekit.io/aqitzrbrj1/Avatar.jpg?updatedAt=1682142684545"
          alt="avatar"
          className="avatar"
        />
      </Link>
    </div>
  </nav>
)

export default Header
