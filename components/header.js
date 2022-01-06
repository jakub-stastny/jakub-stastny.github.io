{
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      header { background-color: lightgreen; }
    </style>

    <header>
      <h1><a id="link" href="/">Jakub Šťastný</a></h1>
    </header>`

  customElements.define('main-header',
    class extends HTMLElement {
      constructor() {
        super()

        this.attachShadow({mode: 'open'})
          .appendChild(template.content.cloneNode(true))

        if (location.pathname.match(/^\/(index\.html)?$/)) {
          this.shadowRoot.querySelector('#link').removeAttribute('href')
        }
      }
    }
  )
}
