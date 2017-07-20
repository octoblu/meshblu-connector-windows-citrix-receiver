const edge = require('edge')
const path = require('path')

const REFERENCES = [path.join('C:/Program Files (x86)/Citrix/ICA Client/WfIcaLib.dll')]

const checkXenDesktopConnection = edge.func({
  source: path.join(__dirname, '../assets/cs/checkXenDesktopConnection.cs'),
  references: REFERENCES,
})

module.exports = {
  checkXenDesktopConnection,
}
