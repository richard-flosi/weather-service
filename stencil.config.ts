import { Config } from "@stencil/core";

// https://stenciljs.com/docs/config

export const config: Config = {
  srcDir: "src",
  globalStyle: "src/global/app.css",
  globalScript: "src/global/app.ts",
  taskQueue: "async",
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
    },
  ],
  devServer: {
    reloadStrategy: "hmr",
    port: 3333,
    openBrowser: false,
  },
};
