/*
 * Propagate all query string parameters across.
 *
 * For local development add .html, so it resolves in the WorkingCopy server.
 */

function rewriteLink(a, destination) {
  console.log(`URL ${a.href} -> ${destination}`)
  a.href = destination
}

window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('a').forEach(a => {
    if (location.host.match(/^(\d{3}\.\d+\.\d+\.\d+|localhost):\d+$/)) {
      if (a.href.match(/^\/$/)) {
        // WorkingCopy server doesn't know how to deal with /.
        // FIXME ShadowRoot in header not matching.
        rewriteLink(a, `index.html${location.search}`)
      } else {
        //rewriteLink(a, `${a.href}.html${location.search}`)
      }
    } else {
      rewriteLink(a, `${a.href}${location.search}`)
    }
  })
})
