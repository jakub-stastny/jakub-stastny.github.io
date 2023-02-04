import { $, $$, element } from "./helpers.js"

import("./google-analytics.js")

const nav = element("nav", {}, element("ul"))

document.body.prepend(nav)
document.body.prepend(element("header"))

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
  document.head.appendChild(
    element("link", {rel: "stylesheet", href: "/css/wiki.css"}))
}

function setUp() {
  disableCurrentRouteLink()
  setTitle()
  setMetadata()
  addResources()
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
