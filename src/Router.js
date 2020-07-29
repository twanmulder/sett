import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

import Home from "./pages/Home/Home"
import App from "./pages/App/App"
import Demo from "./pages/Demo/Demo"
import Login from "./pages/Login/Login"

export const UserContext = React.createContext()

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function Router() {
  const user = {
    isLoggedIn: false,
    isPro: false,
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/demo" component={Demo} />
          <ProtectedRoute exact path="/app" user={user.isPro} component={App} redirect="/demo" />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default Router
