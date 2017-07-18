const fs = require('fs')
const bindAll = require('lodash/fp/bindAll')
const path = require('path')
const tmp = require('tmp')

// tmp.setGracefulCleanup()
const POWERSHELL_PATH = path.join(process.env.SystemRoot, 'syswow64/WindowsPowerShell/v1.0/powershell.exe')

class Powershell {
  constructor({ child_process }) {
    bindAll(Object.getOwnPropertyNames(Powershell.prototype), this)
    this.child_process = child_process // eslint-disable-line camelcase
  }

  run(scriptPath, callback) {
    this._execFile(scriptPath, (error, stdout, stderr) => {
      if (error) return callback(error)

      console.log('stdout', stdout)
      console.log('stderr', stderr)

      return this._parseJSON(stdout, callback)
    })
  }

  _exec(script, callback) {
    tmp.tmpName({ postfix: '.ps1' }, (tmpNameError, filename) => {
      if (tmpNameError) return callback(tmpNameError)

      fs.writeFile(filename, script, 'utf8', (writeFileError) => {
        if (writeFileError) return callback(writeFileError)

        this.child_process.execFile(POWERSHELL_PATH, [filename], callback)
      })
    })
  }

  _execFile(scriptPath, callback) {
    fs.readFile(scriptPath, 'utf8', (error, script) => {
      if (error) return callback(script)

      return this._exec(script, callback)
    })
  }

  _parseJSON(output, callback) {
    try {
      return callback(null, JSON.parse(output))
    } catch (error) {
      return callback(error)
    }
  }
}

module.exports = Powershell
