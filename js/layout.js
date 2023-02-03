const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Show current year in the copyright.
const year = new Date().getFullYear()
$(".year").innerText = year.toString()

const header = document.createElement("header")

// Set logo.
const logo = document.createElement("img")
logo.src = "/img/logo.png"
header.appendChild(logo)

const nav = document.createElement("nav")
const navLinks = document.createElement("ul")
nav.appendChild(navLinks)

document.body.prepend(nav)
document.body.prepend(header)

// Navigation links.
const links = {"/about": "About me", "/contact": "Contact", "/astrology": "Astrology readings"}

Object.entries(links).forEach(([ href, label ]) => {
  const li = document.createElement("li")
  const anchor = document.createElement("a")
  anchor.href = href
  anchor.innerText = label
  li.appendChild(anchor)
  navLinks.appendChild(li)
})

// <li><a href="/">Home</a></li>
// <li><a href="/about">About me</a></li>
// <li><a href="/contact">Contact</a></li>

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

function setUp() {
  disableCurrentRouteLink()
  rewriteDevelopmentURLs()
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
