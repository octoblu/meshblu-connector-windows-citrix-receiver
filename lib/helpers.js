const edge = require('edge')
const path = require('path')

const REFERENCES = [path.join('C:/Program Files (x86)/Citrix/ICA Client/WfIcaLib.dll')]
const CWD = process.env.MESHBLU_CONNECTOR_CWD || process.cwd()

const checkXenDesktopConnection = edge.func({
  source: path.join(CWD, 'assets/cs/checkXenDesktopConnection.cs'),
  references: REFERENCES,
})

module.exports = {
  checkXenDesktopConnection,
}
