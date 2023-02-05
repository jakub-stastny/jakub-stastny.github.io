import { $, $$, element } from "./helpers.js"

export function replacePage(url, setUpPage) {
  fetch(url).then((response) => {
    response.text().then((text) => {
      const parser = new DOMParser()
      const fetchedDocument = parser.parseFromString(text, "text/html")
      const body = fetchedDocument.querySelector("body main")

      // Replace the main body.
      $("body main").replaceWith(body)

      // Rerun initialiser functions.
      setUpPage()
    })
  })
}
