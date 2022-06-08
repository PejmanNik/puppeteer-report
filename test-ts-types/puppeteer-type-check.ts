import puppeteer from "puppeteer";
import report from "../src/index";

async function main() {
  const browser = await puppeteer.launch();

  try {
    const file = "index.html";
    const page = await browser.newPage();

    await report.pdf(browser, file, {});
    await report.pdfPage(page);
  } finally {
    await browser.close();
  }
}
