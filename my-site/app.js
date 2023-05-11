/*
  JS is very unstable, many dependencies. Don't use the JS ecosystem
  if you can avoid it. Use ClojureScript-based libraries instead.

  No WebPack, JSX and the likes. Use Hiccup and generate plain JS.

  ShadowCLJS:
  - Supports ES classes.
  - Compatible with any CLJS library out there.
    This may not be the most important thing.
    We're only using Reitit so far and it can be replaced.
    ACTUALLY we do use cljs.spec.alpha.
    We need to be compatible with bm-core though!
    Althought that shouldn't be hard even on Cherry (minus defmulti).
  - The way it solves ES exports is infuriating, plus it doesn't really
    do ES exports as far as I understand.
    ? How does code splitting work with this ?
    https://shadow-cljs.github.io/docs/UsersGuide.html#CodeSplitting
  - ! Also supports (:require ["module-name$default" :as defaultExport])
    import { export } from "module-name" ... (:require ["module-name" :refer (export)])

  Cherry:
  - ES6 modules, no global window-bound exports.
  - JS object destructuring.
  - Can run on Babashka.
  - Async/await support.
  - Readable output files.
  - No dependency on Google Closure.
  - We could use JSX (which doesn't require React by the way
    https://dev.to/devsmitra/how-to-create-the-app-using-jsx-without-react-k08
    and https://github.com/developit/vhtml).
    On the other hand, we would have to transpile it again, for that
    reason hiccup is prefered.
  - Hot reloading via JS tooling.
  - https://github.com/squint-cljs/cherry/issues/97

  Squint:
  - 5kb, some features same as in Cherry.
  - No stdlib I think.

  Bun https://bun.sh.

  CSS should be separated rather than inline (if can be avoided).
  Thanks to tangling, we can just insert it from a CSS source block
  into a style element thus: <style>{{ styles }}</style>.

  Hopefully updates should be handled all by the browser without any
  need for vDOM.

  Stateless components, stateful pages. Use events to update.

  Use data- attributes which has JS API for them.

  Because we have no large dependencies and because <unknown-tag>
  doesn't throw an error and can be defined later, we can easily split
  the bundle by components and load some of them synchronously and others
  asynchronously.

  # TODO
  - site-link -> rewrite history
  - form like in the wizard, conditional show/hide, +9 months etc.
    - Establish whether event-based approach is sufficient or whether
      we need some sort of pub/sub like reagent.
  - Once we establish it all works, convert to CLJS.
 */

const elements =
      {"site-header": class extends HTMLElement {
                        connectedCallback() {
                          const shadow = this.attachShadow({mode: 'open'})

                          shadow.innerHTML = `
                          <style>
                            header {
                              width: 100%;
                              height: 100px;
                              background: olivedrab;
                            }
                          </style>

                          <header></header>`
                        }},
       "site-footer": class extends HTMLElement {
                        connectedCallback() {
                          const shadow = this.attachShadow({mode: 'open'})

                          shadow.innerHTML = `
                          <style>
                            footer {
                              width: 100%;
                              height: 100px;
                              background: yellow;
                            }
                          </style>

                          <footer></footer>`
                        }},
       "site-layout": class extends HTMLElement {
                        connectedCallback() {
                          const shadow = this.attachShadow({mode: 'open'})

                          shadow.innerHTML = `
                          <style>
                            html {
                              width: 100%;
                              height: 100%;
                            }

                            body {
                              margin: 0;
                            }
                          </style>

                          <site-header></site-header>
                          <slot></slot>
                          <site-footer></site-footer>`
                        }},
       "site-link": class extends HTMLElement { // TODO: is: link
         connectedCallback() {
                      const shadow = this.attachShadow({mode: 'open'})

                      shadow.innerHTML = `<h1>Home page</h1>`
         }},
       "home-page": class extends HTMLElement {
                      connectedCallback() {
                        const shadow = this.attachShadow({mode: 'open'})

                        shadow.innerHTML = `<h1>Home page</h1>`
                      }},
       "about-page": class extends HTMLElement {
                      connectedCallback() {
                        const shadow = this.attachShadow({mode: 'open'})

                        shadow.innerHTML = `<h1>About page</h1>`
                      }},
}

Object.entries(elements).forEach(([tagName, klass]) => customElements.define(tagName, klass))

function customElementToHTML(element) {
  return `<${element}></${element}>`
}

customElements.define('current-page',
  class extends HTMLElement {
    // TODO: Title should be part of the page component itself.
    // export { tagName, title, componentClass } or make these static
    // properties of the component class.
    static routes = {
      "/": {title: "Home page", component: customElementToHTML("home-page")},
      "/about": {title: "About", component: customElementToHTML("about-page")},
    }

    constructor() {
      super()
      this.route = this.constructor.routes[window.location.pathname]
      if (!this.route) throw new Error("No such route")
    }

    connectedCallback() {
      const shadow = this.attachShadow({mode: 'open'})
      shadow.innerHTML = this.route.component
    }
  }
)
