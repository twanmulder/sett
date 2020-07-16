import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import { GoogleLogout } from "react-google-login"

import "./Header.scss"

function Header() {
  let isOnAppPage = false
  if (useLocation().pathname === "/app") {
    isOnAppPage = true
  }

  const history = useHistory()
  const logout = () => {
    history.push("/")
  }

  return (
    <header>
      <nav>
        <Link to="/">SETT</Link>
        <Link to="/login" className="button button--text">
          Log in
        </Link>

        <GoogleLogout
          clientId="951357187081-ln78srsnuhgb3k4j287jhbuita5aiape.apps.googleusercontent.com"
          render={(renderProps) => (
            <a onClick={renderProps.onClick} disabled={renderProps.disabled} className="button button--text">
              Log out
            </a>
          )}
          onLogoutSuccess={logout}
        />

        {!isOnAppPage && (
          <Link to="/app" className="button button--ghost">
            Free demo
          </Link>
        )}

        <Link className="button" to="/go-pro">
          Go pro
        </Link>
      </nav>
    </header>
  )
}

export default Header
