const edge = require('edge')
const path = require('path')

const REFERENCES = ['System.Management.dll']
const CWD = process.env.MESHBLU_CONNECTOR_CWD || process.cwd()

const checkXenDesktopConnection = edge.func({
  source: path.join(CWD, 'assets/cs/checkXenDesktopConnection.cs'),
  references: REFERENCES,
})

module.exports = {
  checkXenDesktopConnection,
}
