import React, { Fragment } from "react"
import GoogleLogin from "react-google-login"
import "./Login.scss"

import Header from "../../components/Header/Header"

function Login() {
  const responseGoogle = (response) => {
    console.log(response)
  }

  return (
    <Fragment>
      <Header />
      <GoogleLogin
        clientId="951357187081-ln78srsnuhgb3k4j287jhbuita5aiape.apps.googleusercontent.com"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="button button--google">
            <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"></path>
            </svg>
            <span>Login with Google</span>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M5.95 5.293l-4.24-4.24a1 1 0 10-1.42 1.41l3.54 3.54-3.54 3.54a1 1 0 000 1.41.998.998 0 00.71.29 1 1 0 00.71-.29l4.24-4.24a1 1 0 000-1.42z" fill="currentColor"></path>
            </svg>
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <h1>Dit is de Login</h1>
    </Fragment>
  )
}

export default Login
