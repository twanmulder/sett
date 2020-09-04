import React, { useEffect, useState } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import netlifyIdentity from "netlify-identity-widget"
import ProtectedRoute from "./ProtectedRoute"

import Home from "./pages/Home/Home"
import App from "./pages/App/App"
import Demo from "./pages/Demo/Demo"

import Header from "./components/Header/Header"

let hasDoneInit = false

function Router() {
  const [user, setUser] = useState({
    stripePortalHref: null,
    isLoggedIn: false,
    isPro: false,
  })

  const getStripePortalHref = async (netlifyUser) => {
    const response = await fetch("/.netlify/functions/create-manage-link", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${netlifyUser.token.access_token}`,
      },
    })
    const json = await response.json()
    return json
  }

  const getIfUserIsPro = async (netlifyUser) => {
    const token = netlifyUser ? await netlifyIdentity.currentUser().jwt(true) : false
    const response = await fetch("/.netlify/functions/get-user-role", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    if (json === "Pro") {
      return true
    }
    return false
  }

  const updateUserInfo = async (netlifyUser) => {
    if (netlifyUser) {
      const stripePortalHref = await getStripePortalHref(netlifyUser)
      const isPro = await getIfUserIsPro(netlifyUser)
      setUser({ ...user, stripePortalHref: stripePortalHref, isLoggedIn: true, isPro: isPro })
    } else {
      setUser({ ...user, stripePortalHref: null, isLoggedIn: false, isPro: false })
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
        <Route exact path="/" render={(props) => <Home {...props} user={user} />} />
        <Route exact path="/demo" render={(props) => <Demo {...props} user={user} />} />
        <ProtectedRoute exact path="/app" user={user.isPro} component={App} redirect="/demo" />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
