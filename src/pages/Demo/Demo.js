import React, { Fragment, useState } from "react"
import { useHistory } from "react-router-dom"
import netlifyIdentity from "netlify-identity-widget"
import demoAdFormats from "../../utils/demoAdFormats"
import GenerateBannerset from "../../utils/generateBannerSet"

import "./Demo.scss"

import Footer from "../../components/Footer/Footer"

function Demo(props) {
  const [currenStep, setCurrentStep] = useState(1)
  const [adPlatform, setAdPlatform] = useState({ selectedOption: null })
  const [availableFormats, setAvailableFormats] = useState(demoAdFormats)
  const [generateBannerSetError, setGenerateBannerSetError] = useState("\u00a0")
  const user = props.user

  let history = useHistory()
  if (user.isPro) {
    history.push("/app")
  }

  const login = (event) => {
    event.preventDefault()
    netlifyIdentity.open("login")
  }

  const showNextStep = (nextStep, preventDefault, event) => {
    if (preventDefault) {
      event.preventDefault()
    }

    if (nextStep > currenStep) {
      setCurrentStep(nextStep)
    }
  }

  const shouldStepBeShown = (step) => {
    if (step <= currenStep) {
      return true
    }
    return false
  }
  const handleAdPlatformChange = (event) => {
    const radioButtonValue = event.target.value
    setAdPlatform((state) => ({ ...state, selectedOption: radioButtonValue }))
    showNextStep(2)
  }

  const handleFormatChange = (size) => {
    availableFormats.forEach((format) => {
      if (format.size === size) {
        format.checked = !format.checked
        setAvailableFormats([...availableFormats])
        showNextStep(4)
      }
    })
  }

  const generateBannerSet = (event) => {
    event.preventDefault()

    const name = "demo-bannerset"
    const platform = adPlatform.selectedOption
    const scripts = []
    const formats = []
    availableFormats.forEach((format) => {
      if (format.checked) {
        formats.push(format.size)
      }
    })

    if (formats.length === 0) {
      return setGenerateBannerSetError("Looks like you haven't selected any formats")
    } else {
      setGenerateBannerSetError("\u00a0")
    }

    GenerateBannerset({ projectName: name, adPlatform: platform, formats: formats, CDNScripts: scripts })
  }

  return (
    <Fragment>
      <main className="app">
        <h1>Generate new bannerset</h1>
        <form onSubmit={generateBannerSet} autoComplete="off">
          <fieldset className={shouldStepBeShown(1) ? "step step--1" : "step step--1 -hidden"} disabled={shouldStepBeShown(1) ? false : true}>
            <legend>What platform are you uploading the bannerset to?</legend>
            <span>(Not sure? Don't worry, you can always change this later)</span>
            <br />
            <br />
            <input type="radio" id="DCM" name="Ad Platform" value="DCM" checked={adPlatform.selectedOption === "DCM"} onChange={handleAdPlatformChange} />
            <label htmlFor="DCM">Google DoubleClick (DCM)</label>
            <br />
            <input type="radio" id="Studio" name="Ad Platform" value="Studio" checked={adPlatform.selectedOption === "Studio"} onChange={handleAdPlatformChange} />
            <label htmlFor="Studio">Google Studio</label>
            <br />
            <input type="radio" id="Other" name="Ad Platform" value="Other" checked={adPlatform.selectedOption === "Other"} onChange={handleAdPlatformChange} />
            <label htmlFor="Other">Other</label>
            <br />
            <br />
          </fieldset>
          <fieldset className={shouldStepBeShown(2) ? "step step--2" : "step step--2 -hidden"} disabled={shouldStepBeShown(2) ? false : true}>
            <legend>What formats do you need?</legend>
            <span>(Formats are sized in pixels)</span>
            <br />
            <br />
            <div className="format-wrapper js-format-wrapper">
              <div>
                {availableFormats.map((format, index) => {
                  return (
                    <Fragment key={index}>
                      <input
                        type="checkbox"
                        id={format.size}
                        name="Banner size"
                        value={format.size}
                        checked={format.checked}
                        onChange={() => {
                          handleFormatChange(format.size)
                        }}
                      />
                      <label htmlFor={format.size}> {format.size}</label>
                      <br />
                    </Fragment>
                  )
                })}
              </div>
              <div>
                <section className="section-demo-formats">
                  <p>More and custom formats are available for pro users</p>
                  {!user.isPro && !user.isLoggedIn && (
                    <button onClick={login} className="button">
                      Go pro
                    </button>
                  )}
                  {!user.isPro && user.isLoggedIn && (
                    <a href={user.stripePortalHref} className="button">
                      Go pro
                    </a>
                  )}
                </section>
              </div>
            </div>
            <br />
          </fieldset>

          <fieldset className={shouldStepBeShown(3) ? "step step--3 demo-features" : "step step--3 demo-features -hidden"} disabled={shouldStepBeShown(3) ? false : true}>
            <legend>Pro features</legend>
            <br />
            <p className="plan-lead">For the individuals and teams that want to customize and improve their generated templates.</p>
            <ul className="plan-features">
              <li>
                <div className="plan-svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                    <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <p>Add custom formats</p>
              </li>
              <li>
                <div className="plan-svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                    <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <p>Import scripts via CDN</p>
              </li>
              <li>
                <div className="plan-svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                    <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <p>Custom project name</p>
              </li>
            </ul>
            <br />
            {!user.isPro && !user.isLoggedIn && (
              <button
                onClick={(e) => {
                  login(e)
                }}
                className="button"
              >
                Go pro
              </button>
            )}
            {!user.isPro && user.isLoggedIn && (
              <a href={user.stripePortalHref} className="button">
                Go pro
              </a>
            )}
            <br />
            <br />
          </fieldset>

          <div className={shouldStepBeShown(3) ? "submit-wrapper step--3" : "submit-wrapper step--3 -hidden"}>
            <p className="submit-error">{generateBannerSetError}</p>
            <button className="button button--lowercase" disabled={shouldStepBeShown(3) ? false : true}>
              Generate banners!
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Demo
