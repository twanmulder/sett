import React, { Fragment, useState } from "react"

import "./App.scss"

import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

function App() {
  const [currenStep, setCurrentStep] = useState(1)
  const standardFormatsObject = [
    {
      size: "120x600",
      checked: false,
    },
    {
      size: "160x600",
      checked: false,
    },
    {
      size: "300x250",
      checked: false,
    },
    {
      size: "300x600",
      checked: false,
    },
    {
      size: "320x100",
      checked: false,
    },
    {
      size: "336x280",
      checked: false,
    },
    {
      size: "728x90",
      checked: false,
    },
    {
      size: "970x250",
      checked: false,
    },
  ]
  const [availableFormats, setAvailableFormats] = useState(standardFormatsObject)
  const [customFormatError, setCustomFormatError] = useState("\u00a0")

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

  const handleFormatChange = (size) => {
    availableFormats.forEach((format) => {
      if (format.size === size) {
        format.checked = !format.checked
        setAvailableFormats([...availableFormats])
        showNextStep(5)
      }
    })
  }

  const addCustomFormat = (event) => {
    event.preventDefault()

    const customFormatInputWidth = document.querySelector("input[name='width']")
    const customFormatInputHeight = document.querySelector("input[name='height']")
    const customFormatWidth = customFormatInputWidth.value.replace(/^0+/, "")
    const customFormatHeight = customFormatInputHeight.value.replace(/^0+/, "")
    const maxFormatCharacterLength = 4

    if (!customFormatWidth || !customFormatHeight) {
      return setCustomFormatError("Please fill in a valid custom format")
    }

    if (customFormatWidth.length > maxFormatCharacterLength || customFormatHeight.length > maxFormatCharacterLength) {
      return setCustomFormatError("The max width or height is 9999px")
    }

    if (document.querySelector("input[value='" + customFormatWidth + "x" + customFormatHeight + "']")) {
      return setCustomFormatError("This format is already available")
    }

    if (customFormatWidth.indexOf("-") > -1 || customFormatHeight.indexOf("-") > -1) {
      return setCustomFormatError("No negative formats ;)")
    }

    setCustomFormatError("\u00a0")

    const newCustomFormat = customFormatWidth + "x" + customFormatHeight
    setAvailableFormats([...availableFormats, { size: newCustomFormat, checked: true }])

    showNextStep(5)

    customFormatInputWidth.value = ""
    customFormatInputHeight.value = ""
  }

  const generateBannerset = (event) => {
    event.preventDefault()
    console.log("Generating bannerset")
  }

  return (
    <Fragment>
      <Header />
      <main>
        <h1>Generate new bannerset</h1>
        <form onSubmit={generateBannerset} autoComplete="off">
          <fieldset className="step step--1">
            <legend>What's the name of your project?</legend>
            <span>
              <label htmlFor="project-name">(If left empty, the generated template will be called "bannerset")</label>
            </span>
            <br />
            <br />
            <div className="project-name-wrapper">
              <br />
              <input type="text" id="project-name" name="Project Name" />
              <button
                className="button"
                onClick={(e) => {
                  showNextStep(2, true, e)
                }}
              >
                Next step
              </button>
            </div>
            <br />
          </fieldset>
          <fieldset className={shouldStepBeShown(2) ? "step step--2" : "step step--2 -hidden"} disabled={shouldStepBeShown(2) ? false : true}>
            <legend>What platform are you uploading the bannerset to?</legend>
            <span>(Not sure? Don't worry, you can always change this later)</span>
            <br />
            <br />
            <input
              type="radio"
              id="DCM"
              name="Ad Platform"
              value="DCM"
              onChange={(e) => {
                showNextStep(3, false, e)
              }}
            />
            <label htmlFor="DCM">Google DoubleClick (DCM)</label>
            <br />
            <input
              type="radio"
              id="Studio"
              name="Ad Platform"
              value="Studio"
              onChange={(e) => {
                showNextStep(3, false, e)
              }}
            />
            <label htmlFor="Studio">Google Studio</label>
            <br />
            <input
              type="radio"
              id="Other"
              name="Ad Platform"
              value="Other"
              onChange={(e) => {
                showNextStep(3, false, e)
              }}
            />
            <label htmlFor="Other">Other</label>
            <br />
            <br />
          </fieldset>
          <fieldset className={shouldStepBeShown(3) ? "step step--3" : "step step--3 -hidden"} disabled={shouldStepBeShown(3) ? false : true}>
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
                <p>Custom:</p>
                <div>
                  <label htmlFor="width">Width</label>
                  <input type="number" id="width" name="width" />
                  <span>px</span>
                </div>
                <br />
                <div>
                  <label htmlFor="height">Height</label>
                  <input type="number" id="height" name="height" />
                  <span>px</span>
                </div>
                <p className="error-field js-error-field">{customFormatError}</p>
                <button className="button" onClick={addCustomFormat}>
                  Add format
                </button>
              </div>
            </div>
            <br />
          </fieldset>
          <fieldset className={shouldStepBeShown(4) ? "step step--4" : "step step--4 -hidden"} disabled={shouldStepBeShown(4) ? false : true}>
            <legend>If any, what scripts are you importing via CDN?</legend>
            <span>(Automatically uses the most recent version)</span>
            <br />
            <br />
            <input type="checkbox" id="AnimeJS" name="CDN Script" value="AnimeJS" />
            <label htmlFor="AnimeJS">Anime.js</label>
            <br />
            <input type="checkbox" id="GSAP" name="CDN Script" value="GSAP" />
            <label htmlFor="GSAP">GreenSock Animation Platform (GSAP)</label>
            <br />
            <input type="checkbox" id="ThreeJS" name="CDN Script" value="ThreeJS" />
            <label htmlFor="ThreeJS">Three.js</label>
            <br />
            <br />
          </fieldset>
          <div className={shouldStepBeShown(5) ? "submit-wrapper step--5" : "submit-wrapper step--5 -hidden"}>
            <p className="submit-error js-submit-error">&nbsp;</p>
            <button className="button" disabled={shouldStepBeShown(5) ? false : true}>
              Generate banners!
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </Fragment>
  )
}

export default App
