import React, { useEffect, useState } from "react"
import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom"
import netlifyIdentity from "netlify-identity-widget"
import ProtectedRoute from "./ProtectedRoute"

import Home from "./pages/Home/Home"
import App from "./pages/App/App"
import Demo from "./pages/Demo/Demo"
import Login from "./pages/Login/Login"

import Header from "./components/Header/Header"

let hasDoneInit = false

function Router() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    isPro: false,
  })

  const updateUserInfo = (netlifyUser) => {
    if (netlifyUser) {
      setUser({ ...user, isLoggedIn: true })
    } else {
      setUser({ ...user, isLoggedIn: false })
    }
  }

  const handleUserStateChange = (user) => {
    updateUserInfo(user)
  }

  netlifyIdentity.on("init", handleUserStateChange)
  netlifyIdentity.on("login", handleUserStateChange)
  netlifyIdentity.on("logout", handleUserStateChange)

  useEffect(() => {
    if (!hasDoneInit) {
      hasDoneInit = true
      netlifyIdentity.init()
    }
  })

  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/demo" user={!user.isPro} component={Demo} redirect="/app" />
        <ProtectedRoute exact path="/app" user={user.isPro} component={App} redirect="/demo" />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
