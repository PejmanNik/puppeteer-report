import { PDFDocument, BlendMode } from 'pdf-lib';

export async function createReport(
  baseDoc: PDFDocument,
  headersPdfBuffer: Uint8Array,
  footerPdfBuffer: Uint8Array,
  headerHeight: number,
  footerHeight: number
) {
  const headerDoc = await PDFDocument.load(headersPdfBuffer);
  const footerDoc = await PDFDocument.load(footerPdfBuffer);

  const basePages = baseDoc.getPages();
  const headerPages = headerDoc.getPages();
  const footerPages = footerDoc.getPages();

  // 1 inch = 96 px
  // PDF unit =  inch * 72/1
  const pdfHeaderHeight = (headerHeight / 96) * 72;
  const pdfFooterHeight = (footerHeight / 96) * 72;

  const headerBoxes = headerPages.map((page) => {
    const width = page.getWidth();
    const height = page.getHeight();
    return {
      bottom: height - pdfHeaderHeight,
      left: 0,
      right: width,
      top: height,
    };
  });
  const footerBoxes = footerPages.map((page) => {
    const width = page.getWidth();
    const height = page.getHeight();
    return {
      bottom: height - pdfFooterHeight,
      left: 0,
      right: width,
      top: height,
    };
  });
  const embeddedHeaderPages = await baseDoc.embedPages(
    headerPages,
    headerBoxes
  );
  const embeddedFooterPages = await baseDoc.embedPages(
    footerPages,
    footerBoxes
  );
  for (let i = 0; i < basePages.length; i++) {
    const page = basePages[i];
    const width = page.getWidth();
    const height = page.getHeight();
    const embeddedHeaderPage = embeddedHeaderPages[i];
    if (embeddedHeaderPage) {
      const size = embeddedHeaderPage.size();

      page.drawPage(embeddedHeaderPage, {
        ...size,
        x: width - size.width,
        y: height - size.height,
        blendMode: BlendMode.Multiply,
      });
    }
    const embeddedFooterPage = embeddedFooterPages[i];
    if (embeddedFooterPage) {
      const size = embeddedFooterPage.size();

      page.drawPage(embeddedFooterPage, {
        ...size,
        x: width - size.width,
        y: 0,
        blendMode: BlendMode.Multiply,
      });
    }
  }

  return await baseDoc.save();
}
