import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "http://localhost:7000",
    extraHTTPHeaders: {
      Accept: "application/vnd.github.v3+json",
    },
  },
  testDir: "tests",
});
