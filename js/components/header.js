{
  const template = document.createElement('template')
  template.innerHTML = `
  `

  customElements.define('main-header',
    class extends HTMLElement {
      constructor() {
        super()

        const template = document.createElement('template')
        const response = fetch("/js/components/templates/header.html", {headers: {'Content-Type': 'text/plain'}})

        response.then((r) => r.text().then((t) => {
          template.innerHTML = t
          this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true))

          if (location.pathname.match(/^\/(index\.html)?$/)) {
            this.shadowRoot.querySelector('#link').removeAttribute('href')
          }
        }))
      }
    }
  )
}