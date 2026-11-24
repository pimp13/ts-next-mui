declare module "stylis" {
  export type Plugin = (
    element: unknown,
    index: number,
    children: unknown[],
    callback: unknown,
  ) => string | void;
  export const prefixer: Plugin;
}

declare module "stylis-plugin-rtl" {
  import type { Plugin } from "stylis";
  const rtlPlugin: Plugin;
  export default rtlPlugin;
}
