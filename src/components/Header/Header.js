import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import { GoogleLogout } from "react-google-login"
import { UserContext } from "../../Router"

import "./Header.scss"

function Header() {
  const user = React.useContext(UserContext)

  let isOnAppPage = false
  if (useLocation().pathname === "/app") {
    isOnAppPage = true
  }

  let isOnDemoPage = false
  if (useLocation().pathname === "/demo") {
    isOnDemoPage = true
  }

  const history = useHistory()
  const logout = () => {
    history.push("/")
  }

  return (
    <header>
      <nav>
        <Link to="/">SETT</Link>

        {!user.isLoggedIn && (
          <Link to="/login" className="button button--text">
            Log in
          </Link>
        )}

        {user.isLoggedIn && (
          <GoogleLogout
            clientId="951357187081-ln78srsnuhgb3k4j287jhbuita5aiape.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="button button--text">
                Log out
              </button>
            )}
            onLogoutSuccess={logout}
          />
        )}

        {!isOnAppPage && !isOnDemoPage && !user.isPro ? (
          <Link to="/app" className="button button--ghost">
            Free demo
          </Link>
        ) : (
          ""
        )}

        {!user.isPro && !isOnAppPage ? (
          <Link className="button" to="/go-pro">
            Go pro
          </Link>
        ) : (
          ""
        )}

        {user.isPro && !isOnAppPage ? (
          <Link className="button" to="/app">
            Get Started
          </Link>
        ) : (
          ""
        )}
      </nav>
    </header>
  )
}

export default Header
