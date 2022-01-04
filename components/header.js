{
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      background-color: lightgreen;
    </style>

    <header>
      <h1><a href="/">Jakub Šťastný</a></h1>
    </header>`

  customElements.define('main-header',
    class extends HTMLElement {
      constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'})
          .appendChild(template.content.cloneNode(true))
      }
    }
  )
}
