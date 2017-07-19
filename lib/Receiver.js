const bindAll = require('lodash/fp/bindAll')
const { checkXenDesktopConnection } = require('./helpers')

class Receiver {
  constructor() {
    bindAll(Object.getOwnPropertyNames(Receiver.prototype), this)
  }

  ensure(callback) {
    checkXenDesktopConnection((error, isConnected) => {
      if (error) return callback(error)
      if (isConnected) return callback()

      this._start(callback)
    })
  }

  _start(callback) {
    return callback(new Error("XD Session was not connected, needs to restart. This is where Peter's stuff goes"))
  }
}

module.exports = Receiver
