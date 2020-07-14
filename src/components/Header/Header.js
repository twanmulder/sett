import React from "react"

import "./Header.scss"

function Header() {
  return (
    <header>
      <div>
        <a href="/login">Login</a>
      </div>
      <nav>
        <a href="index.html">SETT</a>
        <a class="button button--ghost" href="/demo">
          Free demo
        </a>
        <a class="button" href="/app">
          Go pro
        </a>
      </nav>
    </header>
  )
}

export default Header
