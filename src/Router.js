import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom"

import App from "./pages/App/App"
import Home from "./pages/Home/Home"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/app">
          <App />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
