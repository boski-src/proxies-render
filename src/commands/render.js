const { Command, flags } = require('@oclif/command')
const { writeFileSync } = require("fs")
const { sources, toPrettyJson } = require("../scraper")

class RenderCommand extends Command {
  async run () {
    const { flags } = this.parse(RenderCommand)
    const source = flags.source;
    const country = flags.country;
    const output = flags.output;
    const ssl = flags.ssl;

    if (!sources[source]) {
      this.error("Invalid proxies source")
      return
    }

    this.debug(`Rendering proxies list from ${source} [${country}}] to file ${output}`)

    let proxies = await sources[source](country, ssl);

    writeFileSync(output, toPrettyJson(proxies))

    this.log("Completed")
  }
}

RenderCommand.description = `Render proxy list
...
With source and country filtering
`

RenderCommand.flags = {
  source: flags.string({
    char: 's',
    description: 'Source of proxies (default: spys.one) (eg. proxynova.com, spys.one)',
    default: 'spys.one'
  }),
  country: flags.string({
    char: 'c',
    description: 'Country code (default: US)',
    default: 'US'
  }),
  ssl: flags.string({
    description: 'Force ssl proxies',
    default: false
  }),
  output: flags.string({
    char: 'o',
    description: 'Output file path (default: proxies.json)',
    default: 'proxies.json'
  })
}

module.exports = RenderCommand