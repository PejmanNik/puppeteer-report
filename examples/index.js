"use strict";

const report = require("../out");
const path = require('path');
const puppeteer = require('puppeteer');

const example = process.argv[2];

async function main() {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto("file:///" + path.join(__dirname, example, "index.html"));

        await report.pdfPage(page, {
            path: path.join(__dirname, example, "/index.pdf"), format: "A4"
            , margin: {
                bottom: '10mm',
                left: '10mm',
                right: '10mm',
                top: '10mm'
            }
        });
    } finally {
        await browser.close();
    }
}

main().catch(err => console.error(err)); 