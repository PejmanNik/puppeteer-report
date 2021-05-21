const test = require('ava')
const report = require('../out')

test('report', assert => {
  assert.truthy(report.pdf)
  assert.truthy(report.pdfPage)
})
