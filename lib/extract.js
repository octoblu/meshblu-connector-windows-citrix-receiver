const fs = require('fs')
const path = require('path')
const tmp = require('tmp')

tmp.setGracefulCleanup()

module.exports = (filename) => {
  const tmpFilename = tmp.tmpNameSync({ postfix: path.extname(filename) })
  fs.writeFileSync(tmpFilename, fs.readFileSync(filename, 'utf8'))
  return tmpFilename
}
