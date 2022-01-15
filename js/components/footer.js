{
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      footer {
        margin: 0;
        padding-top: 10px;
        padding-bottom: 25px;
        background-color: lightblue;
        height: 40px;
        text-align: center;
      }
      
      ul { list-style-type: none; }
      
      li {
        display: inline-block;
        padding-right: 50px;
      }
      
      li img { height: 24px; }
    </style>

    <footer>
      <ul>
        <li><a href="https://wa.me/message/46K3QXAUCRQDF1"><img src="/img/whatsapp.svg" /></a></li>
        <li>
          <a href="https://m.me/jakub.stastny.524"><img height="24px" src="/img/messenger.svg" /></a>
        </li>
        <li><a href="https://t.me/jakubstastny"><img src="/img/telegram.svg" /></a></li>
        <li><a href="imessage://jakub.stastny.pt@gmail.com"><img src="/img/imessage.svg" /></a></li>
        <li><a href="mailto:jakub.stastny.pt+appointment@gmail.com"><img src="/img/email.svg" /></a></li>
      </ul>
    </footer>`

  customElements.define('main-footer',
    class extends HTMLElement {
      constructor() {
        super()

        this.attachShadow({mode: 'open'})
          .appendChild(template.content.cloneNode(true))
      }
    }
  )
}
