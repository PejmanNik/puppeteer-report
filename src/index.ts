import * as fs from "fs";
import * as core from "./core";
import puppeteer, { PDFOptions } from "puppeteer";

async function pdf(file: string, options?: PDFOptions): Promise<Uint8Array> {
  const { path, ...pdfOptions } = options || {};
  const margin = {
    marginTop: pdfOptions?.margin?.top ?? 0,
    marginBottom: pdfOptions?.margin?.bottom ?? 0,
  };

  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();

  await page.goto("file:///" + file);

  const [getHeightFunc, getHeightArg] = core.getHeightEvaluator(
    margin.marginTop,
    margin.marginBottom
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

  await browser.close();

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

export default pdf;
export { pdf };
