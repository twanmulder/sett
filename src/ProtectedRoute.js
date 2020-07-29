import React from "react"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  const redirectPathName = { ...rest }.redirect
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...rest} {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: redirectPathName,
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
