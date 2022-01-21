function inDev() {
  return !!location.host.match(/^(\d{3}\.\d+\.\d+\.\d+|localhost):\d+$/)
}

function parseQS() {
  return Object.fromEntries(new URLSearchParams(location.search).entries())
}

function noTrack() {
  return inDev() || parseQS().notrack
}

function tag(name, attributes) {
  const element = document.createElement(name)

  Object.entries(attributes).forEach(([attribute, value]) => {
    element[attribute] = value
  })

  return element
}