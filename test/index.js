const test = require("ava")
const puppeteer = require("puppeteer")
const { PDFDocument } = require("pdf-lib")
const { join } = require("path")
const { tmpdir } = require("os")
const { promises: { readFile } } = require("fs")
const report = require("../out")

const defaultOptions = {
  format: "a4",
  margin: {
    bottom: '10mm',
    left: '10mm',
    right: '10mm',
    top: '10mm'
  }
}

test("it generates a pdf", async assert => {
  const browser = await puppeteer.launch()
  const input = join(__dirname, 'fixtures', 'basic.html')
  const output = join(tmpdir(), 'basic.pdf')
  await report.pdf(browser, input, {
    path: output,
    ...defaultOptions
  })
  const file = await readFile(output)
  assert.truthy(file)
  await browser.close()
})

test("it does not generate additional blank pages", async assert => {
  const browser = await puppeteer.launch()
  const input = join(__dirname, 'fixtures', 'multiple-pages.html')
  const output = join(tmpdir(), 'multiple-pages.pdf')
  await report.pdf(browser, input, {
    path: output,
    ...defaultOptions
  })
  const file = await readFile(output)
  const pdf = await PDFDocument.load(file)
  const pages = pdf.getPages()
  assert.deepEqual(pages.length, 4)
  await browser.close()
})
