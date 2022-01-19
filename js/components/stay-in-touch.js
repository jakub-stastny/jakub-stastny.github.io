{
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      .cards {
        display: flex;
        justify-content: center;
      }

      .card {
        width: 40%;
        margin: 15px;
      }

      .card img {
        display: none;
        margin: auto;
        height: 50px;
      }

      .card p {
        font-style: italic;
      }
    </style>

    <h1>Stay in touch!</h1>
    <div class="cards">
      <div class="card">
        <img src="/img/fb.svg" />
        <h3>
          <a target="_blank" href="https://facebook.com/groups/1102916943794365">Mutual support, sharing and healing&nbsp;🍃</a>
        </h3>

        <p>
          Private group for my clients for sharing, mutual support and healing. You don't have to be on your own. Join your tribe.
        </p>
      </div>

      <div class="card">
        <img src="/img/newsletter.svg" />
        <h3>
          <a target="_blank" href="http://eepurl.com/hSv0tH">Once-in-a-blue-moon newsletter&nbsp;✉️</a>
        </h3>

        <p>
          Ocassional newsletter. Being a digital neanderthal I post very scarcely and only when I actually have something to say.
        </p>
      </div>
    </div>`

  customElements.define('stay-in-touch',
    class extends HTMLElement {
      constructor() {
        super()

        this.attachShadow({mode: 'open'})
          .appendChild(template.content.cloneNode(true))
      }
    }
  )
}