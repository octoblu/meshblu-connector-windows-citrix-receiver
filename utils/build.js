/* eslint-disable no-console */
const path = require('path')
const fs = require('fs-extra')
const { exec } = require('child_process')

function die(error) {
  console.error(error.stack)
  process.exit(1)
}

function cleanup(callback) {
  fs.remove('node_modules/edge/build', callback)
}

function run(cmd, callback) {
  const options = {
    cwd: path.resolve('node_modules/edge'),
    env: process.env,
  }

  exec(cmd, options, (error, stdout, stderr) => {
    if (error) return die(error)
    console.log(stdout)
    console.error(stderr)
    callback()
  })
}

function rid(callback) {
  const options = {
    cwd: path.join(process.cwd(), 'utils'),
  }
  exec('rid.exe ..\\node_modules\\edge\\build\\Release\\edge_nativeclr.node node.exe meshblu-connector-skype.exe', options, (error, stdout, stderr) => {
    console.log({ stdout, stderr })
    if (error) return die(error)
    callback()
  })
}

cleanup(() => {
  run('node-gyp configure', () => {
    run('node-gyp build', () => {
      rid(() => {
        console.log('all done!')
        process.exit(0)
      })
    })
  })
})
