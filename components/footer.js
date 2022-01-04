{
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      footer { background-color: lightblue; }
    </style>

    <footer>
      <a id="link" href="/contact">Contact</a>
    </footer>`

  customElements.define('main-footer',
    class extends HTMLElement {
      constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'})
          .appendChild(template.content.cloneNode(true))
          
        if (location.pathname.match(/^\/contact(\.html)?/)) {
          const link = shadowRoot.querySelector('#link')
          link.removeAttribute('href')
        }
      }
    }
  )
}
