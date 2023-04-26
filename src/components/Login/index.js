import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onFailure = error => {
    this.setState({
      errorMsg: error,
      showError: true,
    })
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  getLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="image-container">
          <img
            src="https://ik.imagekit.io/aqitzrbrj1/Group_7399.jpg?updatedAt=1682143542017"
            alt="login website logo"
            className="logo-image"
          />
        </div>
        <form className="form-container" onSubmit={this.getLogin}>
          <h1 className="login-term">Login</h1>
          <div className="input-container">
            <label htmlFor="username" className="labelEl">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="inputEl"
              placeholder="Username"
              onChange={this.changeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="labelEl">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="inputEl"
              placeholder="Password"
              onChange={this.changePassword}
            />
          </div>
          {showError && <p className="error">{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default Login
