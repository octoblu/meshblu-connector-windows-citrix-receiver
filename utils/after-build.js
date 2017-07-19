const fs = require('fs-extra')
const path = require('path')

function die(error) {
  console.error(error.stack) // eslint-disable-line no-console
  process.exit(1)
}

function copy(source, dest, callback) {
  fs.copy(source, dest, (error) => {
    if (error) return die(error)
    callback()
  })
}

function copyAssets(callback) {
  const source = path.resolve('./assets')
  const dest = path.resolve(`./deploy/${process.env.MESHBLU_CONNECTOR_TARGET}/bin/assets`)

  copy(source, dest, callback)
}

function copyEdgeCS(callback) {
  const source = path.resolve('./node_modules/edge-cs/lib/edge-cs.dll')
  const dest = path.resolve(`./deploy/${process.env.MESHBLU_CONNECTOR_TARGET}/bin/edge-cs.dll`)
  copy(source, dest, callback)
}

copyAssets(() => {
  copyEdgeCS(() => {
    process.exit(0)
  })
})
