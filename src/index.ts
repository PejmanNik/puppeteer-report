import * as fs from "fs";
import * as core from "./core";
import { Page, PDFOptions } from "puppeteer-core";

async function pdf(file: string, options?: PDFOptions) {
  let puppeteer;

  try {
    puppeteer = require("puppeteer");
  } catch (error) {
    console.error("puppeteer is required when using pdf(...) function, you can install it by `npm i --save puppeteer`");
    throw error;
  }

  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.goto("file:///" + file);

    return await pdfPage(page, options);
  } finally {
    await browser.close();
  }
}

async function pdfPage(page: Page, options?: PDFOptions): Promise<Uint8Array> {
  const { path, ...pdfOptions } = options ?? {};
  const margin = {
    marginTop: pdfOptions?.margin?.top ?? 0,
    marginBottom: pdfOptions?.margin?.bottom ?? 0,
  };

  const [getHeightFunc, getHeightArg] = core.getHeightEvaluator(
    margin.marginTop,
    margin.marginBottom
  );
  let { headerHeight, footerHeight } = await page.evaluate(
    getHeightFunc,
    getHeightArg
  );

  if (options?.scale) {
    headerHeight *= options.scale;
    footerHeight *= options.scale;
  }

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
