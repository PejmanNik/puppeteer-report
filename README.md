# Puppeteer Report

Puppeteer Report is another library for converting HTML to PDF using puppeteer, adding support of custom header, footer, and pagination.

Puppeteer has a very limited ability to customize the default header, footer, and pagination, however, it is the best tool available to convert HTML to PDF (supports the last version of CSS/HTML/JavaScript and fully Unicode characters) and make it possible to create fantastic reports using hundred of JavaScript/HTML/CSS tools, libraries, and templates.

Puppeteer Report adding support of customizing header, footer, and pagination to puppeteer. Also, it will let you use JavaScript code to apply customization in the converting process.

## How does it work?

Puppeteer Report use [puppeteer](https://github.com/puppeteer/puppeteer) and [pdf-lib](https://github.com/Hopding/pdf-lib) under the hood to create a final PDF.

To support headers or footers, Puppeteer Report creates two PDF files. The first one is the HTML content without header and footer. And the second one is header and footer repeated based upon original content PDF pages' number, then it merges them together.

![image](https://raw.githubusercontent.com/PejmanNik/puppeteer-report/master/.attachment/image1.png)


Want to know more about this package and how it works internally? Please read my medium post:

**SOON...**


## How to Install

Using `npm` 

```
npm i puppeteer-report
```

or `yarn`

```
yarn add puppeteer-report
```

### Header
Add `id="header"` to the root header element in the HTML file.
 
```html
<div id="header">
  <h1>Header</h1>
</div>
```

### Footer
Add `id="footer"` to the root footer element in the HTML file.

```html
<div id="footer">
  <h1>Footer</h1>
</div>
```

### Page Number
Add `pageNumber` class name to an element inside the header or footer in order to show the current page number inside that element.

```html
<div id="footer">
  <h1>Footer</h1>
  Page: <span class="pageNumber"></span>
</div>
```

### Total Pages
Add `totalPages` class name to an element inside the header or footer in order to show the total page number inside that element.

```html
<div id="footer">
  <h1>Footer</h1>
  TotalPage: <span class="totalPages"></span>
</div>
```

**Page number and total pages only can be used in header or/and footer.**

### JavaScript

You can add `onChange` event handler on the header or footer elements to manipulate pagination, header or footer.

```html
<div id="header" onchange="onChange(this)">
    <h1>Header</h1>
    <span class="pageNumber" />/<span class="totalPages" />
</div>
```

```js
<script>
    function onChange(element) {
        const pageNumberElement = element.getElementsByClassName('pageNumber')[0];
        if (pageNumberElement.textContent === '2') {
            pageNumberElement.style.color = 'red'
        }
    }
</script>
```

### Convert To PDF

Import the package and call the `pdf` method. The first argument is the path to HTML in the local file system and the second one is the puppeteer PDF options object. the method returns the byte array. if you specify a `path` in the options object the output PDF will be saved in that path.

The full documentation of options object is available in the [puppeteer doc](https://pptr.dev/#?product=Puppeteer&version=v5.0.0&show=api-pagepdfoptions)

```js

import report from "puppeteer-report";

report.pdf("index.html", {
    path: "index.pdf", 
    format: "A4",
    margin: {
        bottom: '10mm',
        left: '10mm',
        right: '10mm',
        top: '10mm'
    }
});

```

This function requires `puppeteer`: `npm i --save puppeteer`.

There is another method to create PDF that requires `puppeteer-core` instead of `puppeteer`.
`pdfPage` method accepts a puppeteer page instance and an options object. this method lets you customize the page and even use it on none static pages.

if you want to use it in `chrome-aws-lambda` this is what you need to call.

```js

const browser = await puppeteer.launch();

try {
  const page = await browser.newPage();
  await page.goto("file:///...");
  
  report.pdfPage(page , {
      path: "index.pdf", 
      format: "A4",
      margin: {
          bottom: '10mm',
          left: '10mm',
          right: '10mm',
          top: '10mm'
      }
  });
} finally {
  await browser.close();
}

```

### Run Examples

Clone the repo and run these commands to install dependencies and build the package.

```
npm i
npm run build
```

Then, with this command you can run examples:

```
npm run example {example-folder-name}
```

For instance, to run `basicWithJs` example, you can run this command, and then the PDF result will create in the `examples\basicWithJs` directory.
```
npm run example basicWithJs
```


## FAQ

**1. What about other programming languages?**

This package includes a `bundle.js` file that opens a door to port it to every programming language with a puppeteer package. For instance, I implemented the C# port of the Puppeteer Report here:

https://github.com/PejmanNik/puppeteer-report-csharp