window.onload = function () {
  if (Enabler.isInitialized()) {
    enablerInitHandler()
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler)
  }
}

// Runs when Enabler is ready.
function enablerInitHandler() {
  if (Enabler.isPageLoaded()) {
    politeInit()
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit)
  }
}

// Runs when the page is completely loaded.
function politeInit() {
  var container = document.getElementById("container")

  container.addEventListener("click", function (event) {
    Enabler.exit("Container Exit")
  })
}
