"use strict";

const report = require("../out");
const path = require('path');

const example = process.argv[2];

report.pdf(path.join(__dirname, example, "index.html"), {
    path: path.join(__dirname, example, "/index.pdf"), format: "A4"
    , margin: {
        bottom: '10mm',
        left: '10mm',
        right: '10mm',
        top: '10mm'
    }
});

