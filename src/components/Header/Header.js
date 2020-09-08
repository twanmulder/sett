import React, { useState, Fragment } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import netlifyIdentity from "netlify-identity-widget"

import "./Header.scss"

function Header(props) {
  const [isNavOpen, updateNavOpenState] = useState(false)

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

  const handleToggleNav = () => {
    updateNavOpenState(!isNavOpen)
  }

  return (
    <Fragment>
      <header className={isNavOpen ? "is-active" : null}>
        <nav>
          <div className="main-nav__bar">
            <div className="main-nav__controls">
              <button onClick={handleToggleNav} aria-expanded="false" className="main-nav__toggle" id="main-nav-toggle" title="Toggle Menu" aria-controls="main-nav-menu">
                <span className="main-nav__toggle__icon">
                  <span className="main-nav__toggle__icon__line main-nav__toggle__icon__line--top"></span>
                  <span className="main-nav__toggle__icon__line main-nav__toggle__icon__line--bottom"></span>
                </span>
                <span className="visuallyhidden">Menu</span>
              </button>
            </div>
            <div className="main-nav__logo">
              <Link to="/">SETT</Link>
            </div>
            <ul className="main-nav__persistent">
              <li className="main-nav__item">
                {/* Show log in button when user is not logged in */}
                {!user.isLoggedIn && (
                  <button onClick={login} className="button">
                    Log in
                  </button>
                )}
                {/* Show go pro button when user is not pro and is logged in that links to stripe */}
                {!user.isPro && user.isLoggedIn && (
                  <li className="large-button">
                    <a href={user.stripePortalHref} className="button">
                      Go pro
                    </a>
                  </li>
                )}
              </li>
            </ul>
          </div>

          <div className="main-nav__menu">
            <ul>
              {/* Show log in button when user is not logged in */}
              {!user.isLoggedIn && (
                <li>
                  <button onClick={login} className="button button--text">
                    Log in
                  </button>
                </li>
              )}

              {/* Show sign up button when user is not logged in */}
              {!user.isLoggedIn && (
                <li>
                  <button onClick={signup} className="button button--text">
                    Sign up
                  </button>
                </li>
              )}

              {/* Show log out button when user is not logged in */}
              {user.isLoggedIn && (
                <li>
                  <button onClick={logout} className="button button--text">
                    Log out
                  </button>
                </li>
              )}

              {/* Show demo button when user is not pro */}
              {!user.isPro && !isOnDemoPage && (
                <li className="large-button">
                  <Link to="/demo" className="button button--ghost">
                    Free demo
                  </Link>
                </li>
              )}

              {/* Show go pro button when user is not pro and is logged in that starts login */}
              {!user.isPro && !user.isLoggedIn && (
                <li className="large-button">
                  <button onClick={login} className="button">
                    Go pro
                  </button>
                </li>
              )}

              {/* Show go pro button when user is not pro and is logged in that links to stripe */}
              {!user.isPro && user.isLoggedIn && (
                <li className="large-button">
                  <a href={user.stripePortalHref} className="button">
                    Go pro
                  </a>
                </li>
              )}

              {/* Show manage subscription button when user is logged in and pro */}
              {user.isPro && user.isLoggedIn && (
                <li className="large-button">
                  <a href={user.stripePortalHref} className="button button--ghost">
                    Manage subscription
                  </a>
                </li>
              )}

              {/* Show app button when user is logged in and pro */}
              {user.isPro && user.isLoggedIn && !isOnAppPage && (
                <li className="large-button">
                  <Link className="button" to="/app">
                    Create bannerset
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <div className="overlay" onClick={handleToggleNav}></div>
    </Fragment>
  )
}

export default Header
