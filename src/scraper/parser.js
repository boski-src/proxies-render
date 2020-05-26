const cheerio = require('cheerio')
const { Proxy } = require("./models/Proxy")

function parseNova (body) {
  const proxies = []
  const $ = cheerio.load(body)

  $('#tbl_proxy_list tbody tr').each(function (i, el) {
    try {
      let ipRaw = $(this).find('td:nth-child(1) script').html()
      if (ipRaw)
        ipRaw = eval(ipRaw.replace('document.write(', '').replace(');', ''))
      else
        ipRaw = $(this).find('td:nth-child(1)').text()
      if (!ipRaw) return

      let speed = parseInt($(this).find('td > div').attr('title'))
      let latency = parseFloat($(this).find('td > div').data('value'))
      let uptime = parseInt($(this).find('td > span').text().replace('%', ''))

      const ip = ipRaw.trim()
      if (!ip) return;

      const port = $(this).find('td:nth-child(2)').text().trim()

      const proxy = new Proxy(ip, port, "proxynova.com")
      proxy.calcScore(speed, latency, uptime);

      proxies.push(proxy)
    } catch (error) {
    }
  })

  return proxies;
}

function parseSpys (body) {
  const proxies = []
  const $ = cheerio.load(body)

  $('body > table:nth-child(3) > tbody > tr:nth-child(5) > td > table > tbody > tr[onmouseover]')
    .each(function (i, el) {
      try {
        const addressSub = $(this).find('td:nth-child(1) font.spy14').text().split(":")
        let speed = parseInt($(this).find('td:nth-child(7) > table').attr('width'))
        let latency = parseFloat($(this).find('td:nth-child(6) font').text())
        let uptime = parseInt($(this).find('td:nth-child(8) > font > acronym').text().replace('%', ''))

        const ip = addressSub[0];
        if (!ip) return;

        const port = addressSub[1]

        const proxy = new Proxy(ip, port, "spys.com")
        proxy.calcScore(speed, latency, uptime);

        proxies.push(proxy)
      } catch (error) {
      }
    })

  return proxies;
}

module.exports = {
  parseNova,
  parseSpys
}