import React from "react"
import { Link } from "react-router-dom"

import "./Header.scss"

function Header() {
  return (
    <header>
      <nav>
        <a href="index.html">SETT</a>
        <Link to="/app" className="button button--ghost">
          Free demo
        </Link>
        <a class="button" href="/app">
          Go pro
        </a>
      </nav>
    </header>
  )
}

export default Header
