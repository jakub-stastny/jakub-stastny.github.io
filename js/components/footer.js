{
  function hideElement(element) {
    console.log("Hidding", element)
    element.style.display = 'none'
  }
  
  function isApplePlatform() {
    return navigator.userAgent.match(/iPad|iPhone|iPod|/) || navigator.platform === 'MacIntel'
  }

  customElements.define('main-footer',
    class extends HTMLElement {
      constructor() {
        super()

        const template = document.createElement('template')
        const response = fetch("/js/components/templates/footer.html", {headers: {'Content-Type': 'text/plain'}})

        response.then((r) => r.text().then((t) => {
          template.innerHTML = t
          this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true))

          /* Hide iMessage on non-Apple platforms. */
          if (!isApplePlatform()) {
            this.shadowRoot.querySelectorAll('.imessage').forEach(element => hideElement(element))
          }
        }))
      }
    }
  )
}