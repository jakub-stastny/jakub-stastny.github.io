{
  customElements.define('remote-fetch',
    class extends HTMLElement {
      constructor() {
        super()

        const template = document.createElement('template')
        const response = fetch("/js/components/templates/REPLACE.html", {headers: {'Content-Type': 'text/plain'}})

        response.then((r) => r.text().then((t) => {
          template.innerHTML = t
          this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true))
        }))

        
      }
    }
  )
}