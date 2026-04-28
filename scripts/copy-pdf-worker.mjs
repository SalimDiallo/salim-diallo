// Copies the pdf.js worker bundled with `pdfjs-dist` to /public so it can be
// served from the same origin and stays version-locked with the installed
// dependency. Run automatically via the `postinstall` npm script.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const src = resolve(
  root,
  "node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
);
const destDir = resolve(root, "public");
const dest = resolve(destDir, "pdf.worker.min.mjs");

if (!existsSync(src)) {
  console.warn(
    "[copy-pdf-worker] pdfjs-dist not installed yet — skipping worker copy.",
  );
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log(`[copy-pdf-worker] Copied pdf.worker.min.mjs -> public/`);
