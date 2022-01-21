/*
 * Propagate all query string parameters across.
 *
 * For local development add .html, so it resolves in the WorkingCopy server.
 */

import * as helpers from '/js/helpers.js'

function rewriteLink(a, rewrite) {
  if (a.href !== rewrite) {
    console.log("URL rewrite", {original: a.href, rewrite})
    a.href = rewrite
  }
}

export function rewriteLinks(root) {
  root.querySelectorAll('a[href^="/"]').forEach(a => {
    if (a.href === `${location.origin}/` && helpers.inDev()) {
      rewriteLink(a, `/index.html${location.search}`)
    } else if (helpers.inDev()) {
      rewriteLink(a, `${a.href}.html${location.search}`)
    } else {
      rewriteLink(a, `${a.href}${location.search}`)
    }
  })
}

/* Register for the main DOM tree. */
window.addEventListener('DOMContentLoaded', () => rewriteLinks(document))