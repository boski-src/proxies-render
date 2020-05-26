const { Command, flags } = require('@oclif/command')
const { writeFileSync } = require("fs")
const { sources } = require("../scraper")
const { verifyProxy, appendProxy } = require("../scraper/utils")

class RenderCommand extends Command {
  async run () {
    this.log("Running...");

    const { flags } = this.parse(RenderCommand)
    const source = flags.source
    const country = flags.country
    const output = flags.output
    const ssl = flags.ssl
    const testUrl = flags.testUrl

    if (!sources[source]) {
      this.error("Invalid proxies source")
      return
    }

    this.log(`Rendering proxies list from ${source} [${country}] to file ${output}`)

    let proxies = await sources[source](country, ssl)

    writeFileSync(output, "[]")

    this.log(`Veryfing: ${proxies.length} proxies`)

    proxies.forEach(async proxy => {
      const results = await verifyProxy(proxy, testUrl);
      // console.log(results)
      if (results.http.ok || results.https.ok) {
        console.log(`OK: ${proxy.ip}:${proxy.port} in ${proxy.responseTime}ms`)
        appendProxy(output, proxy)
      } else {
        console.log(`FAIL: ${proxy.ip}:${proxy.port} ${results.http.error.code}`)
      }
    })
  }
}

RenderCommand.description = `Render proxy list
...
With source and country filtering
`

RenderCommand.flags = {
  source: flags.string({
    char: 's',
    description: 'Source of proxies (eg. proxynova.com, spys.one)',
    default: 'spys.one'
  }),
  country: flags.string({
    char: 'c',
    description: 'Country code',
    default: 'US'
  }),
  ssl: flags.string({
    description: 'Force ssl proxies',
    default: false
  }),
  output: flags.string({
    char: 'o',
    description: 'Output file path',
    default: 'proxies.json'
  }),
  testUrl: flags.string({
    description: 'Test url for proxy',
    default: 'https://www.google.com/?q=test'
  })
}

module.exports = RenderCommand