import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="account">
        <h1 className="account-heading">Account</h1>
        <hr className="line" />
        <div className="member-details">
          <p className="member-heading">Member Ship</p>
          <div>
            <p className="email">rahul@gmail.com</p>
            <p className="email">Password: **********</p>
          </div>
        </div>
        <hr className="line" />
        <div className="member-details">
          <p className="member-heading">Plan Details</p>
          <div className="plan">
            <p className="email">Premium</p>
            <p className="email email1">Ultra HD</p>
          </div>
        </div>
        <hr className="line" />
        <button type="button" className="logout-button" onClick={onLogout}>
          LogOut
        </button>
      </div>
      <Footer />
    </>
  )
}

export default withRouter(Account)
