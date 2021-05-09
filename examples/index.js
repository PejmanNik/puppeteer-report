"use strict";

const report = require("../out");
const path = require('path');
const puppeteer = require('puppeteer');


const example = process.argv[2];

async function main() {
    const browser = await puppeteer.launch();

    try {
        const file = path.join(__dirname, example, "index.html");

        await report.pdf(browser, file, {
            path: path.join(__dirname, example, "index.pdf"), format: "a4"
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