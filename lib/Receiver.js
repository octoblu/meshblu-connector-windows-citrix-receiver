const debug = require('debug')('meshblu-connector-windows-citrix-receiver:Receiver')
const bindAll = require('lodash/fp/bindAll')
const LaunchDesktop = require('./LaunchDesktop')

class Receiver {
  constructor() {
    bindAll(Object.getOwnPropertyNames(Receiver.prototype), this)
    this.launchDesktop = new LaunchDesktop()
  }

  ensure(options, callback) {
    debug('ensure')
    const { checkXenDesktopConnection } = require('./helpers') // eslint-disable-line global-require

    checkXenDesktopConnection((error, isConnected) => {
      debug('checkXenDesktopConnection', error, isConnected)
      if (error) return callback(error)
      if (isConnected) return callback()

      this.launchDesktop.start(options, callback)
    })
  }
}

module.exports = Receiver
