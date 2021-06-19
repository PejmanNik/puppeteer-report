import { PDFDocument, BlendMode } from "pdf-lib";

export async function createReport(
  baseDoc: PDFDocument,
  headersPdfBuffer: Uint8Array,
  headerHeight: number,
  footerHeight: number
) {
  const headerDoc = await PDFDocument.load(headersPdfBuffer);

  const basePages = baseDoc.getPages();
  const headerPages = headerDoc.getPages();

  const hasBoth = !!headerHeight && !!footerHeight;

  // get pages dimensions
  const x = basePages[0].getWidth();
  const y = basePages[0].getHeight();

  // 1 inch = 96 px
  // PDF unit =  inch * 72/1
  const pdfHeaderHeight = (headerHeight / 96) * 72;
  const pdfFooterHeight = (footerHeight / 96) * 72;

  // embed all headers pdf pages in the base pdf
  const pages = [];
  const boxes = [];

  for (let i = 1; i <= headerPages.length; i++) {
    pages.push(headerPages[i - 1]);

    const isOdd = i % 2 != 0;

    // have only header or
    // have both header and footer and we are in odd pages
    // 1, 3, 5, etc
    if (headerHeight && (!hasBoth || isOdd)) {
      boxes.push({
        bottom: y - pdfHeaderHeight,
        left: 0,
        right: x,
        top: y!,
      });
    }

    // have only footer or
    // have both header and footer and we are in plural pages
    // 2, 4, 6, etc
    if (footerHeight && (!hasBoth || !isOdd)) {
      boxes.push({
        bottom: y - pdfFooterHeight,
        left: 0,
        right: x,
        top: y!,
      });
    }
  }

  const embeddedPages = await baseDoc.embedPages(pages, boxes);

  // draw headers and/or footers over the base pages
  let baseIndex = 0;
  for (let i = 1; i <= headerPages.length; i++) {
    const embeddedPage = embeddedPages[i - 1];
    const size = embeddedPage.size();
    const isOdd = i % 2 != 0;

    if (headerHeight && (!hasBoth || isOdd)) {
      basePages[baseIndex].drawPage(embeddedPage, {
        ...size,
        x: x - size.width,
        y: y - size.height,
        blendMode: BlendMode.Multiply
      });
    }

    if (footerHeight && (!hasBoth || !isOdd)) {
      basePages[baseIndex].drawPage(embeddedPage, {
        ...size,
        x: x - size.width,
        y: 0,
        blendMode: BlendMode.Multiply
      });
    }

    // when we have both header and footer
    // two pages of headers pdf belong to one page of the base doc
    //  ------------
    // |  header 1  |
    // |            |        ------------
    // |            |       |  header 1  |
    //  ------------     => | xxxxxxxxxx |
    // |  footer 1  |       |  footer 1  |
    // |            |        ------------
    // |            |
    if (hasBoth && !isOdd) {
      baseIndex++;
    } else if (!hasBoth) {
      baseIndex++;
    }
  }

  return await baseDoc.save();
}
