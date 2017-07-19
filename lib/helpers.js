const edge = require('edge')
const path = require('path')
const extract = require('./extract')

const REFERENCES = [path.join('C:/Program Files (x86)/Citrix/ICA Client/WfIcaLib.dll')]

const checkXenDesktopConnection = edge.func({
  source: extract(path.join(__dirname, '../assets/cs/checkXenDesktopConnection.cs')),
  references: REFERENCES,
})

module.exports = {
  checkXenDesktopConnection,
}
