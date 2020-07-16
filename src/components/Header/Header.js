import React from "react"
import { Link, useLocation } from "react-router-dom"

import "./Header.scss"

function Header() {
  let isOnAppPage = false
  if (useLocation().pathname === "/app") {
    isOnAppPage = true
  }

  return (
    <header>
      <nav>
        <Link to="/">SETT</Link>
        <Link to="/login" className="button button--text">
          Login
        </Link>

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
