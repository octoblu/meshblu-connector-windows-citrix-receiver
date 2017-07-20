const bindAll = require('lodash/fp/bindAll')
const LaunchDesktop = require('./LaunchDesktop')

class Receiver {
  constructor({ meshbluHttp }) {
    bindAll(Object.getOwnPropertyNames(Receiver.prototype), this)
    if (!meshbluHttp) throw new Error('Missing required parameter: meshbluHttp')
    this.launchDesktop = new LaunchDesktop({ meshbluHttp })
  }

  ensure(callback) {
    const { checkXenDesktopConnection } = require('./helpers') // eslint-disable-line global-require

    checkXenDesktopConnection((error, isConnected) => {
      if (error) return callback(error)
      if (isConnected) return callback()

      this.launchDesktop.start(callback)
    })
  }
}

module.exports = Receiver
