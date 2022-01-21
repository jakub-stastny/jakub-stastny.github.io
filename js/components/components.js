{
  function defineComponent(name, callback) {
    customElements.define(name,
      class extends HTMLElement {
        constructor() {
          super()
        
          const template = document.createElement('template')
          const response = fetch(`/js/components/templates/${name}.html`, {headers: {'Content-Type': 'text/plain'}})

          response.then((res) => res.text().then((text) => {
            template.innerHTML = text
            this.attachShadow({mode: 'open'}).
              appendChild(template.content.cloneNode(true))

            if (callback) callback(this.shadowRoot, this)
          }))
        }
      }
    )
  }
  
  function hideInProduction() {
    return (shadowRoot) => {
      if (!inDev()) shadowRoot.replaceChildren()
    }
  }

  defineComponent('site-header', (shadowRoot) => {
    if (location.pathname.match(/^\/(index\.html)?$/)) {
      shadowRoot.querySelector('#link').removeAttribute('href')
    }
  })

  defineComponent('site-footer', (shadowRoot) => {
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

  defineComponent('stay-in-touch')
  defineComponent('user-testimonials', hideInProduction)
  defineComponent('user-testimonial')
  defineComponent('cta-button')
}