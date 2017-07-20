#!/usr/bin/env node

const MeshbluHttp = require('meshblu-http')
const OctoDash = require('octodash')
const path = require('path')
const packageJson = require('./package.json')
const Connector = require('./lib/Connector')

const CLI_OPTIONS = [
  {
    names: ['uuid', 'u'],
    type: 'string',
    env: 'MESHBLU_UUID',
    required: true,
    help: 'Meshblu UUID',
    helpArg: 'UUID',
  },
  {
    names: ['token', 't'],
    type: 'string',
    env: 'MESHBLU_TOKEN',
    required: true,
    help: 'Meshblu Token',
    helpArg: 'TOKEN',
  },
  {
    names: ['domain', 'd'],
    type: 'string',
    default: 'octoblu.com',
    env: 'MESHBLU_DOMAIN',
    help: 'Meshblu SRV Domain',
    helpArg: 'DOMAIN',
  },
  {
    names: ['env-file'],
    type: 'string',
    default: path.join(process.cwd(), '.env'),
    env: 'MESHBLU_ENV_FILE',
    help: 'dotenv file',
    helpArg: 'FILE',
    completionType: 'file',
  },
]

class Command {
  constructor({ argv }) {
    this.octoDash = new OctoDash({
      argv,
      cliOptions: CLI_OPTIONS,
      name: packageJson.name,
      version: packageJson.version,
    })

    const { uuid, token, domain } = this.octoDash.parseOptions()
    const meshbluHttp = new MeshbluHttp({ uuid, token, domain, resolveSrv: true })
    this.connector = new Connector({ meshbluHttp })
  }

  static panic(error) {
    console.error(error.stack) // eslint-disable-line no-console
    process.exit(1)
  }

  panicIfError(error) {
    if (!error) return
    this.panic(error)
  }

  run() {
    this.connector.run((error) => {
      if (error) this.panic(error)
    })
  }
}

if (require.main === module) {
  const command = new Command({ argv: process.argv })
  command.run()
}

module.exports = Command
