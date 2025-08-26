/* Ambient declarations for browser-like globals to appease ESLint in TS files.
   We reference them through globalThis in code to avoid no-undef. */
declare const globalThis: {
  localStorage?: globalThis.Storage;
  confirm?: (message?: string) => boolean;
  URL: typeof globalThis.URL;
} & typeof globalThis;
