import type { PDFOptions as PuppeteerPDFOptions, Awaitable, WaitForOptions} from "puppeteer-core";

export interface PDFOptions extends PuppeteerPDFOptions {
  /**
   * Whether to overlay headers/footers in the margin area.
   * When false (default), margins are added as spacing within the header/footer area.
   * When true, headers/footers fill the entire margin area without additional spacing,
   * and content is kept within the defined margins.
   * @default false
   */
  overlayHeaderFooterInMargins?: boolean;
}

type InnerParams<T extends unknown[]> = {
  [K in keyof T]: T[K];
};

type EvaluateFunc<T extends unknown[]> = (
  ...params: InnerParams<T>
) => Awaitable<unknown>;

export interface Page {
  pdf(options?: PDFOptions): Promise<Uint8Array>;
  close(): Promise<void>;
  goto(
    url: string,
    options?: WaitForOptions & { referer?: string }
  ): Promise<unknown | null>;
  evaluate<
    Params extends unknown[],
    Func extends EvaluateFunc<Params> = EvaluateFunc<Params>
  >(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>>;
}

export interface Browser {
  newPage(): Promise<Page>;
}
