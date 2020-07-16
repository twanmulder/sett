import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom"

import Home from "./pages/Home/Home"
import App from "./pages/App/App"
import Login from "./pages/Login/Login"

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
        <Route exact path="/" component={Home} />
        <Route exact path="/app" component={App} />
        <Route exact path="/login" component={Login} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
