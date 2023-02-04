import { element } from "./helpers.js"

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
