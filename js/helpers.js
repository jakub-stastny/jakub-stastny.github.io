export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)

export function element(name, properties = {}, content) {
  const element = document.createElement(name)

  Object.entries(properties).forEach(([ key, value ]) => element[key] = value)

  if (content && content.appendChild) {
    // Nested element
    element.appendChild(content)
  } // TODO: arrays.

  return element
}
