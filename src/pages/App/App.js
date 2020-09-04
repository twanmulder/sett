import React, { Fragment, useState } from "react"
import standardAdFormats from "../../utils/standardAdFormats"
import GenerateBannerset from "../../utils/generateBannerSet"

import "./App.scss"

import Footer from "../../components/Footer/Footer"

function App() {
  const [currenStep, setCurrentStep] = useState(1)
  const [projectName, setProjectName] = useState("")
  const [adPlatform, setAdPlatform] = useState({ selectedOption: null })
  const [availableFormats, setAvailableFormats] = useState(standardAdFormats)
  const [customFormatError, setCustomFormatError] = useState("\u00a0")
  const [generateBannerSetError, setGenerateBannerSetError] = useState("\u00a0")
  const [CDNScripts, setCDNScripts] = useState({
    GSAP: { name: "GreenSock Animation Platform (GSAP)", checked: false },
    ThreeJS: { name: "Three.js", checked: false },
    AnimeJS: { name: "Anime.js", checked: false },
  })

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

  const handleProjectName = (event) => {
    setProjectName(event.target.value)
  }

  const handleAdPlatformChange = (event) => {
    const radioButtonValue = event.target.value
    setAdPlatform((state) => ({ ...state, selectedOption: radioButtonValue }))
    showNextStep(3)
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

  const handleCDNChange = ({ target }) => {
    setCDNScripts((state) => ({ ...state, [target.name]: { checked: !state[target.name].checked, name: state[target.name].name } }))
  }

  const generateBannerSet = (event) => {
    event.preventDefault()

    const name = projectName || "bannerset"
    const platform = adPlatform.selectedOption
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

    const scripts = []
    Object.entries(CDNScripts).forEach(([key, val]) => {
      if (val.checked) {
        scripts.push(key)
      }
    })

    GenerateBannerset({ projectName: name, adPlatform: platform, formats: formats, CDNScripts: scripts })
  }

  return (
    <Fragment>
      <main className="app">
        <h1>Generate new bannerset</h1>
        <form onSubmit={generateBannerSet} autoComplete="off">
          <fieldset className="step step--1">
            <legend>What's the name of your project?</legend>
            <span>
              <label htmlFor="project-name">(If left empty, the generated template will be called "bannerset")</label>
            </span>
            <br />
            <br />
            <div className="project-name-wrapper">
              <br />
              <input type="text" id="project-name" name="Project Name" onChange={handleProjectName} value={projectName} />
              <button
                className="button button--lowercase"
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
                  <input type="number" id="width" name="width" min="1" />
                  <span>px</span>
                </div>
                <br />
                <div>
                  <label htmlFor="height">Height</label>
                  <input type="number" id="height" name="height" min="1" />
                  <span>px</span>
                </div>
                <p className="error-field js-error-field">{customFormatError}</p>
                <button className="button button--lowercase" onClick={addCustomFormat}>
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
            {Object.keys(CDNScripts).map((key) => (
              <Fragment key={key}>
                <input onChange={handleCDNChange} type="checkbox" id={key} name={key} checked={CDNScripts[key].checked} />
                <label htmlFor={key}>{CDNScripts[key].name}</label>
                <br />
              </Fragment>
            ))}
            <br />
          </fieldset>
          <div className={shouldStepBeShown(5) ? "submit-wrapper step--5" : "submit-wrapper step--5 -hidden"}>
            <p className="submit-error">{generateBannerSetError}</p>
            <button className="button button--lowercase" disabled={shouldStepBeShown(5) ? false : true}>
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
