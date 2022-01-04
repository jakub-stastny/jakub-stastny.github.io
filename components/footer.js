const template = document.createElement('template')
template.innerHTML = `
  <style>
    background-color: lightblue;
  </style>

  <footer>
    <a href="/contact">Contact</a>
  </footer>`

customElements.define('Footer',
  class extends HTMLElement {
    constructor() {
      super()

      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(template.content.cloneNode(true))
    }
  }
)