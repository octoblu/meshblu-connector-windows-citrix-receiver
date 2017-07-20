const debug = require('debug')('meshblu-connector-windows-citrix-receiver:Connector')
const bindAll = require('lodash/fp/bindAll')
const Receiver = require('./Receiver')

class Connector {
  constructor({ meshbluHttp }) {
    bindAll(Object.getOwnPropertyNames(Connector.prototype), this)

    if (!meshbluHttp) throw new Error('Missing required parameter: meshbluHttp')

    this.receiver = new Receiver({ meshbluHttp })
  }

  run(callback) {
    debug('run')

    setInterval(this._ensureReceiver, 10000)
    callback()
  }

  _ensureReceiver() {
    this.receiver.ensure((error) => {
      if (error) {
        this.meshbluHttp.message({ devices: ['*'], data: { error: error.message } })
      }
    })
  }
}

module.exports = Connector
