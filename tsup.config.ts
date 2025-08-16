import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  target: "es2022",
  sourcemap: false,
  clean: true,
});
