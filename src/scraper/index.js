const axios = require("axios")
const puppeteer = require("puppeteer")
const { parseNova, parseSpys } = require('./parser')
const { sortProxiesByScore, getRandomUserAgent, toPrettyJson } = require("./utils")

async function getSpysProxies (country_code = "US") {
  let browser, page, bodyHTML;
  try {
    browser = await puppeteer.launch({
      headless: true,
      devtools: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    page = await browser.newPage()

    await page.setUserAgent(getRandomUserAgent())
    await page.goto(`http://spys.one/free-proxy-list/${country_code}/`)

    await page.waitFor(1000);

    await page.evaluate(() => {
      document.querySelector("select[name=xpp]").value = 5
      document.querySelector("select[name=xf5]").value = 1
    });

    await page.waitFor(1000);

    await page.evaluate(() => {
      document.getElementsByTagName("form")[0].submit();
    });

    await page.waitForNavigation({ waitUntil: 'load' });

    bodyHTML = await page.content();
  } finally {
    browser.close();
  }

  const proxies = parseSpys(bodyHTML);

  return sortProxiesByScore(proxies);
}

async function getNovaProxies (country_code = "US") {
  const instance = axios.create({
    baseURL: "https://www.proxynova.com/",
    timeout: 5000,
    headers: {
      "User-Agent": getRandomUserAgent(),
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "Accept-Language: en-US,en;q=0.9",
      Host: "www.proxynova.com",
      Origin: "https://www.proxynova.com",
      Referer: `https://www.proxynova.com/proxy-server-list/country-${country_code}/`
    }
  })

  const response = await instance.get(`/proxy-server-list/country-${country_code}/`)
  const proxies = parseNova(response.data);
  return sortProxiesByScore(proxies);
}

module.exports = {
  toPrettyJson,
  sortProxiesByScore,
  getRandomUserAgent,
  parseNova,
  parseSpys,
  getSpysProxies,
  getNovaProxies,
  sources: {
    "proxynova.com": getNovaProxies,
    "spys.one": getSpysProxies
  }
}