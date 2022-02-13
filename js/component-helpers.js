export function _init(shadowRoot, templateName, scriptName) {
  console.log(`Executing script %c${templateName}%c::%c${scriptName}%c.`, 'color:#87CEEB', 'color:#fff', 'color:#FFD700', 'color:#fff')

  function $(selector) {
    const element = shadowRoot.querySelector(selector)
    if (!element) console.error(`Selector %c${selector}%c not found.`, 'color:#FF0000', 'color:#fff')
    return element
  }

  const $$ = shadowRoot.querySelectorAll.bind(shadowRoot)
  
  return {$, $$}
}