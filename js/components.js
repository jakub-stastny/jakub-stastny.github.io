import { rewriteLinks } from "/js/propagate-qs.js"
import { inDev, parseQS, tag } from "/js/helpers.js"
import context from "/js/context.js"

function convertToJSCase(string) {
  return string.replace(/-([a-z])/g, (_, a) => a.toUpperCase())
}

function renderTemplate(string, context) {
  return string.replace(/\{([a-zA-Z-]+)\}/g, (_, keyword) => (convertToJSCase(keyword) in context) ? context[convertToJSCase(keyword)] : console.error(`Unknown context var: ${keyword}`))
}

// Module scripts are executed asynchronously.
function generateTagClone(varName, templateName, script) {
  const lines = [
    "import { _init } from '/js/component-helpers.js'",
    "import { rewriteLinks } from '/js/propagate-qs.js'",
    `const customExports = _init(${varName}, '${templateName}', '${script.getAttribute('name')}')`,
    "Object.entries(customExports).map(([ fnName, fn ]) => window[fnName] = fn)", // I think this will rewrite the one on window, we need local scope, maybe using eval.
    script.text.
      replace(/customElement/g, varName).
      replace(/shadowRoot/g, `${varName}.shadowRoot`),
    `rewriteLinks(${varName}.shadowRoot)`]

  return tag('script', {type: 'module', text: lines.join("\n")})
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
            const varName = `sr${Math.floor(Math.random() * 100000)}`
            window[varName] = this
            this.shadowRoot.appendChild(generateTagClone(varName, name, script))
          })

          this.callback(this)
        }))
      }

      callback(customElement) {
        if (callback) {
          console.log(`Running callback for %c${name}%c.`, 'color:#87CEEB', 'color:#fff')
          callback(customElement.shadowRoot, customElement)
        }

        // rewriteLinks(customElement.shadowRoot)
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
defineComponent('copy-healing')
defineComponent('corner-ribbon')
defineComponent('cta-button')
defineComponent('debug-info', hideInProduction)
defineComponent('feedback-form')
defineComponent('leader-image')
defineComponent('repeated-sessions')
defineComponent('site-footer')
defineComponent('site-header')
defineComponent('stay-in-touch')
defineComponent('thank-you')
defineComponent('user-testimonial')
defineComponent('user-testimonials', hideInProduction)
defineComponent('write-testimonial')