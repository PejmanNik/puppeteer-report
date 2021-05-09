import * as fs from "fs";
import * as core from "./core";
import type { Page, Browser, PDFOptions } from "./types";

/**
 * Convert HTML file to PDF
 * @param browser puppeteer/puppeteer-core browser object
 * @param file full path of HTML file
 * @param options output PDF options
 * @returns PDF as an array of bytes
 */
async function pdf(browser: Browser, file: string, options?: PDFOptions) {
  const page = await browser.newPage();
  try {
    await page.goto("file:///" + file);

    return await pdfPage(page, options);
  } finally {
    await page.close();
  }
}

/**
 * Convert a Page to PDF
 * @param page puppeteer/puppeteer-core page object
 * @param options output PDF options
 * @returns PDF as an array of bytes
 */
async function pdfPage(page: Page, options?: PDFOptions): Promise<Uint8Array> {
  const { path, ...pdfOptions } = options ?? {};
  const margin = {
    marginTop: pdfOptions?.margin?.top ?? 0,
    marginBottom: pdfOptions?.margin?.bottom ?? 0,
  };

  const [getHeightFunc, getHeightArg] = core.getHeightEvaluator(
    margin.marginTop,
    margin.marginBottom,
    pdfOptions?.scale
  );

  const { headerHeight, footerHeight } = await page.evaluate(
    getHeightFunc,
    getHeightArg
  );

  const [basePageEvalFunc, basePageEvalArg] = core.getBaseEvaluator(
    headerHeight,
    footerHeight
  );
  await page.evaluate(basePageEvalFunc, basePageEvalArg);

  const basePdfBuffer = await page.pdf(pdfOptions);

  const [doc, headerEvalFunc, headerEvalArg] = await core.getHeadersEvaluator(
    basePdfBuffer
  );
  await page.evaluate(headerEvalFunc, headerEvalArg);

  const headerPdfBuffer = await page.pdf(pdfOptions);

  const result = await core.createReport(
    doc,
    headerPdfBuffer,
    headerHeight,
    footerHeight
  );

  if (path) {
    await fs.promises.writeFile(path, result);
  }

  return result;
}

export { pdf, pdfPage };
export default { pdf, pdfPage };
