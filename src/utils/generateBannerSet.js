import { saveAs } from "file-saver"
import JSZip from "jszip"

const CDNScriptObject = {
  GSAP: "https://api.cdnjs.com/libraries/gsap?fields=latest",
  ThreeJS: "https://api.cdnjs.com/libraries/three.js?fields=latest",
  AnimeJS: "https://api.cdnjs.com/libraries/animejs?fields=latest",
}

async function generateFile(filePath, replacements) {
  const x = await fetch(filePath)
  const file = await x.text()
  return Object.keys(replacements).reduce((result, replacementKey) => {
    const keyToReplace = replacementKey
    const valueToInsert = replacements[replacementKey]
    return result.replace(`{{${keyToReplace}}}`, valueToInsert)
  }, file)
}

async function generateFormatFolder(zip, width, height, CDNScripts, adPlatform) {
  const folder = zip.folder(`${width}x${height}`)
  const indexHTML = await generateFile(`./templates/${adPlatform}/index.html`, {
    width,
    height,
    CDNScripts: CDNScripts.map((script) => `<script src="${script}"></script>`).join(""),
  })
  const style = await generateFile(`./templates/${adPlatform}/style.css`, {
    width,
    height,
  })
  const js = await generateFile(`./templates/${adPlatform}/main.js`, {})

  folder.file("index.html", indexHTML)
  folder.file("style.css", style)
  folder.file("main.js", js)
  folder.folder("assets")
}

async function generateZip({ projectName, adPlatform, CDNScripts, formats }) {
  var zip = new JSZip()
  const bannersetFolder = zip.folder(projectName)
  // const fallbacksFolder = bannersetFolder.folder("fallbacks")
  bannersetFolder.folder("fallbacks")
  const creativesFolder = bannersetFolder.folder("creatives")
  await Promise.all(
    formats.map(async (format) => {
      const [width, height] = format.split("x")
      await generateFormatFolder(creativesFolder, width, height, CDNScripts, adPlatform)
    })
  )
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, `${projectName}.zip`)
    changeLoaderState("finished")
  })
}

function changeLoaderState(state) {
  // var button = document.querySelector(".submit-wrapper button")
  // button.innerHTML = ""
  // if (state === "loading") {
  //   button.innerHTML =
  //     '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/> </path> </svg>'
  // }
  // if (state === "finished") {
  //   button.innerHTML = "Generate banners!"
  // }
}

async function GenerateBannerset({ projectName, adPlatform, formats, CDNScripts }) {
  const bannersetDataObject = {}
  bannersetDataObject.projectName = projectName
  bannersetDataObject.adPlatform = adPlatform
  bannersetDataObject.formats = formats
  bannersetDataObject.CDNScripts = await Promise.all(
    CDNScripts.map(async (cdnName) => {
      const latestVersion = await fetch(CDNScriptObject[cdnName])
        .then((x) => x.json())
        .then((x) => x.latest)
      return latestVersion
    })
  )

  // changeLoaderState("loading")
  generateZip(bannersetDataObject)
}

export default GenerateBannerset
