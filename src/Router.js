import React from "react"
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import App from "./pages/App"
import Home from "./pages/Home"

function Router() {
  return ( 
    <BrowserRouter>
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