const bindAll = require('lodash/fp/bindAll')
const path = require('path')
const Powershell = require('./Powershell')

const COUNT_XD_SESSIONS_FILENAME = path.join(__dirname, '../ps1/count-xd-sessions.ps1')

class Broadcaster {
  constructor({ child_process, meshbluHttp }) {
    bindAll(Object.getOwnPropertyNames(Broadcaster.prototype), this)

    this.meshbluHttp = meshbluHttp
    this.powershell = new Powershell({ child_process })
  }

  broadcast() {
    this.powershell.run(COUNT_XD_SESSIONS_FILENAME, (error, output) => {
      if (error) throw error

      this.meshbluHttp.message({ devices: ['*'], data: output })
    })
  }
}

module.exports = Broadcaster
