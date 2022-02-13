import { rewriteLinks } from "/js/propagate-qs.js"
import { inDev, parseQS, tag } from "/js/helpers.js"
import context from "/js/context.js"

function convertToJSCase(string) {
  return string.replace(/-([a-z])/g, (_, a) => a.toUpperCase())
}

function renderTemplate(string, context) {
  return string.replace(/\{([a-zA-Z-]+)\}/g, (_, keyword) => (convertToJSCase(keyword) in context) ? context[convertToJSCase(keyword)] : console.error(`Unknown context var: ${keyword}`))
}

function defineComponent(name, callback) {
  customElements.define(name,
    class extends HTMLElement {
      constructor() {
        super()

        this.fetchTemplate().then((res) => res.text().then((text) => {
          const template = tag('template', {innerHTML: renderTemplate(text, context)})
          this.attachShadow({mode: 'open'}).
            appendChild(template.content.cloneNode(true))

          this.shadowRoot.querySelectorAll('script').forEach(script => {
            console.log(`Executing script %c${name}%c::%c${script.getAttribute('name')}%c.`, 'color:#87CEEB', 'color:#fff', 'color:#FFD700', 'color:#fff')
            const clone = tag('script', {type: 'module', text: script.text})
            this.shadowRoot.appendChild(clone)
          })

          this.callback(this)
        }))
      }

      callback(customElement) {
        if (callback) {
          console.log(`Running callback for %c${name}%c.`, 'color:#87CEEB', 'color:#fff')
          callback(customElement.shadowRoot, customElement)
        }

        rewriteLinks(customElement.shadowRoot)
      }

      fetchTemplate() {
        return fetch(`/js/templates/${name}.html`, {headers: {'Content-Type': 'text/plain'}})
      }

      attributeChangedCallback() {
        console.log("Change", this, arguments)
        this.callback(this)
      }
    }
  )
}

function hideInProduction(shadowRoot) {
  if (!parseQS().debug && !inDev()) {
    shadowRoot.replaceChildren()
  }
}

/* Components */
defineComponent('contact-card')
defineComponent('copy-about-me')

defineComponent('copy-healing', (shadowRoot, customElement) => { // TODO: move to the template.
  const link = customElement.getAttribute('leader')
  shadowRoot.querySelector('leader-image').setAttribute('src', link)
})

defineComponent('corner-ribbon', (shadowRoot, customElement) => { // TODO: move to the template.
  const link = customElement.getAttribute('link')
  shadowRoot.querySelector('a').setAttribute('href', link)
})

defineComponent('cta-button')
defineComponent('debug-info', hideInProduction)

defineComponent('leader-image', (shadowRoot, customElement) => { // TODO: move to the template.
  const link = customElement.getAttribute('src')
  shadowRoot.querySelector('img').setAttribute('src', link)
})

defineComponent('site-footer', (shadowRoot) => {
  // TODO: Move into the template.
  function hideElement(element) {
    console.log("Hidding", element)
    element.style.display = 'none'
  }

  function isApplePlatform() {
    return navigator.userAgent.match(/iPad|iPhone|iPod|/) || navigator.platform === 'MacIntel'
  }

  /* Hide iMessage on non-Apple platforms. */
  if (!isApplePlatform()) {
    shadowRoot.querySelectorAll('.imessage').forEach(element => hideElement(element))
  }
})

defineComponent('site-header', (shadowRoot) => {
  // TODO: Move into the template.
  if (location.pathname.match(/^\/(index\.html)?$/)) {
    shadowRoot.querySelector('#link').removeAttribute('href')
  }
})

defineComponent('stay-in-touch')
defineComponent('user-testimonials', hideInProduction)
defineComponent('user-testimonial')