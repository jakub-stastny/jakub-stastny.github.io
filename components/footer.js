{
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      footer {
        background-color: lightblue;
        height: 50px;
      }
    </style>

    <footer>
      <a id="link" href="/contact">Contact</a>
    </footer>`

  customElements.define('main-footer',
    class extends HTMLElement {
      constructor() {
        super()

        this.attachShadow({mode: 'open'})
          .appendChild(template.content.cloneNode(true))
          
        if (location.pathname.match(/^\/contact(\.html)?/)) {
          this.shadowRoot.querySelector('#link').removeAttribute('href')
        }
      }
    }
  )
}
