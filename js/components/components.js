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

            if (callback) callback.call(this)
          }))
        }
      }
    )
  }

  defineComponent('site-header', () => {
    if (location.pathname.match(/^\/(index\.html)?$/)) {
      this.shadowRoot.querySelector('#link').removeAttribute('href')
    }
  })

  defineComponent('site-footer', () => {
    function hideElement(element) {
      console.log("Hidding", element)
      element.style.display = 'none'
    }
  
    function isApplePlatform() {
      return navigator.userAgent.match(/iPad|iPhone|iPod|/) || navigator.platform === 'MacIntel'
    }

    /* Hide iMessage on non-Apple platforms. */
    if (!isApplePlatform()) {
      this.shadowRoot.querySelectorAll('.imessage').forEach(element => hideElement(element))
    }
  })

  defineComponent('stay-in-touch')
  defineComponent('user-testimonials')
}