/*
 * Propagate all query string parameters across.
 *
 * For local development add .html, so it resolves in the WorkingCopy server.
 */

import * as helpers from '/js/helpers.js'

function rewriteLink(a, target) {
  if (a.href !== target) {
    console.log(`URL ${a.href} -> ${target}`)
    a.href = target
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('a').forEach(a => { // TODO selector match starting with /.
    if (a.href === "/" && helpers.inDev()) {
      rewriteLink(a, `/index.html${location.search}`)
    } else if (helpers.inDev()) {
      rewriteLink(a, `${a.href}.html${location.search}`)
    } else {
      rewriteLink(a, `${a.href}${location.search}`)
    }
  })
})