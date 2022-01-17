{
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      header {
        background: linear-gradient(#ffd899, #FFF9ED);
      }

      #logo { width: 100%; }

      @media only screen and (min-width: 480px) {
        #logo { width: 50%; }
      }
    </style>

    <header>
      <a id="link" href="/">
        <img id="logo" alt="Jakub Šťastný" src="/img/logo.png" />
      </a>
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
