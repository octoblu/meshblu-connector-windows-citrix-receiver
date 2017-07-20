const debug = require('debug')('meshblu-connector-windows-citrix-receiver:Connector')
const { EventEmitter } = require('events')
const bindAll = require('lodash/fp/bindAll')
const get = require('lodash/fp/get')
const Receiver = require('./Receiver')

class Connector extends EventEmitter {
  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(Connector.prototype), this)

    this.receiver = new Receiver()
  }

  start(device, callback) {
    debug('run')

    this.onConfig(device)
    setInterval(this._ensureReceiver, 10000)
    callback()
  }

  onConfig(device) {
    this.options = get('options', device)
  }

  _ensureReceiver() {
    this.receiver.ensure(this.options, (error) => {
      if (error) {
        this.emit('message', { devices: ['*'], data: { error: error.message } })
      }
    })
  }
}

module.exports = Connector
