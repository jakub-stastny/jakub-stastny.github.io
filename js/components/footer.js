{
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      footer {
        margin: 0;
        padding-top: 10px;
        padding-bottom: 25px;
        background: linear-gradient(#FFF9ED, 34%, LightBlue);
        height: 40px;
        text-align: center;
      }

      @media only screen and (max-device-width: 480px) {
        .email { display: none; }
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
          <a href="https://m.me/jakubstastny.guide"><img height="24px" src="/img/messenger.svg" /></a>
        </li>
        <li><a href="https://t.me/jakubstastny"><img src="/img/telegram.svg" /></a></li>
        <li class="apple-platforms><a href="imessage://jakub.stastny.pt@gmail.com"><img src="/img/imessage.svg" /></a></li>
        <li class="email"><a href="mailto:jakubstastny.guide@gmail.com"><img src="/img/email.svg" /></a></li>
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
