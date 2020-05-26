const randomUserAgent = require('random-useragent');

function sortProxiesByScore (proxies) {
  return proxies.sort((a, b) => b.score - a.score)
}

function toPrettyJson (obj) {
  return JSON.stringify(obj, undefined, 2)
}

function getRandomUserAgent () {
  return randomUserAgent.getRandom(x => {
    return x.browserName === 'Chrome' &&
      parseFloat(x.browserVersion) >= 55 &&
      (x.osName === "Windows" || x.osName === "Linux")
  })
}

module.exports = {
  sortProxiesByScore,
  toPrettyJson,
  getRandomUserAgent
}