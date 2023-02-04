const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function element(name, properties = {}, content) {
  const element = document.createElement(name)

  Object.entries(properties).forEach(([ key, value ]) => element[key] = value)

  if (content && content.appendChild) {
    // Nested element
    element.appendChild(content)
  } // TODO: arrays.

  return element
}

// Google Analytics
if (location.port === "") {
  document.head.appendChild(
    element("script", {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-KQSJ36RMR3"}))

  window.dataLayer = window.dataLayer || []
  function gtag() { dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', 'G-KQSJ36RMR3')
}

const header = element("header")
const nav = element("nav", {}, element("ul"))

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
    document.head.appendChild(element("meta", {name: key, content: value}))
  })
}

const resources = [
  {rel: "icon", type: "image/png", href: "/img/icon.png"}
]

function addResources() {
  resources.forEach(resource => {
    document.head.appendChild(element("link", resource))
  })
}

Object.entries(links).forEach(([ href, label ]) => {
  nav.querySelector("ul").appendChild(
    element("li", {},
      element("a", {href: href, innerText: label})))
})


document.body.appendChild(element("footer", {},
  element("div", {innerHTML: `<abbr title="All the content of this website is released in the public domain. Use it as you wish.">Uncopyright</abbr> ${new Date().getFullYear()}`})))

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

if (window.location.pathname.split("/")[1] === "wiki") {
  document.head.appendChild(
    element("link", {rel: "stylesheet", href: "/css/wiki.css"}))
}

function setUp() {
  disableCurrentRouteLink()
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
