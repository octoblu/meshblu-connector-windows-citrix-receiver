const bindAll = require('lodash/fp/bindAll')
const path = require('path')
const Powershell = require('./Powershell')

const COUNT_XD_SESSIONS_FILENAME = path.join(__dirname, '../ps1/count-xd-sessions.ps1')

class Receiver {
  constructor({ child_process }) {
    bindAll(Object.getOwnPropertyNames(Receiver.prototype), this)

    this.powershell = new Powershell({ child_process })
  }

  ensure(callback) {
    this._isRunning((error, isRunning) => {
      if (error) return callback(error)
      if (isRunning) return callback()

      this._start(callback)
    })
  }

  _isRunning(callback) {
    this.powershell.run(COUNT_XD_SESSIONS_FILENAME, (error, output) => {
      if (error) return callback(error)

      const isRunning = (output.count > 0)
      return callback(null, isRunning)
    })
  }

  _start(callback) {
    return callback(new Error("XD Session was not connected, needs to restart. This is where Peter's stuff goes"))
  }
}

module.exports = Receiver
