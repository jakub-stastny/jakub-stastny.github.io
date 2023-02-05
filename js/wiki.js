import { $, $$, element } from "./helpers.js"

document.head.appendChild(
  element("link", {rel: "stylesheet", href: "/css/wiki.css"}))

// I might consider it for all the pages.
import("/js/cdn/marked.min.js").then((module) => {
  $$("pre.markdown").forEach((pre) => {
    // FIXME: this won't work for code and quotes, that are based on left whitespace.
    const markdown = pre.innerText.split("\n").map(line => line.trim()).join("\n")
    // TODO: /\b(a|the|I) /i -> /\1\&nbsp;/
    const html = marked.parse(markdown)
    window.markdown = markdown
    const div = element("div", {innerHTML: html})
    pre.parentNode.replaceChild(div, pre)
  })
})
