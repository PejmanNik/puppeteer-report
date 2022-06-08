/* eslint-disable @typescript-eslint/no-explicit-any */

// all types copied from puppeteer 14.3.0 type system
// in order to remove dependency on any specific version
// of puppeteer/puppeteer-core

// TODO: make a script to automatically copy data
// import type { Page, Browser, PDFOptions } from "puppeteer-core";

interface JSONObject {
  [key: string]: Serializable;
}

type JSONArray = Serializable[];
type Serializable =
  | number
  | string
  | boolean
  | null
  | bigint
  | JSONArray
  | JSONObject;

type SerializableOrJSHandle = Serializable;

type EvaluateFn<T = any> = string | ((arg1: T, ...args: any[]) => any);

type UnwrapPromiseLike<T> = T extends PromiseLike<infer U> ? U : T;

type EvaluateFnReturnType<T extends EvaluateFn> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

interface PDFMargin {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

type PaperFormat =
  | "letter"
  | "legal"
  | "tabloid"
  | "ledger"
  | "a0"
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6";

  export declare interface PDFOptions {
    /**
     * Scales the rendering of the web page. Amount must be between `0.1` and `2`.
     * @defaultValue 1
     */
    scale?: number;
    /**
     * Whether to show the header and footer.
     * @defaultValue false
     */
    displayHeaderFooter?: boolean;
    /**
     * HTML template for the print header. Should be valid HTML with the following
     * classes used to inject values into them:
     * - `date` formatted print date
     *
     * - `title` document title
     *
     * - `url` document location
     *
     * - `pageNumber` current page number
     *
     * - `totalPages` total pages in the document
     */
    headerTemplate?: string;
    /**
     * HTML template for the print footer. Has the same constraints and support
     * for special classes as {@link PDFOptions.headerTemplate}.
     */
    footerTemplate?: string;
    /**
     * Set to `true` to print background graphics.
     * @defaultValue false
     */
    printBackground?: boolean;
    /**
     * Whether to print in landscape orientation.
     * @defaultValue = false
     */
    landscape?: boolean;
    /**
     * Paper ranges to print, e.g. `1-5, 8, 11-13`.
     * @defaultValue The empty string, which means all pages are printed.
     */
    pageRanges?: string;
    /**
     * @remarks
     * If set, this takes priority over the `width` and `height` options.
     * @defaultValue `letter`.
     */
    format?: PaperFormat;
    /**
     * Sets the width of paper. You can pass in a number or a string with a unit.
     */
    width?: string | number;
    /**
     * Sets the height of paper. You can pass in a number or a string with a unit.
     */
    height?: string | number;
    /**
     * Give any CSS `@page` size declared in the page priority over what is
     * declared in the `width` or `height` or `format` option.
     * @defaultValue `false`, which will scale the content to fit the paper size.
     */
    preferCSSPageSize?: boolean;
    /**
     * Set the PDF margins.
     * @defaultValue no margins are set.
     */
    margin?: PDFMargin;
    /**
     * The path to save the file to.
     *
     * @remarks
     *
     * If the path is relative, it's resolved relative to the current working directory.
     *
     * @defaultValue the empty string, which means the PDF will not be written to disk.
     */
    path?: string;
    /**
     * Hides default white background and allows generating pdfs with transparency.
     * @defaultValue false
     */
    omitBackground?: boolean;
    /**
     * Timeout in milliseconds
     * @defaultValue 30000
     */
    timeout?: number;
}
export interface Page {
  pdf(options?: PDFOptions): Promise<Buffer>;
  goto(url: string): Promise<unknown>;
  close(): Promise<void>;
  evaluate<T extends EvaluateFn>(
    pageFunction: T,
    ...args: SerializableOrJSHandle[]
  ): Promise<UnwrapPromiseLike<EvaluateFnReturnType<T>>>;
}

export interface Browser {
  newPage(): Promise<Page>;
}
