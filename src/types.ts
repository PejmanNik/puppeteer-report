//TODO: puppeteer-core types differ from puppeteer
// https://github.com/puppeteer/puppeteer/issues/6904

import type { PDFOptions, Awaitable, WaitForOptions} from "puppeteer-core";
export type { PDFOptions } from "puppeteer-core";


type InnerParams<T extends unknown[]> = {
  [K in keyof T]: T[K];
};

type EvaluateFunc<T extends unknown[]> = (
  ...params: InnerParams<T>
) => Awaitable<unknown>;

export interface Page {
  pdf(options?: PDFOptions): Promise<Buffer>;
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
