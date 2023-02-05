import { $, $$, element } from "./helpers.js"

import("./google-analytics.js")

const nav = element("nav", {}, element("ul"))
const header = element("header")

document.body.prepend(nav)
document.body.prepend(header)

const logo = element("img", {src: "/img/logo.png"})
header.appendChild(logo)

function resizeBackgroundImage() {
  logo.style.visibility = "visible"
  // console.log(`${logo.width}x${logo.height}`)
  logo.style.width = "100%" // Fit into the header.
  header.style.height = `${logo.height}px`
  console.log(`${logo.width}x${logo.height}`)
  logo.style.visibility = "hidden"
}

logo.addEventListener("load", resizeBackgroundImage)
window.addEventListener("resize", resizeBackgroundImage)

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

function setBodyID() {
  const page = window.location.pathname.split("/").slice(-1)[0]
  $("body").id = `${page}-page`
}

const metadata = {
  charset: "utf-8", // This doesn't work in Chrome.
  viewport: "width=device-width, initial-scale=1.0"
}

Object.entries(metadata).forEach(([ key, value ]) => {
  document.head.appendChild(element("meta", {name: key, content: value}))
})

document.head.appendChild(
  element("link", {rel: "icon", type: "image/png", href: "/img/icon.png"}))

/* Display navigation links. */
Object.entries(links).forEach(([ href, label ]) => {
  nav.querySelector("ul").appendChild(
    element("li", {},
      element("a", {href: href, innerText: label})))
})

/* Footer. */
document.body.appendChild(element("footer", {},
  element("div", {innerHTML: `<abbr title="All the content of this website is released in the public domain. Use it as you wish.">Uncopyright</abbr> ${new Date().getFullYear()}`})))

/* Disable current route link in navigation. */
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

/* Include wiki-specific CSS. */
if (window.location.pathname.split("/")[1] === "wiki") {
  import("./wiki.js")
}

function setUp() {
  disableCurrentRouteLink()
  setTitle()
  setBodyID()
}

/* Replace pages without re-rendering. */
import("./replace-page.js").then((module) => {

  $$("nav a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault()
      history.pushState({}, "", a.href)
      module.replacePage(a.href, setUp)
    })
  })

  window.addEventListener("popstate", (e) => {
    module.replacePage(window.location.pathname, setUp)
  })
})

setUp()
