/*
 * Propagate all query string parameters across.
 *
 * For local development add .html, so it resolves in the WorkingCopy server.
 */
window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('a').forEach(a => {
    if (location.host.match(/^\d{3}\.\d+\.\d+\.\d+:\d+$/)) {
      a.href = `${a.href}.html${location.search}`
    } else {
      a.href = `${a.href}${location.search}`
    }
  })
})
