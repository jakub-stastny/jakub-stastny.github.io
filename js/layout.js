const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Show current year in the copyright.
const year = new Date().getFullYear()
$(".year").innerText = year.toString()

// Disable current route in navigation.
function makeCurrentRouteNotClickable() {
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

makeCurrentRouteNotClickable()

// Rewrite development URLs to include .html.
if (location.port !== "") {
  $$("nav a[href^='/']").forEach((a) => {
    const route = new URL(a.href)
    if (route.pathname !== "/") {
      a.href = `${a.href}.html`
    }
  })
}

// Don't blink.
$$("nav a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault()
    history.pushState({}, "", a.href)
    fetch(a.href).then((response) => {
      response.text().then((text) => {
        const fetchedDocument = document.createElement("html")
        fetchedDocument.innerHTML = text
        const body = fetchedDocument.querySelector("body main")
        $("body main").replaceWith(body)
        console.log(document.title)
        document.title = fetchedDocument.querySelector("title")
        console.log(document.title) /* FIXME */

        // Rerun initialiser functions.
        makeCurrentRouteNotClickable()
      })
    })
  })
})
