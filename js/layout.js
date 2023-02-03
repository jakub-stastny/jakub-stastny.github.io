const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const header = document.createElement("header")

// Set logo.
// const logo = document.createElement("img")
// logo.src = "/img/logo.png"
// header.appendChild(logo)

const nav = document.createElement("nav")
const navLinks = document.createElement("ul")
nav.appendChild(navLinks)

document.body.prepend(nav)
document.body.prepend(header)

// Navigation links.
// TODO: Shorten for small displays, it doesn't fit on one line (Astrology readings -> Readings etc)
const links = {
  "/about": "About me",
  "/astrology": "Astrology readings",
  "/wiki": "Wiki",
  "/contact": "Contact",
}

function setTitle() {
  const href = window.location.pathname.split(".")[0]
  document.title = links[href]
}

// Doesn't work for charset, at least not in Chrome.
const metadata = {
  viewport: "width=device-width, initial-scale=1.0"
}

function setMetadata() {
  Object.entries(metadata).forEach(([ key, value ]) => {
    const meta = document.createElement("meta")
    meta.name = key
    meta.content = value
    document.head.appendChild(meta)
  })
}

Object.entries(links).forEach(([ href, label ]) => {
  const li = document.createElement("li")
  const anchor = document.createElement("a")
  anchor.href = href
  anchor.innerText = label
  li.appendChild(anchor)
  navLinks.appendChild(li)
})

const footer = document.createElement("footer")
document.body.appendChild(footer)

const copyrightNote = document.createElement("div")
copyrightNote.innerHTML = `&copy; ${new Date().getFullYear()} Jakub Šťastný`
footer.appendChild(copyrightNote)

// Disable current route link in navigation.
function disableCurrentRouteLink() {
  const currentRoute = location.pathname.replace(/\.html$/, "")
  $$("nav a").forEach((a) => {
    const route = new URL(a.href.replace(/\.html$/, ""))
    if (route.pathname === currentRoute) {
      a.classList.add("inactive")
    } else if (a.classList.contains("inactive")) {
      a.classList.remove("inactive")
    }
  })
}

// Rewrite development URLs to include .html.
function rewriteDevelopmentURLs() {
  if (location.port !== "") {
    $$("a[href^='/']").forEach((a) => {
      const route = new URL(a.href)
      if (route.pathname !== "/") {
        a.href = `${a.href}.html`
      }
    })
  }
}

if (window.location.pathname.split("/")[1] === "wiki") {
  const stylesheet = document.createElement("link")
  stylesheet.rel = "stylesheet"
  stylesheet.href = "/css/wiki.css"
  document.head.appendChild(stylesheet)
}

function setUp() {
  disableCurrentRouteLink()
  rewriteDevelopmentURLs()
  setTitle()
  setMetadata()
}

setUp()

// Don't blink.
$$("nav a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault()
    history.pushState({}, "", a.href)
    fetch(a.href).then((response) => {
      response.text().then((text) => {
        const parser = new DOMParser()
        const fetchedDocument = parser.parseFromString(text, "text/html")
        const body = fetchedDocument.querySelector("body main")
        $("body main").replaceWith(body)
        document.title = fetchedDocument.title

        // Rerun initialiser functions.
        setUp()
      })
    })
  })
})
