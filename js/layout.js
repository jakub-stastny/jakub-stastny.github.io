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
  "/astrology-reading": "Astrology reading",
  "/wiki": "Wiki",
  "/contact": "Contact",
}

function setTitle() {
  const href = window.location.pathname.split(".")[0]
  document.title = links[href] || $("main > h1").innerText
}

const metadata = {
  charset: "utf-8", // This doesn't work in Chrome.
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

const resources = [
  {rel: "icon", type: "image/png", href: "/img/icon.png"}
]

function addResources() {
  resources.forEach(resource => {
    const link = document.createElement("link")
    Object.entries(resource).forEach(([ key, value ]) => {
      link[key] = value
    })
    document.head.appendChild(link)
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
copyrightNote.innerHTML = `<abbr title="All the content of this website is released in the public domain. Use it as you wish.">Uncopyright</abbr> ${new Date().getFullYear()}`
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
  addResources()
}

setUp()

// Don't blink.
function replacePage(url) {
  fetch(url).then((response) => {
    response.text().then((text) => {
      const parser = new DOMParser()
      const fetchedDocument = parser.parseFromString(text, "text/html")
      const body = fetchedDocument.querySelector("body main")
      $("body main").replaceWith(body)

      // Rerun initialiser functions.
      setUp()
    })
  })
}

$$("nav a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault()
    history.pushState({}, "", a.href)
    replacePage(a.href)
  })
})

window.addEventListener("popstate", (e) => {
  replacePage(window.location.pathname)
})
