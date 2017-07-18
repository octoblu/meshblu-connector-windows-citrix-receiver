const debug = require('debug')('meshblu-connector-windows-citrix-receiver:Connector')
const bindAll = require('lodash/fp/bindAll')
const Broadcaster = require('./Broadcaster')

class Connector {
  constructor({ child_process, meshbluHttp, meshbluFirehose }) {
    bindAll(Object.getOwnPropertyNames(Connector.prototype), this)

    if (!child_process) throw new Error('Missing required parameter: child_process') // eslint-disable-line camelcase
    if (!meshbluFirehose) throw new Error('Missing required parameter: meshbluFirehose')
    if (!meshbluHttp) throw new Error('Missing required parameter: meshbluHttp')

    this.broadcaster = new Broadcaster({ child_process, meshbluHttp })
    this.child_process = child_process // eslint-disable-line camelcase
    this.meshbluHttp = meshbluHttp
    this.meshbluFirehose = meshbluFirehose
  }

  run(callback) {
    debug('run')

    setInterval(this._broadcast, 10000)
    this.meshbluFirehose.connect()
    this.meshbluHttp.whoami(callback)
  }

  _broadcast() {
    this.broadcaster.broadcast()
  }
}

module.exports = Connector
