const randomUserAgent = require('random-useragent')
const proxyVerifier = require('proxy-verifier')
const { readFileSync, writeFileSync } = require('fs')

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

async function verifyProxy (proxy, testUrl) {
  let cfg = {
    ipAddress: proxy.ip,
    port: proxy.port,
    protocols: ['http', 'https']
  }

  const startTime = new Date();

  return new Promise((resolve, reject) => {
    proxyVerifier.testProtocols(cfg, { testUrl }, (error, results) => {
      if (error) {
        reject(error)
        return
      }

      proxy.setResponseTime(startTime);

      resolve(results)
    })
  })
}

function appendProxy (output, proxy) {
  const data = readFileSync(output);
  const json = JSON.parse(data)
  json.push(proxy)
  writeFileSync(output, toPrettyJson(json))
}

module.exports = {
  sortProxiesByScore,
  verifyProxy,
  appendProxy,
  toPrettyJson,
  getRandomUserAgent
}