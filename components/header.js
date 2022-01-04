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

        const shadowRoot = this.attachShadow({mode: 'open'})
          .appendChild(template.content.cloneNode(true))

        if (location.pathname.match(/^\/(index\.html)?$/))
          const link = shadowRoot.querySelector('#link')
          link.removeAttribute('href')
        }
      }
    }
  )
}
