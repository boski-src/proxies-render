const { Command, flags } = require('@oclif/command')
const { writeFileSync } = require("fs")
const { sources, toPrettyJson } = require("../scraper")

class RenderCommand extends Command {
  async run () {
    const { flags } = this.parse(RenderCommand)
    const source = flags.source || 'proxynova.com'
    const country = flags.country || 'US'
    const output = flags.output || 'proxies.json'

    if (!sources[source]) {
      this.error("Invalid proxies source")
      return
    }

    this.debug(`Rendering proxies list from ${source} [${country}}] to file ${output}`)

    let proxies = await sources[source](country)

    writeFileSync(output, toPrettyJson(proxies))

    this.log("Completed")
  }
}

RenderCommand.description = `Render proxy list
...
With source and country filtering
`

RenderCommand.flags = {
  source: flags.string({ char: 's', description: 'Source of proxies (eg. proxynova.com, spys.one)' }),
  country: flags.string({ char: 'c', description: 'Country code (default: US)' }),
  output: flags.string({ char: 'o', description: 'Output file path (default: proxies.json)' })
}

module.exports = RenderCommand