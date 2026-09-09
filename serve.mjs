/* =============================================================
   serve.mjs — zero-dependency static server for ./dist
   Usage: node serve.mjs  (set PORT env to override, default 8099)
   ============================================================= */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "dist");
const PORT = process.env.PORT || 8099;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".map": "application/json",
};

const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = join(ROOT, safe);
    let info = await stat(filePath).catch(() => null);
    if (info && info.isDirectory()) {
      filePath = join(filePath, "index.html");
      info = await stat(filePath).catch(() => null);
    }
    if (!info) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }
    const type = MIME[extname(filePath)] || "application/octet-stream";
    const raw = await readFile(filePath);

    // HTML changes per deploy; static assets are safe to cache longer.
    const isDoc = extname(filePath) === ".html";
    const cache = isDoc ? "public, max-age=300" : "public, max-age=86400";

    const accept = (req.headers["accept-encoding"] || "").includes("gzip");
    const compressible = /\/(html|javascript|css|json|svg|xml)/.test(type);
    if (accept && compressible) {
      const zipped = gzipSync(raw);
      res.writeHead(200, {
        "Content-Type": type,
        "Content-Encoding": "gzip",
        "Content-Length": zipped.length,
        "Cache-Control": cache,
      });
      res.end(zipped);
    } else {
      res.writeHead(200, {
        "Content-Type": type,
        "Content-Length": raw.length,
        "Cache-Control": cache,
      });
      res.end(raw);
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Serving ./dist at http://localhost:${PORT}`);
});
