const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const year = new Date().getFullYear()
$(".year").innerText = year.toString()

const currentRoute = location.pathname.replace(/\.html$/, "")
$$("nav a").forEach((a) => {
  const route = new URL(a.href)
  if (route.pathname === currentRoute) {
    a.classList.add("inactive")
    console.log(a)
    window.a = a
  }
})
