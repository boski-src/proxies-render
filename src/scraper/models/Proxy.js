class Proxy {
  constructor (ip, port, source = "") {
    this.ip = ip
    this.port = port
    this.source = source
  }

  calcScore (speed, latency, uptime) {
    this.score = parseFloat((uptime * 4 + speed * 2 + latency) / 7);
  }

  setResponseTime (start) {
    this.responseTime = parseFloat(new Date() - start);
  }
}

module.exports = {
  Proxy
}