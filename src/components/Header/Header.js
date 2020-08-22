import React, { useReducer } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import netlifyIdentity from "netlify-identity-widget"

import "./Header.scss"

function Header(props) {
  const user = props.user

  let isOnAppPage = false
  if (useLocation().pathname === "/app") {
    isOnAppPage = true
  }

  let isOnDemoPage = false
  if (useLocation().pathname === "/demo") {
    isOnDemoPage = true
  }

  const history = useHistory()
  const login = () => netlifyIdentity.open("login")
  const signup = () => netlifyIdentity.open("signup")
  const logout = () => {
    netlifyIdentity.logout()

    history.push("/")
  }

  return (
    <header>
      <nav>
        <Link to="/">SETT</Link>

        {/* Show log in button when user is not logged in */}
        {!user.isLoggedIn && (
          <a onClick={login} className="button button--text">
            Log in
          </a>
        )}

        {/* Show sign up button when user is not logged in */}
        {!user.isLoggedIn && (
          <a onClick={signup} className="button button--text">
            Sign up
          </a>
        )}

        {/* Show log out button when user is not logged in */}
        {user.isLoggedIn && (
          <a onClick={logout} className="button button--text">
            Log out
          </a>
        )}

        {/* Show demo button when user is not pro */}
        {!user.isPro && !isOnDemoPage && (
          <Link to="/demo" className="button button--ghost">
            Free demo
          </Link>
        )}

        {/* Show go pro button when user is not pro and is logged in that starts login */}
        {!user.isPro && !user.isLoggedIn && (
          <a onClick={login} className="button">
            Go pro
          </a>
        )}

        {/* Show go pro button when user is not pro and is logged in that links to stripe */}
        {!user.isPro && user.isLoggedIn && (
          <Link className="button" to="/stripe-dashboard">
            Go pro
          </Link>
        )}

        {/* Show manage subscription button when user is logged in and pro */}
        {user.isPro && user.isLoggedIn && (
          <Link className="button button--ghost" to="/stripe-dashboard">
            Manage subscription
          </Link>
        )}

        {/* Show app button when user is logged in and pro */}
        {user.isPro && user.isLoggedIn && !isOnAppPage && (
          <Link className="button" to="/app">
            Create bannerset
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
