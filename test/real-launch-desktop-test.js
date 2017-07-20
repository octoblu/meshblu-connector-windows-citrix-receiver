#!/usr/bin/env node

const MeshbluConfig = require('meshblu-config')
const MeshbluHttp = require('meshblu-http')
const LaunchDesktop = require('../lib/LaunchDesktop')

class RealLaunchDesktopTest {
  constructor() {
    const meshbluConfig = new MeshbluConfig()
    const meshbluHttp = new MeshbluHttp(meshbluConfig.toJSON())
    this.sut = new LaunchDesktop({ meshbluHttp })
  }

  panic(error) {
    console.error(error.stack) // eslint-disable-line no-console
    process.exit(1)
  }

  panicIfError(error) {
    if (!error) return
    this.panic(error)
  }

  run() {
    this.sut.start((error) => {
      if (error) this.panic(error)
      process.exit(0)
    })
  }
}

const command = new RealLaunchDesktopTest({ argv: process.argv })
command.run()
