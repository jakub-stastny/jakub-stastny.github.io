function inDev() {
  return location.host.match(/^\d{3}\.\d+\.\d+\.\d+:\d+$/)
}

function parseQS() {
  return Object.fromEntries(new URLSearchParams(location.search).entries())
}

function noTrack() {
  return inDev() || parseQS().notrack
}

function isApplePlatform() {
  return navigator.userAgent.match(/iPad|iPhone|iPod|/) || navigator.platform === 'MacIntel'
}