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

      callback() {
        if (callback) {
          const result = callback()
          console.log(`Rendering %c${name}%c: %c${result}%c.`, 'color:#87CEEB', 'color:#fff')
        }
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

function dontRenderInProduction() {
  return (!parseQS().debug && !inDev())
}

/* Components */
defineComponent('contact-card')
defineComponent('copy-about-me')
defineComponent('copy-healing')
defineComponent('corner-ribbon')
defineComponent('cta-button')
defineComponent('debug-info', dontRenderInProduction)
defineComponent('feedback-form')
defineComponent('leader-image')
defineComponent('repeated-sessions')
defineComponent('site-footer')
defineComponent('site-header')
defineComponent('stay-in-touch')
defineComponent('thank-you')
defineComponent('user-testimonial')
defineComponent('user-testimonials')
defineComponent('write-testimonial')